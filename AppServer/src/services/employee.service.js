const {
	insertEmployee,
	findEmployeeByEmail,
} = require('../database/repository/employee.repo')

const crypto = require('crypto')
const { generatePairToken } = require('../utils/generateToken')
const { unselectFields } = require('../utils/optionsField')
const {
	findByEmployeeIdAndUpdateKey,
	findKeyByEmployeeAndDelete,
} = require('../database/repository/key.repo')
const { BadRequest } = require('../utils/error.response')

class EmployeeService {
	async insertEmployee(body) {
		const { email } = body
		const isEmailExist = await findEmployeeByEmail(email)
		if (isEmailExist) throw new BadRequest('Email already exists!')

		const newEmployee = await insertEmployee(body)

		if (!newEmployee)
			throw new BadRequest('Failed to create new employee, please try again!')

		return {
			employee: newEmployee,
		}
	}

	async loginEmployee(body) {
		const { email, password } = body
		const employee = await findEmployeeByEmail(email)
		if (!employee) throw new BadRequest('Invalid email or password!')

		const isPasswordMatch = await employee.comparePassword(password)
		if (!isPasswordMatch) throw new BadRequest('Invalid email or password!')

		const publicKey = crypto.randomBytes(64).toString('hex')
		const privateKey = crypto.randomBytes(64).toString('hex')
		const payloadToken = {
			employeeId: employee._id,
		}
		const tokens = generatePairToken(payloadToken, publicKey, privateKey)

		const payload = {
			publicKey,
			privateKey,
			refreshToken: tokens.refreshToken,
			refreshTokenUsage: [],
		}

		const userKey = await findByEmployeeIdAndUpdateKey(employee._id, payload)
		if (!userKey)
			throw new BadRequest('Failed to create user key, please try again!')

		return {
			employee: unselectFields(employee, [
				'password',
				'createdAt',
				'updatedAt',
			]),
			accessToken: tokens.accessToken,
			refreshToken: tokens.refreshToken,
		}
	}

	async logoutEmployee(employeeId, refreshToken) {
		const employeeKey = await findKeyByEmployeeAndDelete(employeeId)

		if (!employeeKey)
			throw new BadRequest('Failed to logout, please try again!')

		return {
			employeeId,
		}
	}

	async refreshTokenEmployee(body) {
		const { employeeId, refreshToken } = body
		const userKey = await findByEmployeeIdAndUpdateKey(employeeId, {
			$pull: { refreshTokenUsage: refreshToken },
		})
		if (!userKey)
			throw new BadRequest('Failed to refresh token, please try again!')

		const publicKey = crypto.randomBytes(64).toString('hex')
		const privateKey = crypto.randomBytes(64).toString('hex')
		const payloadToken = {
			userId: employeeId,
		}
		const tokens = generatePairToken(payloadToken, publicKey, privateKey)

		const payload = {
			publicKey,
			privateKey,
			refreshToken: tokens.refreshToken,
		}

		const newUserKey = await findByEmployeeIdAndUpdateKey(employeeId, payload)
		if (!newUserKey)
			throw new BadRequest('Failed to create user key, please try again!')

		return {
			accessToken: tokens.accessToken,
		}
	}
}

module.exports = new EmployeeService()

const {
	insertEmployee,
	findEmployeeByEmail,
	findEmployeeById,
} = require('../database/repository/employee.repo')

const crypto = require('crypto')
const { generatePairToken } = require('../utils/generateToken')
const { unselectFields } = require('../utils/optionsField')
const {
	findByEmployeeIdAndUpdateKey,
	findKeyByEmployeeAndDelete,
	findKeyByEmployeeId,
} = require('../database/repository/key.repo')
const { BadRequest } = require('../utils/error.response')
const jwt = require('jsonwebtoken')

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

	async logoutEmployee(employeeId) {
		const employeeKey = await findKeyByEmployeeAndDelete(employeeId)

		if (!employeeKey)
			throw new BadRequest('Failed to logout, please try again!')

		return {
			employeeId,
		}
	}

	async refreshTokenEmployee(employeeId, refreshToken, next) {
		const employeeKey = await findKeyByEmployeeId(employeeId)

		if (!employeeKey)
			throw new BadRequest('Failed to refresh token, please try again!')

		if (employeeKey?.refreshTokenUsage.includes(refreshToken))
			throw new BadRequest('Invalid refresh token!') // handling reuse refresh token

		if (employeeKey?.refreshToken !== refreshToken)
			throw new BadRequest('Invalid refresh token!')

		try {
			const decode = jwt.verify(refreshToken, employeeKey?.privateKey)
			if (!decode) throw new BadRequest('Invalid refresh token!')

			const publicKey = crypto.randomBytes(64).toString('hex')
			const privateKey = crypto.randomBytes(64).toString('hex')

			const payloadToken = {
				employeeId: employeeId,
			}
			const tokens = generatePairToken(payloadToken, publicKey, privateKey)

			const payload = {
				publicKey,
				privateKey,
				refreshToken: tokens.refreshToken,
				refreshTokenUsage: [...employeeKey?.refreshTokenUsage, refreshToken],
			}

			const reponseKey = await findByEmployeeIdAndUpdateKey(employeeId, payload)
			if (!reponseKey)
				throw new BadRequest('Failed to create user key, please try again!')

			return {
				accessToken: tokens.accessToken,
				refreshToken: tokens.refreshToken,
			}
		} catch (err) {
			console.log('err', err)
			throw next(new BadRequest('Failed to refresh token, please try again!'))
		}
	}

	async subscribeEvents(payload) {}
}

module.exports = new EmployeeService()

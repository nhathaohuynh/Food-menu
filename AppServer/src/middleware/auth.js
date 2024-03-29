const { findEmployeeById } = require('../database/repository/employee.repo')
const { findKeyByEmployeeId } = require('../database/repository/key.repo')
const { Unauthorized, BadRequest } = require('../utils/error.response')
const catchAsyncHandler = require('./catchAsyncHandler')
const jwt = require('jsonwebtoken')

const isAuthenticated = catchAsyncHandler(async (req, res, next) => {
	const accessToken = req.headers['authorization']
	const rawToken = accessToken.split(' ')[1]

	const employeeId = req?.headers['x-client-id']
	if (!rawToken || !employeeId)
		return next(
			new Unauthorized('Please login or provide client id to access recourse.'),
		)

	const employeeKeys = await findKeyByEmployeeId(employeeId)
	if (!employeeKeys) return next(new BadRequest('Employee  keys not found.'))

	const decoded = jwt.verify(rawToken, employeeKeys?.publicKey)

	if (!decoded) return next(new BadRequest('Invalid access token.'))

	if (decoded.employeeId !== employeeId)
		throw new BadRequest('Invalid access token.')

	const employee = await findEmployeeById(decoded.employeeId)

	if (!employee) return next(new Unauthorized('User not found'))

	req.employee = employee
	next()
})

const authorizedRoles = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.employee?.role)) {
			return next(new Unauthorized('Not allowed to access resource!'))
		}
		next()
	}
}

module.exports = {
	isAuthenticated,
	authorizedRoles,
}

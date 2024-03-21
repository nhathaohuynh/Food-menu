const express = require('express')
const { validateBody } = require('../validations')
const {
	registerSchema,
	loginSchema,
	refreshTokenSchema,
} = require('../validations/employee.schema')
const catchAsyncHandler = require('../middleware/catchAsyncHandler')
const employeeController = require('../controllers/employee.controller')
const { isAuthenticated } = require('../middleware/auth')

const route = express.Router()

route.post(
	'/',
	validateBody(registerSchema),
	catchAsyncHandler(employeeController.insertEmployee),
)

route.post(
	'/login',
	validateBody(loginSchema),
	catchAsyncHandler(employeeController.loginEmployee),
)

route.delete(
	'/logout',
	isAuthenticated,
	catchAsyncHandler(employeeController.logoutEmployee),
)

route.post(
	'/refresh-token',
	validateBody(refreshTokenSchema),
	catchAsyncHandler(employeeController.refreshToken),
)

module.exports = route

const express = require('express')
const { isAuthenticated, authorizedRoles } = require('../middleware/auth')
const customerController = require('../controllers/customer.controller')
const catchAsyncHandler = require('../middleware/catchAsyncHandler')
const { validateBody } = require('../validations')
const { insertCustomerSchema } = require('../validations/customer.schema')

const route = express.Router()

route.post(
	'/',
	isAuthenticated,
	authorizedRoles('management', 'employee'),
	validateBody(insertCustomerSchema),
	catchAsyncHandler(customerController.insertCustomer),
)

module.exports = route

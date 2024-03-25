const express = require('express')
const {
	validateBody,
	validateParams,
	validateParamsCustomization,
} = require('../validations')
const {
	registerSchema,
	loginSchema,
	refreshTokenSchema,
} = require('../validations/employee.schema')
const catchAsyncHandler = require('../middleware/catchAsyncHandler')
const employeeController = require('../controllers/employee.controller')
const { isAuthenticated, authorizedRoles } = require('../middleware/auth')
const { paramsOrderItemSchema } = require('../validations/customer.schema')

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

route.get(
	'/chef/orders',
	isAuthenticated,
	authorizedRoles('chef'),
	catchAsyncHandler(employeeController.getOrdersForChef),
)

route.put(
	'/chef/menu-item/:id',
	isAuthenticated,
	authorizedRoles('chef'),
	validateParams(),
	catchAsyncHandler(employeeController.adjustmentMenuItemFromChef),
)

route.put(
	'/chef/order-item/:orderId/:orderItemId',
	isAuthenticated,
	authorizedRoles('chef'),
	validateParamsCustomization(paramsOrderItemSchema),
	catchAsyncHandler(employeeController.updateStatusOrderItem),
)

route.put(
	'/chef/receiving-order/:orderId',
	isAuthenticated,
	authorizedRoles('chef'),
	validateParamsCustomization(paramsOrderItemSchema),
	catchAsyncHandler(employeeController.receivingOrder),
)

route.get(
	'/management/invoices',
	isAuthenticated,
	authorizedRoles('management'),
	catchAsyncHandler(employeeController.getInvoicesForManagement),
)

module.exports = route

const express = require('express')
const { isAuthenticated, authorizedRoles } = require('../middleware/auth')
const customerController = require('../controllers/customer.controller')
const catchAsyncHandler = require('../middleware/catchAsyncHandler')
const { validateBody, validateParamsCustomization } = require('../validations')
const {
	insertOrderForCustomerSchema,
	paramsOrderSchema,
	insertOrderItemForCustomerSchema,
	paramsOrderItemSchema,
	updateOrderItemForCustomerSchema,
	paymentOrderForCustomerSchema,
} = require('../validations/customer.schema')

const route = express.Router()

route.post(
	'/order',
	catchAsyncHandler(customerController.insertOrderForCustomer),
)

route.post(
	'/payment',
	catchAsyncHandler(customerController.paymentOrderForCustomer),
)

route.get(
	'/:customerId/:orderId',
	isAuthenticated,
	authorizedRoles('management', 'employee'),
	validateParamsCustomization(paramsOrderSchema),
	catchAsyncHandler(customerController.getOrderFromCustomer),
)

route.post(
	'/:customerId/:orderId',
	isAuthenticated,
	authorizedRoles('management', 'employee'),
	validateParamsCustomization(paramsOrderSchema),
	validateBody(insertOrderItemForCustomerSchema),
	catchAsyncHandler(customerController.insertOrderItemForCustomer),
)

route.put(
	'/:customerId/:orderId/:orderItemId',
	isAuthenticated,
	authorizedRoles('management', 'employee'),
	validateParamsCustomization(paramsOrderItemSchema),
	validateBody(updateOrderItemForCustomerSchema),
	catchAsyncHandler(customerController.updateOrderItemForCustomer),
)

route.delete(
	'/:customerId/:orderId/:orderItemId',
	isAuthenticated,
	authorizedRoles('management', 'employee'),
	validateParamsCustomization(paramsOrderItemSchema),
	catchAsyncHandler(customerController.deleteOrderItemForCustomer),
)

module.exports = route

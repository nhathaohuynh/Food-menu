const express = require('express')
const {
	validateBody,
	validateParams,
	validateBodyAndParams,
} = require('../validations')
const tableController = require('../controllers/table.controller')
const {
	insertTableSchema,
	updateTableSchema,
} = require('../validations/table.schema')
const { isAuthenticated, authorizedRoles } = require('../middleware/auth')
const catchAsyncHandler = require('../middleware/catchAsyncHandler')

const route = express.Router()

route.post(
	'/',
	isAuthenticated,
	authorizedRoles('management'),
	validateBody(insertTableSchema),
	catchAsyncHandler(tableController.insertTable),
)

route.get(
	'/',
	isAuthenticated,
	authorizedRoles('management', 'employee'),
	catchAsyncHandler(tableController.getTables),
)

route.get(
	'/toggle-table/:id',
	isAuthenticated,
	authorizedRoles('management'),
	validateParams(),
	catchAsyncHandler(tableController.toggleCloseTable),
)

route.put(
	'/:id',
	isAuthenticated,
	authorizedRoles('management'),
	validateBodyAndParams(updateTableSchema),
	catchAsyncHandler(tableController.updateTable),
)

module.exports = route

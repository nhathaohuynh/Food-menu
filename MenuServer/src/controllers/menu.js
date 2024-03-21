const {
	validateBody,
	validateBodyAndParams,
	validateParams,
} = require('../Validations')
const {
	insertMenuSchema,
	updateMenuSchema,
} = require('../Validations/memu.schema')
const catchAsyncHandler = require('../middleware/catchAsyncHandler')
const menuService = require('../services/menu.service')
const { PublishEmployeeEvent } = require('../utils')
const { CreatedReponse } = require('../utils/success.response')

module.exports = (app) => {
	app.post(
		'/item',
		validateBody(insertMenuSchema),
		catchAsyncHandler(async (req, res, next) => {
			const accessToken = req.headers['authorization']
			const employeeId = req?.headers['x-client-id']

			// authorization
			const [_, response1] = await Promise.all([
				PublishEmployeeEvent('AUTHORIZATION', accessToken, employeeId),
				menuService.insertMenuItem(req.body),
			])

			return new CreatedReponse({
				metaData: response1,
			}).send(res)
		}),
	)

	app.get(
		'/item',
		catchAsyncHandler(async (req, res, next) => {
			const accessToken = req.headers['authorization']
			const employeeId = req?.headers['x-client-id']
			// authorization
			const [_, response1] = await Promise.all([
				PublishEmployeeEvent('AUTHORIZATION', accessToken, employeeId),
				menuService.getMenuItems(req.query),
			])
			return new CreatedReponse({
				metaData: response1,
			}).send(res)
		}),
	)

	app.put(
		'/item/:id',
		validateBodyAndParams(updateMenuSchema),
		catchAsyncHandler(async (req, res, next) => {
			const accessToken = req.headers['authorization']
			const employeeId = req?.headers['x-client-id']
			// authorization
			const [_, response1] = await Promise.all([
				PublishEmployeeEvent('AUTHORIZATION', accessToken, employeeId),
				menuService.updateMenuItem(req.params.id, req.body),
			])

			return new CreatedReponse({
				metaData: response1,
			}).send(res)
		}),
	)

	app.delete(
		'/item/:id',
		validateParams(),
		catchAsyncHandler(async (req, res, next) => {
			const accessToken = req.headers['authorization']
			const employeeId = req?.headers['x-client-id']
			// authorization
			const [_, response1] = await Promise.all([
				PublishEmployeeEvent('AUTHORIZATION', accessToken, employeeId),
				menuService.removeMenuItem(req.params.id),
			])

			return new CreatedReponse({
				metaData: response1,
			}).send(res)
		}),
	)
}

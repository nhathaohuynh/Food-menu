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
const { CreatedReponse, OkResponse } = require('../utils/success.response')

module.exports = (app) => {
	app.post(
		'/item',
		catchAsyncHandler(async (req, res, next) => {
			return new CreatedReponse({
				metaData: await menuService.insertMenuItem(req.body),
			}).send(res)
		}),
	)

	app.get(
		'/item',
		catchAsyncHandler(async (req, res, next) => {
			return new CreatedReponse({
				metaData: await menuService.getMenuItems(req.query),
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

	app.post(
		'/set-available/:id',
		catchAsyncHandler(async (req, res, next) => {
			console.log('aaa')
			return new OkResponse({
				metaData: await menuService.toggleStatusMenuItem(req.params.id),
			}).send(res)
		}),
	)
}

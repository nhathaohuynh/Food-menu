const {
	validateBody,
	validateParams,
	validateBodyAndParams,
} = require('../Validations')
const {
	insertCategoryMenuSchema,
	updateCategoryMenuSchema,
} = require('../Validations/categoryMenu.schema')
const catchAsyncHandler = require('../middleware/catchAsyncHandler')
const { CreatedReponse } = require('../utils/success.response')
const { PublishEmployeeEvent } = require('../utils')
const cateService = require('../services/cate.service')

module.exports = (app) => {
	app.post(
		'/category',
		validateBody(insertCategoryMenuSchema),
		catchAsyncHandler(async (req, res, next) => {
			const accessToken = req.headers['authorization']
			const employeeId = req?.headers['x-client-id']

			// authorization
			const [_, response1] = await Promise.all([
				PublishEmployeeEvent('AUTHORIZATION', accessToken, employeeId),
				cateService.insertCategory(req.body),
			])

			return new CreatedReponse({
				metaData: response1,
			}).send(res)
		}),
	)

	app.get(
		'/category',
		catchAsyncHandler(async (req, res, next) => {
			const accessToken = req.headers['authorization']
			const employeeId = req?.headers['x-client-id']
			// authorization
			const [_, response1] = await Promise.all([
				PublishEmployeeEvent('AUTHORIZATION', accessToken, employeeId),
				cateService.getCategories(),
			])
			return new CreatedReponse({
				metaData: response1,
			}).send(res)
		}),
	)

	app.put(
		'/category/:id',
		validateBodyAndParams(updateCategoryMenuSchema),
		catchAsyncHandler(async (req, res, next) => {
			const accessToken = req.headers['authorization']
			const employeeId = req?.headers['x-client-id']
			// authorization
			const [_, response1] = await Promise.all([
				PublishEmployeeEvent('AUTHORIZATION', accessToken, employeeId),
				cateService.updateCategory(req.params.id, req.body),
			])

			return new CreatedReponse({
				metaData: response1,
			}).send(res)
		}),
	)

	app.delete(
		'/category/:id',
		validateParams(),
		catchAsyncHandler(async (req, res, next) => {
			const accessToken = req.headers['authorization']
			const employeeId = req?.headers['x-client-id']
			// authorization
			const [_, response1] = await Promise.all([
				PublishEmployeeEvent('AUTHORIZATION', accessToken, employeeId),
				cateService.removeCategory(req.params.id),
			])

			return new CreatedReponse({
				metaData: response1,
			}).send(res)
		}),
	)
}

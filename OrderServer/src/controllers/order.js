const catchAsyncHandler = require('../middleware/catchAsyncHandler')
const orderService = require('../services/order.service')
const { PublishEmployeeEvent } = require('../utils')
const { CreatedReponse } = require('../utils/success.response')
const { validateBody } = require('../validations')
const { insertOrderSchema } = require('../validations/order.schema')

module.exports = async (app) => {
	app.use(
		'/',
		validateBody(insertOrderSchema),
		catchAsyncHandler(async (req, res, next) => {
			const accessToken = req.headers['authorization']
			const employeeId = req?.headers['x-client-id']

			// authorization
			const [_, response1] = await Promise.all([
				PublishEmployeeEvent('AUTHORIZATION', accessToken, employeeId),
				orderService.insertOrder(req.body),
			])

			return new CreatedReponse({
				metaData: response1,
			}).send(res)
		}),
	)
}

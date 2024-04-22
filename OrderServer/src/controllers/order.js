const catchAsyncHandler = require('../middleware/catchAsyncHandler')
const orderService = require('../services/order.service')
const { CreatedReponse, OkResponse } = require('../utils/success.response')

module.exports = async (app) => {
	app.get(
		'/order-items',
		catchAsyncHandler(async (req, res) => {
			return new OkResponse({
				metaData: {
					order: await orderService.getOrderItems(),
				},
			}).send(res)
		}),
	)

	app.post(
		'/done-dish/:orderItemId',
		catchAsyncHandler(async (req, res) => {
			console.log(req.params.orderItemId)
			return new OkResponse({
				metaData: {
					order: await orderService.makeDoneOrderItem(req.params.orderItemId),
				},
			}).send(res)
		}),
	)
	app.post(
		'/ananlytics',
		catchAsyncHandler(async (req, res) => {
			return new OkResponse({
				metaData: {
					order: await orderService.analyticsInvoice(req.body),
				},
			}).send(res)
		}),
	)
}

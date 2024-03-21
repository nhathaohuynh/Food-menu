const catchAsyncHandler = require('../middleware/catchAsyncHandler')
const orderService = require('../services/order.service')
const { BadRequest } = require('../utils/error.response')
const {
	insertOrderSchema,
	getOrderSchema,
	addMenuItemOrderSchema,
	deleteMenuItemOrderSchema,
	updateMenuItemOrderSchema,
} = require('../validations/order.schema')

module.exports = async (app) => {
	app.use(
		'/events',
		catchAsyncHandler(async (req, res, next) => {
			const { payload } = req.body
			const { event, data } = payload

			switch (event) {
				case 'CREATE_ORDER':
					try {
						await insertOrderSchema.parseAsync(data)
					} catch (error) {
						return next(new BadRequest('Invalid request body'))
					}

					const resCreateOrder = await orderService.insertOrder(data)

					if (!resCreateOrder) {
						return next(new BadRequest('Invalid request body'))
					}
					return res.status(200).json(resCreateOrder)

				case 'GET_ORDER':
					try {
						await getOrderSchema.parseAsync(data)
					} catch (error) {
						return next(new BadRequest('Invalid request body'))
					}

					const resGetOrder = await orderService.getOrder(data)

					if (!resGetOrder) {
						return next(new BadRequest('Invalid request body'))
					}
					return res.status(200).json(resGetOrder)

				case 'ADD_MENUITEM':
					try {
						await addMenuItemOrderSchema.parseAsync(data)
					} catch (error) {
						return next(new BadRequest('Invalid request body'))
					}

					const resAddMenuItem = await orderService.addOrderItemToOrder(data)

					if (!resAddMenuItem) {
						return next(new BadRequest('Invalid request body'))
					}

					return res.status(200).json(resAddMenuItem)

				case 'DELETE_MENUITEM':
					console.log('aaa')
					try {
						await deleteMenuItemOrderSchema.parseAsync(data)
					} catch (error) {
						return next(new BadRequest('Invalid request body'))
					}

					console.log(data)

					const resDeleteMenuItem = await orderService.removeItemFromOrder(data)

					if (!resDeleteMenuItem) {
						return next(new BadRequest('Invalid request body'))
					}

					return res.status(200).json(resDeleteMenuItem)

				case 'UPDATE_MENUITEM':
					console.log('aa')
					console.log(data)
					try {
						await updateMenuItemOrderSchema.parseAsync(data)
					} catch (error) {
						return next(new BadRequest('Invalid request body'))
					}

					const resUpdateMenuItem = await orderService.updateOrderItemFromOrder(
						data,
					)

					if (!resUpdateMenuItem) {
						return next(new BadRequest('Invalid request body'))
					}

					return res.status(200).json(resUpdateMenuItem)
				default:
					break
			}

			return res.status(500).json({
				msg: 'Internal Server Error',
			})
		}),
	)
}

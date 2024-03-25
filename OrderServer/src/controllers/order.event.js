const catchAsyncHandler = require('../middleware/catchAsyncHandler')
const orderService = require('../services/order.service')
const { BadRequest } = require('../utils/error.response')
const {
	insertOrderSchema,
	getOrderSchema,
	addMenuItemOrderSchema,
	deleteMenuItemOrderSchema,
	updateMenuItemOrderSchema,
	paymentOrderForCustomerSchema,
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
					try {
						await deleteMenuItemOrderSchema.parseAsync(data)
					} catch (error) {
						return next(new BadRequest('Invalid request body'))
					}

					const resDeleteMenuItem = await orderService.removeItemFromOrder(data)

					if (!resDeleteMenuItem) {
						return next(new BadRequest('Invalid request body'))
					}

					return res.status(200).json(resDeleteMenuItem)

				case 'UPDATE_MENUITEM':
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

				case 'GET_ORDERS_FOR_CHEF':
					const resGetOrders = await orderService.getOrders()

					if (!resGetOrders) {
						return next(new BadRequest('Invalid request body'))
					}
					return res.status(200).json(resGetOrders)

				case 'UPDATE_STATUS_ORDER_ITEM':
					const resStatusMenuItem = await orderService.updateStatusOrderItem(
						data,
					)

					if (!resStatusMenuItem) {
						return next(new BadRequest('Invalid request body'))
					}
					return res.status(200).json(resStatusMenuItem)

				case 'REVICE_ORDER':
					const resReviceOrder = await orderService.reviceOrder(data)

					if (!resReviceOrder) {
						return next(new BadRequest('Invalid request body'))
					}
					return res.status(200).json(resReviceOrder)

				case 'PAYMENT_ORDER':
					try {
						await paymentOrderForCustomerSchema.parseAsync(data)
					} catch (error) {
						return next(new BadRequest('Invalid request body'))
					}

					console.log('aaa')

					const resPaymentOrder = await orderService.paymentOrderForCustomer(
						data,
					)

					if (!resPaymentOrder) {
						return next(new BadRequest('Invalid request body'))
					}

					return res.status(200).json(resPaymentOrder)
				default:
					break
			}

			return res.status(500).json({
				msg: 'Internal Server Error',
			})
		}),
	)
}

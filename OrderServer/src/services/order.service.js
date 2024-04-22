const {
	findOrderById,
	createNewOrderItem,
	findOrderItemById,
	findOrderItemByIdAndDelete,
	findOrderItemIdAndUpdate,
	createNewOrder,
	findOrderByIdAndPopulate,
	createNewInvoice,
	findInvoiceByTimeline,
	insertOrderItem,
	getOrderItems,
	getOrderItem,
} = require('../database/repository/order.repo')
const { unselectFields } = require('../utils/optionsField')
const moment = require('moment')

class OrderService {
	async insertOrder({ customerId, tableId, employeeId, cart }) {
		const response = await createNewOrder({ customerId, tableId, employeeId })

		const orderItem = cart.map((item) => {
			return {
				...item,
				orderId: response._id,
			}
		})

		await insertOrderItem(orderItem)

		if (!response) throw new BadRequest('Order not found')

		return {
			order: unselectFields(response, ['__v', 'createdAt', 'updatedAt']),
		}
	}

	async getOrder({ orderId }) {
		const order = await findOrderByIdAndPopulate(orderId)

		if (!order) throw new BadRequest('Order not found')

		return {
			order: unselectFields(order, ['__v', 'createdAt', 'updatedAt']),
		}
	}

	async getOrders() {
		const order = await findOrderByIdAndPopulate()

		if (!order) throw new BadRequest('Order not found')

		return {
			order: unselectFields(order, ['__v', 'createdAt', 'updatedAt']),
		}
	}

	async addOrderItemToOrder(payload) {
		console.log(payload)
		const order = await findOrderById(payload.orderId)

		if (!order) throw new BadRequest('Order not found')

		const orderItem = await createNewOrderItem(payload)

		order.orderItem.push(orderItem._id)

		await order.save()

		return {
			orderItem,
		}
	}

	async removeItemFromOrder(payload) {
		const [order, orderItem] = await Promise.all([
			findOrderById(payload.orderId),
			findOrderItemById(payload.orderItemId),
		])

		if (!order || !orderItem) throw new BadRequest('Order not found')

		const orderItemUpdate = await findOrderItemByIdAndDelete(
			payload.orderItemId,
		)

		if (!orderItemUpdate) throw new BadRequest('Order item not found')

		order.orderItem.pull(payload.orderItemId)

		await order.save()

		return {
			orderId: payload.orderItemId,
		}
	}

	async updateOrderItemFromOrder({ orderItemId, orderId, ...payload }) {
		const [order, orderItem] = await Promise.all([
			findOrderById(orderId),
			findOrderItemById(orderItemId),
		])

		if (payload.quantity) {
			payload.subTotal = orderItem.price * payload.quantity
		}

		if (!order || !orderItem) throw new BadRequest('Order not found')

		const response = await findOrderItemIdAndUpdate(orderItemId, payload)

		if (!response) throw new BadRequest('Ocuring with update order item')

		return {
			orderItemId,
		}
	}

	async reviceOrder({ orderId, chefId }) {
		const order = await findOrderById(orderId)

		if (!order) throw new BadRequest('Order not found')

		const currentTime = Date.now()

		// Create a Date object with the current timestamp
		const currentDate = new Date(currentTime)

		// Adjust the time zone offset to Vietnamese time (UTC+07:00)
		currentDate.setUTCHours(currentDate.getUTCHours() + 7)

		if (order.status === 'done')
			throw new BadRequest('Order has been completed')
		if (order.status === 'pending') {
			order.status = 'doing'
			order.chefId = chefId
			order.startTime = currentDate
		}

		await order.save()

		return {
			orderId,
		}
	}

	async updateStatusOrderItem({ orderItemId, orderId }) {
		const [order, orderItem] = await Promise.all([
			findOrderById(orderId),
			findOrderItemById(orderItemId),
		])

		if (!order || !orderItem) throw new BadRequest('Order not found')

		if (orderItem.status === 'done')
			throw new BadRequest('Order item has been completed')

		if (orderItem.status === 'pending') {
			orderItem.status = 'doing'
		} else if (orderItem.status === 'doing') {
			orderItem.status = 'done'
		}

		await orderItem.save()

		const orders = await findOrderById(orderId)

		const isDoneOrder = orders.orderItem.every((item) => item.status === 'done')

		if (isDoneOrder) {
			if (orders.status !== 'doing')
				throw new BadRequest('Order has been completed or canceled')

			const currentTime = Date.now()

			// Create a Date object with the current timestamp
			const currentDate = new Date(currentTime)

			// Adjust the time zone offset to Vietnamese time (UTC+07:00)
			currentDate.setUTCHours(currentDate.getUTCHours() + 7)
			orders.status = 'done'
			orders.finshTime = currentDate
			await orders.save()
		}

		return {
			orderItemId,
			orderId,
		}
	}

	async paymentOrderForCustomer({ orderId, ...body }) {
		const order = await findOrderById(orderId)
		if (!order) throw new BadRequest('Order not found')

		order.isPaid = true

		const payload = {
			orderId,
			...body,
		}

		const [_, invoice] = await Promise.all([
			order.save(),
			createNewInvoice(payload),
		])

		if (!invoice) throw new BadRequest('Invoice not found')

		const data = {
			invoiceId: invoice._id,
			orderId: order._id,
		}

		console.log(data)

		return {
			invoiceId: invoice._id,
			orderId: order._id,
		}
	}

	async analyticsInvoice({ timeline = 'today', startDate, endDate }) {
		let query = {}

		const toUtc = (localTime) => moment(localTime).utc()

		switch (timeline) {
			case 'today':
				query = {
					createdAt: {
						$gte: toUtc(moment().local().startOf('day')),
						$lt: toUtc(moment().local().endOf('day')),
					},
				}
				break
			case 'yesterday':
				query = {
					createdAt: {
						$gte: toUtc(moment().local().subtract(1, 'days').startOf('day')),
						$lt: toUtc(moment().local().subtract(1, 'days').endOf('day')),
					},
				}
				break
			case 'last7days':
				query = {
					createdAt: {
						$gte: toUtc(moment().local().subtract(7, 'days').startOf('day')),
						$lt: toUtc(moment().local().subtract(1, 'days')).endOf('day'),
					},
				}
				break
			case 'thisMonth':
				query = {
					createdAt: {
						$gte: toUtc(moment().local().startOf('month')),
						$lt: toUtc(moment().local().endOf('month')),
					},
				}
				break

			case 'lastMonth':
				query = {
					createdAt: {
						$gte: toUtc(
							moment().local().subtract(1, 'months').startOf('month'),
						),
						$lt: toUtc(moment().local().subtract(1, 'months').endOf('month')),
					},
				}
				break
			case 'custom':
				query = {
					createdAt: {
						$gte: toUtc(moment(startDate).local().startOf('day')),
						$lt: toUtc(moment(endDate).local().endOf('day')),
					},
				}
				break
			default:
				break
		}

		const invoices = await findInvoiceByTimeline(query)

		const totalAmount = invoices.reduce(
			(acc, invoice) => acc + invoice.totalAmount,
			0,
		)

		const numberOfInvoice = invoices.length

		return {
			totalAmount,
			numberOfInvoice,
			orders: invoices,
		}
	}

	async getOrderItems() {
		const orderItems = await getOrderItems()

		if (!orderItems) throw new BadRequest('Order not found')

		return {
			orderItems,
		}
	}

	async makeDoneOrderItem(orderItemId) {
		const orderItem = await getOrderItem(orderItemId)

		if (!orderItem) throw new BadRequest('Order not found')

		orderItem.status = 'done'

		await orderItem.save()

		return {
			orderItem,
		}
	}
}

module.exports = new OrderService()

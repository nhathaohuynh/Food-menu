const {
	findOrderById,
	createNewOrderItem,
	findOrderItemById,
	findOrderItemByIdAndDelete,
	findOrderItemIdAndUpdate,
	createNewOrder,
	findOrderByIdAndPopulate,
} = require('../database/repository/order.repo')
const { unselectFields } = require('../utils/optionsField')

class OrderService {
	async insertOrder(order) {
		console.log('order', order)
		const response = await createNewOrder(order)

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
}

module.exports = new OrderService()

const {
	findOrderById,
	createNewOrderItem,
	findOrderItemById,
	findOrderItemByIdAndDelete,
	findOrderItemIdAndUpdate,
	createNewOrder,
} = require('../database/repository/order.repo')

class OrderService {
	async insertOrder(order) {
		const response = await createNewOrder(order)

		if (!order) throw new BadRequest('Order not found')

		return {
			order: response,
		}
	}

	async addOrderItemToOrder(orderId, payload) {
		const order = await findOrderById(orderId)

		if (!order) throw new BadRequest('Order not found')

		const orderItem = await createNewOrderItem(payload)

		order.orderItem.push(orderItem._id)

		await order.save()

		return {
			orderId: orderId,
		}
	}

	async removeItemFromOrder(orderId, orderItemId) {
		const order = await findOrderById(orderId)

		if (!order) throw new BadRequest('Order not found')

		const orderItem = await findOrderItemByIdAndDelete(orderItemId)

		if (!orderItem) throw new BadRequest('Order item not found')

		order.orderItem.pull(orderItemId)

		return {
			orderId: orderId,
		}
	}

	async updateOrderItemFromOrder(orderItemId, payload) {
		const orderItem = await findOrderItemById(orderItemId)

		if (!orderItem) throw new BadRequest('Order item not found')

		const response = await findOrderItemIdAndUpdate(orderItemId, payload)

		if (!response) throw new BadRequest('Ocuring with update order item')

		return {
			orderItemId,
		}
	}
}

module.exports = new OrderService()

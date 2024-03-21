const orderModel = require('../models/Order')
const orderItemModel = require('../models/OrderItem')

module.exports = {
	async createNewOrder(order) {
		return await orderModel.create(order)
	},

	async findOrderById(orderId) {
		return await orderModel.findById(orderId)
	},

	async createNewOrderItem(orderItem) {
		return await orderItemModel.create(orderItem)
	},

	async findOrderItemByIdAndDelete(orderItemId) {
		return await orderItemModel.findByIdAndDelete(orderItemId).lean()
	},

	async findOrderItemById(orderItemId) {
		return await orderItemModel.findById(orderItemId)
	},

	async findOrderItemIdAndUpdate(orderItemId, payload) {
		return await orderItemModel.findByIdAndUpdate(orderItemId, payload).lean()
	},

	async findOrderByIdAndPopulate(orderId) {
		return await orderModel.findById(orderId).populate('orderItem').lean()
	},
}

const orderModel = require('../models/Order')
const orderItemModel = require('../models/OrderItem')
const invoiceModel = require('../models/Invoice')

module.exports = {
	async createNewOrder(order) {
		return await orderModel.create(order)
	},

	async findOrderById(orderId) {
		return await orderModel.findById(orderId).populate('orderItem')
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

	async findOrderByIdAndPopulate(orderId = null) {
		if (!orderId) {
			return orderModel.findOne().populate('orderItem').lean()
		}
		return await orderModel.findById(orderId).populate('orderItem').lean()
	},

	async createNewInvoice(payload) {
		return await invoiceModel.create(payload)
	},

	async insertOrderItem(payload) {
		const orderItems = await orderItemModel.insertMany(payload)
		return orderItems
	},

	async findInvoiceByTimeline(query) {
		return invoiceModel
			.find(query)
			.sort({ createdAt: 'asc' })
			.populate('orderId')
			.lean()
	},

	async getOrderItems() {
		return await orderItemModel.find({ status: 'pending' }).lean()
	},

	async getOrderItem(orderItemId) {
		return await orderItemModel.findById(orderItemId)
	},
}

const { Schema, model } = require('mongoose')

const DOCUMENT_NAME = 'OrderItem'
const COLLECTION_NAME = 'OrderItems'

const orderItemSchema = new Schema(
	{
		orderId: {
			type: Schema.ObjectId,
			ref: 'Order',
		},

		menuItemId: {
			type: Schema.ObjectId,
			ref: 'MenuItem',
		},

		itemName: {
			type: String,
			required: true,
		},

		price: {
			type: Number,
			required: true,
		},

		quantity: {
			type: Number,
			required: true,
			min: [1, 'Quantity can not be less then 1.'],
		},

		subTotal: {
			type: Number,
			required: true,
		},

		note: {
			type: String,
		},

		status: {
			type: String,
			enum: ['pendding', 'ready', 'done'],
			default: 'pendding',
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)

module.exports = model(DOCUMENT_NAME, orderItemSchema)

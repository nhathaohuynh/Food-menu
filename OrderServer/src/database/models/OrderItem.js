const { Schema, model } = require('mongoose')

const DOCUMENT_NAME = 'OrderItem'
const COLLECTION_NAME = 'OrderItems'

const orderItemSchema = new Schema(
	{
		orderId: {
			type: Schema.ObjectId,
			ref: 'Order',
		},

		menuItem: {
			type: Schema.ObjectId,
			ref: 'MenuIem',
		},

		note: {
			type: String,
		},

		chefId: {
			type: Schema.ObjectId,
			ref: 'Employee',
		},

		startTime: {
			type: Date,
			default: Date.now(),
		},

		finshTime: {
			type: Date,
		},

		status: {
			type: String,
			enum: [],
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)

module.exports = model(DOCUMENT_NAME, orderItemSchema)

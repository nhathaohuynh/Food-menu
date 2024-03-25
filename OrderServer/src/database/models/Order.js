const { Schema, model } = require('mongoose')

const DOCUMENT_NAME = 'Order'
const COLLECTION_NAME = 'Orders'

const orderSchema = new Schema(
	{
		tableId: {
			type: Schema.ObjectId,
			ref: 'Table',
			required: true,
		},

		customerId: {
			type: Schema.ObjectId,
			ref: 'Customer',
			required: true,
		},

		employeeId: {
			type: Schema.ObjectId,
			ref: 'Employee',
			required: true,
		},

		orderItem: [
			{
				type: Schema.ObjectId,
				ref: 'OrderItem',
			},
		],

		chefId: {
			type: Schema.ObjectId,
			ref: 'Employee',
			default: null,
		},

		startTime: {
			type: Date,
		},

		finshTime: {
			type: Date,
		},

		isPaid: {
			type: Boolean,
			default: false,
		},

		status: {
			type: String,
			enum: ['pending', 'doing', 'done'],
			default: 'pending',
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)

module.exports = model(DOCUMENT_NAME, orderSchema)

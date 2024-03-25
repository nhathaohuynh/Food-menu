const { Schema, model } = require('mongoose')

const DOCUMENT_NAME = 'Invoice'
const COLLECTION_NAME = 'Invoices'

const invoiceSchema = new Schema(
	{
		orderId: {
			type: Schema.Types.ObjectId,
			ref: 'Order',
			required: true,
		},

		customerId: {
			type: Schema.Types.ObjectId,
			ref: 'Customer',
			required: true,
		},
		employeeId: {
			type: Schema.Types.ObjectId,
			ref: 'Employee',
			required: true,
		},

		totalAmount: {
			type: Number,
			required: true,
		},

		paymentMethod: {
			type: String,
			enum: ['cash', 'credit_card'],
			required: true,
		},

		receiveAmount: {
			type: Number,
			required: true,
		},

		changeAmount: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)

module.exports = model(DOCUMENT_NAME, invoiceSchema)

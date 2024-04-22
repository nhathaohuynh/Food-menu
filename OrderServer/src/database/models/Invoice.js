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
			type: String,
		},

		totalAmount: {
			type: Number,
			required: true,
		},

		subTotal: {
			type: Number,
			required: true,
		},
		tax: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)

module.exports = model(DOCUMENT_NAME, invoiceSchema)

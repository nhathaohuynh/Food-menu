const { Schema, model } = require('mongoose')

const DOCUMENT_NAME = 'Customer'
const COLLECTION_NAME = 'Customers'

const customerSchema = new Schema(
	{
		name: String,

		phone: {
			type: String,
			required: true,
		},

		email: String,

		isMember: {
			type: Boolean,
			default: false,
		},

		order,
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)

module.exports = model(DOCUMENT_NAME, customerSchema)

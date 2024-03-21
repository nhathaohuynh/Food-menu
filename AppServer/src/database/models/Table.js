const { Schema, model } = require('mongoose')

const DOCUMENT_NAME = 'Table'
const COLLECTION_NAME = 'Tables'

const tableSchema = new Schema(
	{
		number: {
			type: Number,
			required: true,
			unqiue: true,
		},

		capacity: {
			type: Number,
			required: true,
		},

		status: {
			type: String,
			enum: ['available', 'unavailable'],
			default: 'available',
		},

		isClosed: {
			type: Boolean,
			default: false,
		},
	},
	{
		timeseries: true,
		collection: COLLECTION_NAME,
	},
)

module.exports = model(DOCUMENT_NAME, tableSchema)

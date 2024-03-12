const { Schema, model } = require('mongoose')

const DOCUMENT_NAME = 'Table'
const COLLECTION_NAME = 'Tables'

const tableSchema = new Schema(
	{
		number: {
			type: Number,
			required: true,
		},

		capacity: {
			type: String,
			required: true,
		},

		status: {
			type: String,
			enum: ['available', ''],
		},
	},
	{
		timeseries: true,
		collection: COLLECTION_NAME,
	},
)

module.exports = model(DOCUMENT_NAME, tableName)

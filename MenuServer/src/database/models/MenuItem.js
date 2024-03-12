const { Schema, model } = require('mongoose')

const DOCUMENT_NAME = 'MenuItem'
const COLLECTION_NAME = 'MenuItems'

const menuItemSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},

		price: {
			type: Number,
			required: true,
		},

		unit: {
			type: String,
		},

		picture: {
			type: String,
			required: true,
		},

		categoryId: {
			type: Schema.ObjectId,
			ref: 'GroupMenu',
		},
		status: {
			type: String,
			enum: [''],
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)

module.exports = model(DOCUMENT_NAME, menuItemSchema)

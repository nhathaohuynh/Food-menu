const { Schema, model } = require('mongoose')

const DOCUEMNT_NAME = 'GroupMenu'
const COLLECTION_NAME = 'GroupMenu'

const groupMenuSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},

		menuItems: {
			type: Schema.ObjectId,
			ref: 'MenuItem',
			required: true,
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)

module.exports = model(DOCUEMNT_NAME, groupMenuSchema)

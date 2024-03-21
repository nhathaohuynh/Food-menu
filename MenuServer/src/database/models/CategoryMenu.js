const { Schema, model } = require('mongoose')

const DOCUEMNT_NAME = 'CategoryMenu'
const COLLECTION_NAME = 'CategoryMenus'

const categoryMenuSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},

		description: {
			type: String,
		},

		menuItems: [
			{
				type: Schema.ObjectId,
				ref: 'MenuItem',
			},
		],
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)

module.exports = model(DOCUEMNT_NAME, categoryMenuSchema)

const { Schema, model } = require('mongoose')

const DOCUMENT_NAME = 'MenuItem'
const COLLECTION_NAME = 'MenuItems'

const menuItemSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			index: true,
			unique: true,
		},

		price: {
			type: Number,
			required: true,
		},

		description: {
			type: String,
		},

		unit: {
			type: String,
		},

		picture: {
			type: String,
			required: true,
		},

		categoryId: [
			{
				type: Schema.ObjectId,
				ref: 'CategoryMenu',
			},
		],

		ingredients: {
			type: [String],
			required: true,
		},

		available: {
			type: Boolean,
			default: true,
		},

		isStopSelling: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)

menuItemSchema.pre(/^find/, function (next) {
	// this points to the query
	this.find({ isStopSelling: false })
	next()
})

module.exports = model(DOCUMENT_NAME, menuItemSchema)

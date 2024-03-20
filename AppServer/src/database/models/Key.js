const { Schema, model } = require('mongoose')

const DOCUMENT_NAME = 'Key'
const COLLECTTION_NAME = 'Keys'

const keySchema = new Schema(
	{
		employee: {
			type: Schema.ObjectId,
			ref: 'Employee',
			required: true,
		},
		privateKey: String,
		publicKey: String,
		refreshToken: String,
		refreshTokenUsage: {
			type: [String],
			default: [],
		},
	},
	{
		timestamps: true,
		collection: COLLECTTION_NAME,
	},
)

module.exports = model(DOCUMENT_NAME, keySchema)

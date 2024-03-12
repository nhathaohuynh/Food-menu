const { Schema, model } = require('mongoose')

const DOCUMENT_NAME = 'Employee'
const COLLECTION_NAME = 'Employees'

const employeeSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},

		gender: {
			type: String,
			enum: ['male', 'female'],
		},

		phone: {
			type: String,
		},

		email: {
			type: String,
			required: true,
		},
		role: String,

		address: String,

		salary: String,

		startDate: String,

		EndDate: String,
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)

module.exports = model(DOCUMENT_NAME, employeeSchema)

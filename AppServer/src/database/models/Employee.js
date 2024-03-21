const { Schema, model } = require('mongoose')
const bcryptjs = require('bcryptjs')

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

		password: {
			type: String,
			required: true,
			unselect: true,
		},

		phone: {
			type: String,
		},

		email: {
			type: String,
			required: true,
			index: true,
		},

		role: {
			type: String,
			default: 'employee',
		},

		address: {
			country: String,
			city: String,
			street: String,
		},

		salary: Number,

		startDate: {
			type: Date,
			default: Date.now(),
		},

		orders: {
			type: [Object],
			default: [],
		},

		EndDate: {
			type: Date,
			default: null,
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)

const SALT = bcryptjs.genSaltSync(10)

employeeSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next()
	}
	this.password = await bcryptjs.hash(this.password, SALT)
	next()
})

employeeSchema.methods.comparePassword = async function (enteredPassword) {
	return await bcryptjs.compare(enteredPassword, this.password)
}
module.exports = model(DOCUMENT_NAME, employeeSchema)

const { Schema, model } = require('mongoose')

const DOCUMENT_NAME = 'Shift'
const COLLECTION_NAME = 'Shifts'

const shiftSchema = new Schema(
	{
		employeeId: { type: Schema.Types.ObjectId, ref: 'Employee' },
		startTime: { type: Date, required: true },
		endTime: { type: Date, required: true },
		invoices: [{ type: Schema.Types.ObjectId, ref: 'Invoice' }],
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)

module.exports = model(DOCUMENT_NAME, shiftSchema)

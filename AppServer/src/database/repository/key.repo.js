const keyModel = require('../models/Key')

module.exports = {
	async findByEmployeeIdAndUpdateKey(employeeId, payload) {
		return keyModel
			.findOneAndUpdate({ employee: employeeId }, payload, {
				new: true,
				upsert: true,
			})
			.lean()
	},

	async findKeyByEmployeeAndDelete(employeeId) {
		return await userKey.findOneAndDelete({ employee: employeeId }).lean()
	},

	async findKeyByEmployeeId(employeeId) {
		return await keyModel.findOne({ employee: employeeId }).lean()
	},
}

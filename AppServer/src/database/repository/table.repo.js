const tableModel = require('../models/Table')

module.exports = {
	async createNewTable(table) {
		return await tableModel.create(table)
	},

	async findAllTables() {
		return await tableModel.find().lean()
	},

	async findTableByIdAndUpdaye(tableId, table) {
		return tableModel.findByIdAndUpdate(tableId, table, {
			new: true,
		})
	},

	async findTableById(tableId) {
		return await tableModel.findById(tableId)
	},
}

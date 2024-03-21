const {
	findAllTables,
	createNewTable,
	findTableById,
	findTableByIdAndUpdaye,
} = require('../database/repository/table.repo')
const { BadRequest } = require('../utils/error.response')

class TableService {
	async insertTable(table) {
		return await createNewTable(table)
	}

	async toggleCloseTable(tableId) {
		const table = await findTableById(tableId)
		if (!table) throw new BadRequest('Table not found')

		table.isClosed = !table.isClosed

		await table.save()

		return {
			tableId: table._id,
		}
	}

	async getTables() {
		const tables = await findAllTables()

		return {
			tables,
		}
	}

	async updateTable(tableId, table) {
		const tableExist = await findTableById(tableId)

		if (!tableExist) throw new BadRequest('Table not found')

		if (tableExist.isClosed === true) {
			throw new BadRequest('Table is closed')
		}

		const updatedTable = await findTableByIdAndUpdaye(tableId, table)
		if (!updatedTable) throw new BadRequest('Table not found')

		return {
			table: tableId,
		}
	}
}

module.exports = new TableService()

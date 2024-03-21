const tableService = require('../services/table.service')
const { CreatedReponse, OkResponse } = require('../utils/success.response')

class TableController {
	async insertTable(req, res, next) {
		return new CreatedReponse({
			metaData: await tableService.insertTable(req.body),
		}).send(res)
	}

	async getTables(req, res, next) {
		return new OkResponse({
			metaData: await tableService.getTables(),
		}).send(res)
	}

	async toggleCloseTable(req, res, next) {
		return new OkResponse({
			metaData: await tableService.toggleCloseTable(req.params.id),
		}).send(res)
	}

	async updateTable(req, res, next) {
		return new OkResponse({
			metaData: await tableService.updateTable(req.params.id, req.body),
		}).send(res)
	}
}

module.exports = new TableController()

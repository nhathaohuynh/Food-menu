'use strict'

const reasonStatusCodes = require('./reasonPhrases')
const statusCodes = require('./statusCodes')

class SuccessResponse {
	constructor({
		message = reasonStatusCodes.OK,
		status = statusCodes.OK,
		metaData = {},
	}) {
		this.message = message
		this.status = status
		this.code = 1
		this.metaData = metaData
	}

	send(res) {
		return res.status(this.status).json(this)
	}
}

class OkResponse extends SuccessResponse {
	constructor({
		message = reasonStatusCodes.OK,
		status = statusCodes.OK,
		metaData = {},
		options = {},
	}) {
		super({ message, metaData, status })
		this.options = options
	}
}

class CreatedReponse extends SuccessResponse {
	constructor({
		message = reasonStatusCodes.CREATED,
		status = statusCodes.CREATED,
		metaData = {},
		options = {},
	}) {
		super({ message, metaData, status })
		this.options = options
	}
}

module.exports = {
	OkResponse,
	CreatedReponse,
}

'use strict'
const statusCodes = require('./statusCodes')
const reasonError = require('./reasonPhrases')

class ErrorReponse extends Error {
	constructor(message, status) {
		super(message)
		this.status = status
	}
}

class Conflcit extends ErrorReponse {
	constructor(message = reasonError.CONFLICT, status = statusCodes.CONFLICT) {
		super(message, status)
	}
}

class BadRequest extends ErrorReponse {
	constructor(
		message = reasonError.BAD_REQUEST,
		status = statusCodes.BAD_REQUEST,
	) {
		super(message, status)
	}
}

class Forbidden extends ErrorReponse {
	constructor(message = reasonError.FORBIDDEN, status = statusCodes.FORBIDDEN) {
		super(message, status)
	}
}

class TooManyRequest extends ErrorReponse {
	constructor(
		message = reasonError.TOO_MANY_REQUESTS,
		status = statusCodes.TOO_MANY_REQUESTS,
	) {
		super(message, status)
	}
}

class Unauthorized extends ErrorReponse {
	constructor(
		message = reasonError.UNAUTHORIZED,
		status = statusCodes.UNAUTHORIZED,
	) {
		super(message, status)
	}
}

module.exports = {
	Conflcit,
	BadRequest,
	Forbidden,
	TooManyRequest,
	Unauthorized,
}

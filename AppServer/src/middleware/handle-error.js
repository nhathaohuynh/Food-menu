'use strict'
const _STATUS = {
	error: 'Error',
	success: 'Success',
}

const errorHandler = (error, req, res, next) => {
	const status = error.status || 500
	const msg = error.message || 'Server internal'

	return res.status(status).json({
		status: _STATUS.error,
		code: -1,
		stack: error.stack,
		msg,
	})
}

module.exports = errorHandler

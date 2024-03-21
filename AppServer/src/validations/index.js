const { z } = require('zod')
const { BadRequest } = require('../utils/error.response')

const validateBody = (schema) => async (req, res, next) => {
	try {
		await schema.parseAsync({
			body: req.body,
		})
		return next()
	} catch (err) {
		return next(new BadRequest('Invalid request body'))
	}
}
const validateBodyAndParams = (schema) => async (req, res, next) => {
	try {
		await schema.parseAsync({
			body: req.body,
			params: req.params,
		})
		return next()
	} catch (err) {
		return next(new BadRequest('Invalid request body or params'))
	}
}

const paramsSchema = z.object({
	params: z.object({
		id: z.string(),
	}),
})

const validateParams = () => async (req, res, next) => {
	try {
		await paramsSchema.parseAsync({
			params: req.params,
		})
		return next()
	} catch (err) {
		return next(new BadRequest('Invalid request params'))
	}
}

const validateParamsCustomization = (schema) => async (req, res, next) => {
	try {
		await schema.parseAsync({
			params: req.params,
		})
		return next()
	} catch (err) {
		return next(new BadRequest('Invalid request params'))
	}
}

module.exports = {
	validateParams,
	validateBodyAndParams,
	validateBody,
	validateParamsCustomization,
}

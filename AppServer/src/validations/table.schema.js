const { z } = require('zod')

const insertTableSchema = z.object({
	body: z.object({
		number: z.number().int().positive(),
		capacity: z.number().int().positive(),
	}),
})

const updateTableSchema = z.object({
	body: z.object({
		number: z.number().int().positive().optional(),
		capacity: z.number().int().positive().optional(),
	}),
	params: z.object({
		id: z.string(),
	}),
})
module.exports = {
	insertTableSchema,
	updateTableSchema,
}

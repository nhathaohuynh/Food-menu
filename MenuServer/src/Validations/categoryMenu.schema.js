const { z } = require('zod')

const insertCategoryMenuSchema = z.object({
	body: z.object({
		name: z.string().min(3, 'Name must be at least 3 character long'),
		description: z.string().optional(),
		menuItems: z.string().optional(),
	}),
})

const updateCategoryMenuSchema = z.object({
	body: z.object({
		name: z
			.string()
			.min(3, 'Name must be at least 3 character long')
			.optional(),
		description: z.string().optional(),
		menuItems: z.string().optional(),
	}),
})

module.exports = {
	insertCategoryMenuSchema,
	updateCategoryMenuSchema,
}

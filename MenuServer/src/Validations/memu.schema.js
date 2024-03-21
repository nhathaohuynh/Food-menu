const { z } = require('zod')

const insertMenuSchema = z.object({
	body: z.object({
		name: z.string(),
		price: z.number().positive({ message: 'Price must be a positive number' }),
		description: z.string().optional(),
		unit: z.string(),
		picture: z.string().url({ message: 'Picture must be a valid URL' }),
		categoryId: z.array(z.string()).optional(),
		ingredients: z.array(z.string()).optional(),
	}),
})

const updateMenuSchema = z.object({
	body: z.object({
		name: z.string().nonempty({ message: 'Name is required' }).optional(),
		price: z
			.number()
			.positive({ message: 'Price must be a positive number' })
			.optional(),
		description: z.string().optional(),
		unit: z.string().nonempty({ message: 'Unit is required' }).optional(),
		picture: z
			.string()
			.url({ message: 'Picture must be a valid URL' })
			.optional(),
		categoryId: z.array(z.string()).optional(),
		ingredients: z.array(z.string()).optional(),
	}),
	params: z.object({
		id: z.string(),
	}),
})

module.exports = {
	insertMenuSchema,
	updateMenuSchema,
}

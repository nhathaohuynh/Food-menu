const { z } = require('zod')

const insertOrderForCustomerSchema = z.object({
	body: z.object({
		phone: z
			.string()
			.length(10, 'Phone number must be exactly 10 characters long'),
		tableId: z.string(),
	}),
})

const paramsOrderSchema = z.object({
	params: z.object({
		orderId: z.string(),
		customerId: z.string(),
	}),
})

const insertOrderItemForCustomerSchema = z.object({
	body: z.object({
		menuItemId: z.string(),
		quantity: z.number().int().positive(),
		note: z.string().optional(),
	}),
})

const paramsOrderItemSchema = z.object({
	params: z.object({
		orderId: z.string(),
		customerId: z.string(),
		orderItemId: z.string(),
	}),
})
const updateOrderItemForCustomerSchema = z.object({
	body: z.object({
		quantity: z.number().int().positive().optional(),
		note: z.string().optional(),
	}),
})

module.exports = {
	insertOrderForCustomerSchema,
	paramsOrderSchema,
	insertOrderItemForCustomerSchema,
	paramsOrderItemSchema,
	updateOrderItemForCustomerSchema,
}

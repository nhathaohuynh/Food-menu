const { z } = require('zod')
const {
	paymentOrderForCustomer,
} = require('../controllers/customer.controller')

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
		orderId: z.string().optional(),
		customerId: z.string().optional(),
		orderItemId: z.string().optional(),
	}),
})
const updateOrderItemForCustomerSchema = z.object({
	body: z.object({
		quantity: z.number().int().positive().optional(),
		note: z.string().optional(),
	}),
})

const paymentOrderForCustomerSchema = z.object({
	body: z.object({
		totalAmount: z.number().min(0),
		paymentMethod: z.enum(['cash', 'credit_card']),
		receiveAmount: z.number().min(0),
		changeAmount: z.number().min(0),
	}),
})

module.exports = {
	insertOrderForCustomerSchema,
	paramsOrderSchema,
	insertOrderItemForCustomerSchema,
	paramsOrderItemSchema,
	updateOrderItemForCustomerSchema,
	paymentOrderForCustomerSchema,
}

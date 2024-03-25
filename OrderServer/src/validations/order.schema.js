const { z } = require('zod')

const insertOrderSchema = z.object({
	tableId: z.string(),
	customerId: z.string(),
	employeeId: z.string(),
})

const getOrderSchema = z.object({
	orderId: z.string(),
})

const addMenuItemOrderSchema = z.object({
	orderId: z.string(),
	menuItemId: z.string(),
	itemName: z.string(),
	price: z.number().min(0),
	quantity: z.number().int().min(1),
	note: z.string().optional().nullable(),
	subTotal: z.number().min(0),
})

const deleteMenuItemOrderSchema = z.object({
	orderItemId: z.string(),
	orderId: z.string(),
})

const updateMenuItemOrderSchema = z.object({
	quantity: z.number().int().min(1).optional(),
	note: z.string().optional(),
	orderItemId: z.string(),
	orderId: z.string(),
})

const paymentOrderForCustomerSchema = z.object({
	orderId: z.string(),
	customerId: z.string(),
	employeeId: z.string(),
	totalAmount: z.number().min(0),
	paymentMethod: z.enum(['cash', 'credit_card']),
	receiveAmount: z.number().min(0),
	changeAmount: z.number().min(0),
})

module.exports = {
	insertOrderSchema,
	getOrderSchema,
	addMenuItemOrderSchema,
	deleteMenuItemOrderSchema,
	updateMenuItemOrderSchema,
	paymentOrderForCustomerSchema,
}

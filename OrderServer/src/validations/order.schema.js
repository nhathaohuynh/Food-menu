const { z } = require('zod')

const insertOrderSchema = z.object({
	body: z.object({
		tableId: z.string().uuid(),
		customerId: z.string().uuid(),
		employeeId: z.string().uuid(),
		orderItems: z.array(z.string()).default([]),
		status: z.enum(['pending', 'done']).default('pending'),
	}),
})

module.exports = {
	insertOrderSchema,
}

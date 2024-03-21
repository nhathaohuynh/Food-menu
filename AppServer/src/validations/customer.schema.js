const { z } = require('zod')

const insertCustomerSchema = z.object({
	body: z.object({
		phone: z
			.string()
			.length(10, 'Phone number must be exactly 10 characters long'),
	}),
})

module.exports = {
	insertCustomerSchema,
}

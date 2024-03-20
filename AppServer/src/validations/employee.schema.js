const { z } = require('zod')

const registerSchema = z.object({
	body: z.object({
		name: z.string().min(3, 'Name must be at least 3 character long'),
		email: z.string().email(),
		password: z
			.string()
			.min(6, 'Password must be at least 6 characters long')
			.max(20, 'Password must be at least 20 characters long'),
		role: z.string().default('employee'),
		address: z
			.object({
				country: z.string(),
				city: z.string(),
				street: z.string(),
			})
			.optional(),
		salary: z.number().optional().default(0),
	}),
})

const loginSchema = z.object({
	body: z.object({
		email: z.string().email(),
		password: z
			.string()
			.min(6, 'Password must be at least 6 characters long')
			.max(20, 'Password must be at least 20 characters long'),
	}),
})

const refreshTokenSchema = z.object({
	body: z.object({
		refreshToken: z.string(),
	}),
})

module.exports = {
	loginSchema,
	registerSchema,
	refreshTokenSchema,
}

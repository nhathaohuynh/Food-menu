const { isAuthenticated } = require('../middleware/auth')
const catchAsyncHandler = require('../middleware/catchAsyncHandler')

module.exports = (app) => {
	app.use(
		'/employee/events',
		isAuthenticated,
		catchAsyncHandler((req, res, next) => {
			const { payload } = req.body

			const { event, data } = payload

			switch (event) {
				case 'AUTHORIZATION':
					const response = req.employee
					return res.status(200).json({
						employee: selectFields(response, ['_id', 'name', 'email']),
					})
				default:
					break
			}

			return res.status(500).json({
				msg: 'Internal Server Error',
			})
		}),
	)
}

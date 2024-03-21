const { isAuthenticated } = require('../middleware/auth')
const catchAsyncHandler = require('../middleware/catchAsyncHandler')
const employeeService = require('../services/employee.service')

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
					return res.status(200).json(response)
				case 'TEST':
					console.log('Working...subscriber')
				default:
					break
			}

			return res.status(200).json()
		}),
	)
}

const { CreatedReponse } = require('../utils/success.response')

const employeeService = require('../services/employee.service')
class EmployeeController {
	async insertEmployee(req, res, next) {
		return new CreatedReponse({
			metaData: await employeeService.insertEmployee(req.body),
		}).send(res)
	}

	async loginEmployee(req, res, next) {
		return new CreatedReponse({
			metaData: await employeeService.loginEmployee(req.body),
		}).send(res)
	}

	async logoutEmployee(req, res, next) {
		return new CreatedReponse({
			metaData: await employeeService.logoutEmployee(req.employee),
		}).send(res)
	}

	async refreshToken(req, res, next) {
		const employeeId = req.headers['x-client-id']
		const refreshToken = req.body.refreshToken
		return new CreatedReponse({
			metaData: await employeeService.refreshTokenEmployee(
				employeeId,
				refreshToken,
				next,
			),
		}).send(res)
	}
}

module.exports = new EmployeeController()

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
			metaData: await employeeService.logoutEmployee(req.body),
		}).send(res)
	}

	async refreshToken(req, res, next) {
		return new CreatedReponse({
			metaData: await employeeService.regreshTokenEmployee(req.body),
		}).send(res)
	}
}

module.exports = new EmployeeController()

const employeeModel = require('../models/Employee')

module.exports = {
	async insertEmployee(employee) {
		return await employeeModel.create(employee)
	},

	async findEmployeeByEmail(email) {
		return await employeeModel.findOne({ email })
	},

	async findEmployeeById(employeeId) {
		return await employeeModel.findById(employeeId)
	},
}

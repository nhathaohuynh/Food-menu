const customerModel = require('../models/Customer')

module.exports = {
	async createNewCustomer(customer) {
		return await customerModel.create(customer)
	},

	async findCustomerByPhone(phone) {
		return await customerModel.findOne({ phone }).lean()
	},

	async findCustomerById(customerId) {
		return await customerModel.findById(customerId)
	},
}

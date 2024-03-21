const customerModel = require('../models/Customer')

module.exports = {
	async createNewCustomer(customer) {
		return await customerModel.create(customer)
	},
}

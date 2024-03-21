const { createNewCustomer } = require('../database/repository/customer.repo')

class CustomerService {
	async insertCustomer(customer) {
		return await createNewCustomer(customer)
	}
}

module.exports = new CustomerService()

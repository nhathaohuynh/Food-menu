const {
	unselectFields,
} = require('../../../OrderServer/src/utils/optionsField')
const {
	createNewCustomer,
	findCustomerByPhone,
	findCustomerById,
} = require('../database/repository/customer.repo')

class CustomerService {
	async insertCustomer(phone) {
		const customer = await findCustomerByPhone(phone)

		if (customer) {
			return {
				customer,
			}
		}

		const newCustomer = await createNewCustomer({ phone })

		return {
			customer: newCustomer,
		}
	}

	async getCustomer(customerId) {
		const customer = await findCustomerById(customerId)

		if (!customer) throw new BadRequest('Customer not found')

		return {
			customer: unselectFields(customer, ['__v', 'createdAt', 'updatedAt']),
		}
	}

	async updateInvoice(customerId, invoiceId) {
		const customer = await findCustomerById(customerId)

		if (!customer) throw new BadRequest('Customer not found')

		customer.invoice.push(invoiceId)

		await customer.save()

		return {
			customerId,
		}
	}
}

module.exports = new CustomerService()

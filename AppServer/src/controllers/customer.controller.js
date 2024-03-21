const customerService = require('../services/customer.service')
const { CreatedReponse } = require('../utils/success.response')

class CustomerController {
	async insertCustomer(req, res, next) {
		return new CreatedReponse({
			metaData: await customerService.insertCustomer(req.body),
		}).send(res)
	}
}

module.exports = new CustomerController()

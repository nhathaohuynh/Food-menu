const { CreatedReponse, OkResponse } = require('../utils/success.response')

const employeeService = require('../services/employee.service')
const { PublishOrderEvent, PublishMenuEvent } = require('../utils')
const customerService = require('../services/customer.service')
class EmployeeController {
	async insertEmployee(req, res, next) {
		return new CreatedReponse({
			metaData: await employeeService.insertEmployee(req.body),
		}).send(res)
	}

	async loginEmployee(req, res, next) {
		return new OkResponse({
			metaData: await employeeService.loginEmployee(req.body),
		}).send(res)
	}

	async logoutEmployee(req, res, next) {
		return new OkResponse({
			metaData: await employeeService.logoutEmployee(req.employee._id),
		}).send(res)
	}

	async refreshToken(req, res, next) {
		const employeeId = req.headers['x-client-id']
		const refreshToken = req.body.refreshToken
		return new OkResponse({
			metaData: await employeeService.refreshTokenEmployee(
				employeeId,
				refreshToken,
				next,
			),
		}).send(res)
	}

	async getOrdersForChef(req, res, next) {
		const accessToken = req.headers['authorization']
		const employeeId = req.employee._id

		const event = 'GET_ORDERS_FOR_CHEF'
		const payload = {}

		const resOrders = await PublishOrderEvent(
			event,
			accessToken,
			employeeId,
			payload,
		)

		if (resOrders.status !== 200) throw new BadRequest('Invalid request')
		// if customer or order not found
		return new OkResponse({
			metaData: resOrders.data,
		}).send(res)
	}

	async adjustmentMenuItemFromChef(req, res, next) {
		const menuItemId = req.params.id
		const accessToken = req.headers['authorization']
		const employeeId = req.employee._id

		const event = 'ADJUSTMENT_MENU_ITEM'
		const payload = {
			menuItemId,
		}

		const resOrders = await PublishMenuEvent(
			event,
			accessToken,
			employeeId,
			payload,
		)

		if (resOrders.status !== 200) throw new BadRequest('Invalid request')
		// if customer or order not found
		return new OkResponse({
			metaData: resOrders.data,
		}).send(res)
	}

	async updateStatusOrderItem(req, res, next) {
		const orderId = req.params.orderId
		const orderItemId = req.params.orderItemId
		const accessToken = req.headers['authorization']
		const employeeId = req.employee._id

		const event = 'UPDATE_STATUS_ORDER_ITEM'
		const payload = {
			orderId,
			orderItemId,
		}

		const resOrders = await PublishOrderEvent(
			event,
			accessToken,
			employeeId,
			payload,
		)

		if (resOrders.status !== 200) throw new BadRequest('Invalid request')
		// if customer or order not found
		return new OkResponse({
			metaData: resOrders.data,
		}).send(res)
	}

	async receivingOrder(req, res, next) {
		const orderId = req.params.orderId
		const accessToken = req.headers['authorization']
		const employeeId = req.employee._id

		const event = 'REVICE_ORDER'
		const payload = {
			orderId,
			chefId: employeeId,
		}

		const resOrders = await PublishOrderEvent(
			event,
			accessToken,
			employeeId,
			payload,
		)

		const invoice = resOrders?.data || null

		if (!invoice) throw new BadRequest('Invalid request')

		const [res1, res2] = await Promise.all([
			employeeService.updateInvoiceEmployee(employeeId, invoice._id),
			customerService.updateInvoiceCustomer(invoice.customerId, invoice._id),
		])

		if (!res1 || !res2) throw new BadRequest('Invalid request')

		if (resOrders.status !== 200) throw new BadRequest('Invalid request')
		// if customer or order not found
		return new OkResponse({
			metaData: invoice,
		}).send(res)
	}
}

module.exports = new EmployeeController()

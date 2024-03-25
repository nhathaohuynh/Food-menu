const customerService = require('../services/customer.service')
const tableService = require('../services/table.service')
const { PublishOrderEvent, PublishMenuEvent } = require('../utils')
const { CreatedReponse, OkResponse } = require('../utils/success.response')

class CustomerController {
	async insertOrderForCustomer(req, res, next) {
		const { tableId, phone } = req.body

		const accessToken = req.headers['authorization']
		const employeeId = req.employee._id

		const [resRable, resCustomer] = await Promise.all([
			tableService.updateTable(tableId, {
				status: 'unavailable',
			}),
			customerService.insertCustomer(phone),
		])

		if (!resRable || !resCustomer)
			return next(new BadRequest('Invalid request')) // if table or customer not found

		const event = 'CREATE_ORDER'
		const payload = {
			tableId,
			customerId: resCustomer.customer._id,
			employeeId,
		}

		// call Order server create new order
		const response = await PublishOrderEvent(
			event,
			accessToken,
			employeeId,
			payload,
		)

		if (response.status !== 200) throw new BadRequest('Invalid request') // if order not found

		return new CreatedReponse({
			metaData: {
				order: response.data.order,
				customerId: resCustomer.customer._id,
			},
		}).send(res)
	}

	async getOrderFromCustomer(req, res, next) {
		const { customerId, orderId } = req.params

		const accessToken = req.headers['authorization']
		const employeeId = req.employee._id

		const event = 'GET_ORDER'
		const payload = {
			orderId,
		}

		const [resCustomer, resOrder] = await Promise.all([
			customerService.getCustomer(customerId),
			PublishOrderEvent(event, accessToken, employeeId, payload),
		])

		if (!resCustomer || resOrder.status !== 200)
			throw new BadRequest('Invalid request') // if customer or order not found

		// call Order Server get order

		return new OkResponse({
			metaData: {
				order: resOrder.data.order,
			},
		}).send(res)
	}

	async insertOrderItemForCustomer(req, res, next) {
		const { menuItemId } = req.body

		const { customerId, orderId } = req.params

		const accessToken = req.headers['authorization']
		const employeeId = req.employee._id

		const eventMenu = 'GET_MENUITEM'
		const payloadMenu = {
			menuItemId,
		}

		const [resCustomer, resMenuItem] = await Promise.all([
			customerService.getCustomer(customerId),
			PublishMenuEvent(eventMenu, accessToken, employeeId, payloadMenu),
		])

		if (!resCustomer || resMenuItem.status !== 200)
			throw new BadRequest('Invalid request') // if customer or menu item not found

		const { menu: menuItem } = resMenuItem.data

		const eventOrder = 'ADD_MENUITEM'
		const payloadOrder = {
			orderId,
			menuItemId: menuItem._id,
			itemName: menuItem.name,
			price: menuItem.price,
			quantity: req.body.quantity,
			note: req.body?.note ? req.body?.note : null,
			subTotal: menuItem.price * req.body.quantity,
		}

		const resOrderItem = await PublishOrderEvent(
			eventOrder,
			accessToken,
			employeeId,
			payloadOrder,
		)

		if (resOrderItem.status !== 200) throw new BadRequest('Invalid request') // if order item not found

		return new OkResponse({
			metaData: resOrderItem.data,
		}).send(res)
	}

	async deleteOrderItemForCustomer(req, res, next) {
		const { customerId, orderId, orderItemId } = req.params

		const accessToken = req.headers['authorization']
		const employeeId = req.employee._id

		const event = 'DELETE_MENUITEM'
		const payload = {
			orderId,
			orderItemId,
		}

		console.log(payload)

		const [resCustomer, resOrderItem] = await Promise.all([
			customerService.getCustomer(customerId),
			PublishOrderEvent(event, accessToken, employeeId, payload),
		])

		if (!resCustomer || resOrderItem.status !== 200)
			throw new BadRequest('Invalid request') // if order item not found

		return new OkResponse({
			metaData: resOrderItem.data,
		}).send(res)
	}

	async updateOrderItemForCustomer(req, res, next) {
		const { customerId, orderId, orderItemId } = req.params

		const accessToken = req.headers['authorization']
		const employeeId = req.employee._id

		const event = 'UPDATE_MENUITEM'
		const payload = {
			orderId,
			orderItemId,
		}

		if (req.body.quantity) {
			payload.quantity = req.body.quantity
		}

		if (req.body.note) {
			payload.note = req.body.note
		}

		const [resCustomer, resOrderItem] = await Promise.all([
			customerService.getCustomer(customerId),
			PublishOrderEvent(event, accessToken, employeeId, payload),
		])

		if (!resCustomer || resOrderItem.status !== 200)
			throw new BadRequest('Invalid request') // if order item not found

		return new OkResponse({
			metaData: resOrderItem.data,
		}).send(res)
	}

	async paymentOrderForCustomer(req, res, next) {
		const { customerId, orderId } = req.params

		const accessToken = req.headers['authorization']
		const employeeId = req.employee._id

		const event = 'PAYMENT_ORDER'
		const payload = {
			orderId,
			customerId,
			employeeId,
			...req.body,
		}

		const [resCustomer, resOrder] = await Promise.all([
			customerService.getCustomer(customerId),
			PublishOrderEvent(event, accessToken, employeeId, payload),
		])

		if (!resCustomer || resOrder.status !== 200)
			throw new BadRequest('Invalid request') // if customer or order not found

		return new OkResponse({
			metaData: resOrder.data,
		}).send(res)
	}
}

module.exports = new CustomerController()

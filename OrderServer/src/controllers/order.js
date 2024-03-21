const catchAsyncHandler = require('../middleware/catchAsyncHandler')
const orderService = require('../services/order.service')
const { PublishEmployeeEvent } = require('../utils')
const { CreatedReponse } = require('../utils/success.response')
const { validateBody } = require('../validations')
const { insertOrderSchema } = require('../validations/order.schema')

module.exports = async (app) => {}

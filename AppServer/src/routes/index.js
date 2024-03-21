const express = require('express')
const route = express.Router()

route.use('/customer', require('./customer.route'))
route.use('/employee', require('./employee.route'))
route.use('/table', require('./table.route'))

module.exports = route

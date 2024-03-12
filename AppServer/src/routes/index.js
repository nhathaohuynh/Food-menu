const express = require('express')
const route = express.Router()

route.use('/customer', require('./customer.route'))
route.use('/employee', require('./employee.route'))
route.use('/table', require('./table.route'))
route.use('/customer/events', require('./customerEvent.route'))
route.use('/employee/events', require('./employeeEvent.route'))
route.use('/table/events', require('./tableEvent.route'))

module.exports = route

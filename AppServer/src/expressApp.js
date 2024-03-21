const express = require('express')
const cors = require('cors')
const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/handle-error')
const CustomerEnvent = require('./controllers/customer.event.controller')
const EmployeeEnvent = require('./controllers/employee.event.controller')
const morgan = require('morgan')

module.exports = async (app) => {
	app.use(express.json({ limit: '1mb' }))
	app.use(express.urlencoded({ extended: true, limit: '1mb' }))
	app.use(cors())
	app.use(express.static(__dirname + '/public'))
	app.use(morgan('dev'))

	//api

	// appEvent(app)
	app.use('/', require('./routes'))
	// public event employee
	EmployeeEnvent(app)

	// not found
	app.use(notFound)

	// handle errors
	app.use(errorHandler)
}

const express = require('express')
const cors = require('cors')
const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/handle-error')
const order = require('./controllers/order')
const orderEvent = require('./controllers/order.event')

module.exports = async (app) => {
	app.use(express.json({ limit: '1mb' }))
	app.use(express.urlencoded({ extended: true, limit: '1mb' }))
	app.use(cors())
	app.use(express.static(__dirname + '/public'))

	// appEvent(app)

	//api
	orderEvent(app)
	order(app)

	// not found
	app.use(notFound)

	// handle errors
	app.use(errorHandler)
}

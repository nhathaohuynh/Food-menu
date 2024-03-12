const express = require('express')
const cors = require('cors')
const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/handle-error')

module.exports = async (app) => {
	app.use(express.json({ limit: '1mb' }))
	app.use(express.urlencoded({ extended: true, limit: '1mb' }))
	app.use(cors())
	app.use(express.static(__dirname + '/public'))

	//api

	// appEvent(app)
	app.use('/', require('./routes'))

	// not found
	app.use(notFound)

	// handle errors
	app.use(errorHandler)
}

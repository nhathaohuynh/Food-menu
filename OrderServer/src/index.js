const express = require('express')
const { PORT } = require('./config/env.config')
const { databaseConnection } = require('./database')
const expressApp = require('./expressApp')

const StartServer = async () => {
	const app = express()

	databaseConnection()

	await expressApp(app)

	app
		.listen(PORT, () => {
			console.log(`App server is listening to port ${PORT}`)
		})
		.on('error', (err) => {
			console.log(err)
			process.exit()
		})
}

StartServer()

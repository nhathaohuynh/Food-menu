const express = require('express')

const route = express.Router()

route.use('/', async (req, res, next) => {
	const { payload } = req.body
	return res.status(200).json({
		msg: 'event is working',
	})
})

module.exports = route

const express = require('express')

const route = express.Router()

route.get('/', (req, res, next) => {
	return res.status(200).json({
		msg: 'hello customer',
	})
})

module.exports = route
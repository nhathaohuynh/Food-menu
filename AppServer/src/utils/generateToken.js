'use strict'

const jwt = require('jsonwebtoken')

const generatePairToken = (payload, publicKey, privateKey) => {
	const accessToken = jwt.sign(payload, publicKey, {
		expiresIn: '1days',
	})

	const refreshToken = jwt.sign(payload, privateKey, {
		expiresIn: '7days',
	})

	return { accessToken, refreshToken }
}

module.exports = {
	generatePairToken,
}

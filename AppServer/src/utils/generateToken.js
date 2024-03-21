'use strict'

const jwt = require('jsonwebtoken')

const generatePairToken = (payload, publicKey, privateKey) => {
	const accessToken = jwt.sign(payload, publicKey, {
		expiresIn: '1d',
	})

	const refreshToken = jwt.sign(payload, privateKey, {
		expiresIn: '7d',
	})

	return { accessToken, refreshToken }
}

module.exports = {
	generatePairToken,
}

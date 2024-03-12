'use strict'

const _ = require('lodash')

module.exports = {
	selectedField: (fields = [], object = {}) => {
		return _.pick(object, fields)
	},
}

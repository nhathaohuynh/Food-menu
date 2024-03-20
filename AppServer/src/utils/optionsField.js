const _ = require('lodash')

const selectFields = (obj, fieldsToSelect) => {
	return _.pick(obj, fieldsToSelect)
}
const unselectFields = (obj, fieldsToUnselect) => {
	return _.omit(JSON.parse(JSON.stringify(obj)), fieldsToUnselect)
}

module.exports = {
	selectFields,
	unselectFields,
}

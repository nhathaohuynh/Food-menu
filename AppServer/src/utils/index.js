const axios = require('axios')

//Utility functions

module.exports.FormateData = (data) => {
	if (data) {
		return { data }
	} else {
		throw new Error('Data Not found!')
	}
}

module.exports.PublishOrderEvent = async (event, data = {}) => {
	return await axios.post(
		'http://localhost:8000/order/events',
		{
			payload: {
				event,
				data,
			},
		},
		{
			headers: {
				'Content-Type': 'application/json',
			},
		},
	)
}

module.exports.PublishMenuEvent = async (
	event,
	accessToken,
	employeeId,
	data = {},
) => {
	return await axios.post(
		'http://localhost:8000/menu/events',
		{
			payload: {
				event,
				data,
			},
		},
		{
			headers: {
				'Content-Type': 'application/json',
				Authorization: accessToken,
				'x-client-id': employeeId,
			},
		},
	)
}

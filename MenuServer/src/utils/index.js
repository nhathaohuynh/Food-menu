const axios = require('axios')

module.exports.FormateData = (data) => {
	if (data) {
		return { data }
	} else {
		throw new Error('Data Not found!')
	}
}

module.exports.PublishEmployeeEvent = async (
	event,
	accessToken,
	employeeId,
	data = {},
) => {
	return await axios.post(
		'http://localhost:8000/employee/events',
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

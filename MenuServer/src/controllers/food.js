module.exports = async (app) => {
	app.use('/', (req, res, next) => {
		return res.status(200).json({
			msg: 'hello food',
		})
	})
}

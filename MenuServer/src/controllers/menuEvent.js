const catchAsyncHandler = require('../middleware/catchAsyncHandler')
const menuService = require('../services/menu.service')
module.exports = (app) => {
	app.use(
		'/events',
		catchAsyncHandler(async (req, res, next) => {
			const { payload } = req.body
			const { event, data } = payload

			switch (event) {
				case 'GET_MENUITEM':
					const resGetMenu = await menuService.getMenuItem(data)
					return res.status(200).json(resGetMenu)

				case 'ADJUSTMENT_MENU_ITEM':
					const resMenuItem = await menuService.toggleStatusMenuItem(data)
					return res.status(200).json(resMenuItem)
				default:
					break
			}

			return res.status(500).json({
				msg: 'Internal Server Error',
			})
		}),
	)
}

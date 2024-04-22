const menuItemModel = require('../models/MenuItem')

module.exports = {
	async createNewMenuItem(menuItem) {
		return await menuItemModel.create(menuItem)
	},

	async findMenuItemById(menuItemId) {
		return await menuItemModel.findById(menuItemId)
	},

	async findMenuByIdAndUpdate(menuItemId, payload) {
		return await menuItemModel.findByIdAndUpdate(menuItemId, payload, {
			new: true,
		})
	},

	async findMenuItemsByQueries({ formattedQueryName, skip, limit }) {
		return await menuItemModel
			.find({
				$or: [formattedQueryName],
			})
			.sort('-createdAt')
			.select('-updatedAt -createdAt')
			.skip(skip)
			.limit(limit)
			.lean()
	},

	async findAndCountMenuItemsByQueries(formattedQueryName) {
		return await menuItemModel
			.find({
				$or: [formattedQueryName],
			})
			.countDocuments({ isStopSelling: false })
	},

	async findMenuItemAndToggleStatus(menuItemId, payload) {
		return await menuItemModel.findByIdAndUpdate(menuItemId, payload).lean()
	},
}

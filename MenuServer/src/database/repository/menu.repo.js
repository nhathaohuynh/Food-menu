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

	findMenuItemsByQueries: async ({ formattedQueryName, skip, limit }) => {
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

	findAndCountMenuItemsByQueries: async (formattedQueryName) => {
		return await menuItemModel
			.find({
				$or: [formattedQueryName],
			})
			.countDocuments({ isStopSelling: false })
	},
}

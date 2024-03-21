const categoryMenuModel = require('../models/CategoryMenu')
module.exports = {
	async createNewCategory(category) {
		return await categoryMenuModel.create(category)
	},

	async getAllCategories() {
		return await categoryMenuModel.find().lean()
	},

	async removeCategory(categoryId) {
		return await categoryMenuModel.findByIdAndDelete(categoryId).lean()
	},

	async updateCategory(categoryId, category) {
		return await categoryMenuModel
			.findByIdAndUpdate(categoryId, category)
			.lean()
	},
}

const {
	createNewCategory,
	getAllCategories,
	removeCategory,
	updateCategory,
} = require('../database/repository/cate')
const { BadRequest } = require('../utils/error.response')

class CateService {
	async insertCategory(category) {
		const caterogy = await createNewCategory(category)
		return {
			caterogy,
		}
	}

	async getCategories() {
		const categories = await getAllCategories()
		return {
			categories,
		}
	}

	async removeCategory(categoryId) {
		const response = await removeCategory(categoryId)
		if (!response) {
			throw new BadRequest('Category not found')
		}
		return {
			categoryId,
		}
	}

	async updateCategory(categoryId, category) {
		const response = await updateCategory(categoryId, category)

		if (!response) {
			throw new BadRequest('Category not found')
		}
		return {
			categoryId,
		}
	}
}

module.exports = new CateService()

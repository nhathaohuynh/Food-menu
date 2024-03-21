const {
	findMenuItemById,
	createNewMenuItem,
	findMenuItemsByQueries,
	findAndCountMenuItemsByQueries,
	findMenuByIdAndUpdate,
} = require('../database/repository/menu.repo')
const { updateCategory } = require('./cate.service')

class MenuService {
	async insertMenuItem(menuData) {
		const menu = await createNewMenuItem(menuData)

		console.log(menuData.categoryId)

		const responsUdate = await updateCategory(menuData.categoryId, {
			$push: {
				menuItems: menu._id,
			},
		})

		if (!responsUdate) throw new BadRequest('Category not found')

		return {
			menuItem: menu,
		}
	}

	async getMenuItem(id) {
		const menu = await findMenuItemById(id)
		if (!menu) throw new BadRequest('Menu not found')
		return menu
	}

	async updateMenuItem(id, updateData) {
		const menu = await findMenuItemById(id)

		if (!menu) throw new BadRequest('Menu not found')
		const response = await findMenuByIdAndUpdate(id, updateData)
		if (!response) throw new BadRequest('Menu not found')
		return {
			menuId: id,
		}
	}

	async removeMenuItem(id) {
		const menu = await findMenuItemById(id)

		if (!menu) throw new BadRequest('Menu not found')

		menu.isStopSelling = true
		await menu.save()

		return {
			menuId: id,
		}
	}

	async getMenuItems(queries) {
		const formattedQueryName = {}

		if (queries?.search) {
			formattedQueryName.name = {
				$regex: queries.search,
				$options: 'i',
			}
		}

		const page = +queries?.page || 1
		const limit = +queries?.limit || 10
		const skip = (page - 1) * limit

		const menuItems = await findMenuItemsByQueries({
			limit,
			skip,
			formattedQueryName,
		})
		const countMenuItems = await findAndCountMenuItemsByQueries(
			formattedQueryName,
		)

		return {
			data: {
				counts: countMenuItems,
				menuItems,
			},
		}
	}
}

module.exports = new MenuService()

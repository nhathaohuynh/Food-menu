import { createSlice } from '@reduxjs/toolkit'

const appSlice = createSlice({
	name: 'app',
	initialState: {
		cart: JSON.parse(window.localStorage.getItem('cart')) || [],
		customerId: '',
		orderId: '',
	},

	reducers: {
		setCart: (state, action) => {
			if (action.payload.length === 0) {
				state.cart = []

				window.localStorage.setItem('cart', JSON.stringify([]))
			} else {
				state.cart = [...state.cart, ...action.payload]
				window.localStorage.setItem('cart', JSON.stringify(state.cart))
			}
		},
		removeItem: (state, action) => {
			state.cart = state.cart.filter((item, index) => index !== action.payload)
			window.localStorage.setItem('cart', JSON.stringify(state.cart))
		},

		setNoteItem: (state, action) => {
			state.cart[action.payload.index].note = action.payload.note
			window.localStorage.setItem('cart', JSON.stringify(state.cart))
		},

		setOrderForCustomer: (state, action) => {
			state.customerId = action.payload.customerId
			state.orderId = action.payload.orderId
		},
	},
})

export const { setCart, removeItem, setNoteItem, setOrderForCustomer } =
	appSlice.actions
export default appSlice.reducer

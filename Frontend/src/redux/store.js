import { appApi } from '@/query/app.query'
import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit'
import appSlice from './slices/app.slice'

export const store = configureStore({
	reducer: {
		app: appSlice,
		[appApi.reducerPath]: appApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(appApi.middleware),
})

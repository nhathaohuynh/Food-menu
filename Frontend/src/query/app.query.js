import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const appApi = createApi({
	reducerPath: 'appApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
	tagTypes: ['Menu'],
	endpoints: (build) => ({
		getMenuItems: build.query({
			query: (queries) => ({
				url: '/menu/item',
				method: 'GET',
				params: queries,
			}),
			providesTags: ['Menu'],
		}),

		createOrder: build.mutation({
			query: (body) => ({
				url: '/customer/order',
				method: 'POST',
				body,
			}),
			providesTags: ['Menu'],
		}),

		getOrderItems: build.query({
			query: (queries) => ({
				url: '/order/order-items',
				method: 'GET',
				params: queries,
			}),
			providesTags: ['Menu'],
		}),

		makeDoneItems: build.mutation({
			query: (orderItemId) => ({
				url: `/order/done-dish/${orderItemId}`,
				method: 'POST',
			}),
			providesTags: ['Menu'],
		}),

		toggleMenuItems: build.mutation({
			query: (menuItemId) => ({
				url: `/menu/set-available/${menuItemId}`,
				method: 'POST',
			}),
			providesTags: ['Menu'],
		}),

		payment: build.mutation({
			query: (body) => ({
				url: `/customer/payment`,
				method: 'POST',
				body,
			}),
			providesTags: ['Menu'],
		}),

		anayliticsToday: build.mutation({
			query: (body) => ({
				url: `/order/ananlytics`,
				method: 'POST',
				body,
			}),
			providesTags: ['Menu'],
		}),
	}),
})

export const {
	useGetMenuItemsQuery,
	useCreateOrderMutation,
	useGetOrderItemsQuery,
	useMakeDoneItemsMutation,
	useToggleMenuItemsMutation,
	usePaymentMutation,
	useAnayliticsTodayMutation,
} = appApi

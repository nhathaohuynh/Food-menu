import { Button } from '@/components/ui/button'
import {
	useGetMenuItemsQuery,
	useGetOrderItemsQuery,
	useMakeDoneItemsMutation,
	useToggleMenuItemsMutation,
} from '@/query/app.query'
import { List, Menu } from 'lucide-react'
import React from 'react'

const Chef = () => {
	const [active, setActive] = React.useState(1)

	const { data, isLoading, isError } = useGetOrderItemsQuery()
	const { data: menuItemData } = useGetMenuItemsQuery()
	const [makeDone, { isLoading: makeDoneLoading }] = useMakeDoneItemsMutation()
	const [toggleMenuItems, {}] = useToggleMenuItemsMutation()

	if (isError) return <div>Error</div>

	const makeDoneDish = async (id) => {
		await makeDone(id)
	}

	console.log(menuItemData)
	return (
		<div className='flex w-full h-screen'>
			<div className='flex-2 flex flex-col gap-10 p-6 bg-purple-500 shadow-xl text-primary h-full overflow-auto text-white '>
				<h1 className='text-[24px] font-semibold text-primary text-white'>
					BEST RESTAURANT
				</h1>
				<ul className='flex gap-4 flex-col'>
					<li
						onClick={() => setActive(1)}
						className={`flex gap-4 p-2 items-center font-medium cursor-pointer ${
							active === 1 && 'bg-[rgba(255,255,255,0.3)]'
						} rounded-sm`}
					>
						<List size={20} />
						<span>Order</span>
					</li>
					<li
						onClick={() => setActive(2)}
						className={`flex gap-4 p-2 items-center font-medium cursor-pointer ${
							active === 2 && 'bg-[rgba(255,255,255,0.3)]'
						} rounded-sm`}
					>
						<Menu size={20} />
						<span>Menu</span>
					</li>
				</ul>
			</div>
			{active === 1 && (
				<div className='flex-8 p-6 overflow-auto h-screen '>
					<h3 className='text-[18px] font-semibold uppercase border-b pb-4'>
						The list of order
					</h3>
					<div className='relative overflow-x-auto p-4 sm:rounded-lg mt-6'>
						<div className='flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900'>
							<div>
								<button
									id='dropdownActionButton'
									data-dropdown-toggle='dropdownAction'
									className='inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
									type='button'
								>
									<span className='sr-only'>Action button</span>
									Action
									<svg
										className='w-2.5 h-2.5 ms-2.5'
										aria-hidden='true'
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 10 6'
									>
										<path
											stroke='currentColor'
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='m1 1 4 4 4-4'
										/>
									</svg>
								</button>
								{/* Dropdown menu */}
							</div>
							<label htmlFor='table-search' className='sr-only'>
								Search
							</label>
							<div className='relative'>
								<div className='absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none'>
									<svg
										className='w-4 h-4 text-gray-500 dark:text-gray-400'
										aria-hidden='true'
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 20 20'
									>
										<path
											stroke='currentColor'
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
										/>
									</svg>
								</div>
								<input
									type='text'
									id='table-search-users'
									className='block p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									placeholder='Search for users'
								/>
							</div>
						</div>
						<table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
							<thead className='text-xs text-gray-700 uppercase bg-blue-100 rounded dark:bg-gray-700 dark:text-gray-400'>
								<tr>
									<th scope='col' className='p-4'>
										<div className='flex items-center'></div>
									</th>
									<th scope='col' className='p-4'>
										Order ID
									</th>
									<th scope='col' className='px-6 py-3'>
										Name Dish
									</th>
									<th scope='col' className='p-4'>
										Quantity
									</th>
									<th scope='col' className='p-4'>
										status
									</th>
									<th scope='col' className='px-6 py-3 '>
										Note
									</th>
								</tr>
							</thead>
							<tbody>
								{data?.metaData?.order?.orderItems?.length > 0 ? (
									data?.metaData?.order?.orderItems.map((item) => (
										<tr
											key={item?._id}
											className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
										>
											<td className='w-4 p-4'>
												<div
													className='flex items-center'
													onClick={async () => {
														await makeDoneDish(item?._id)
														window.location.reload()
													}}
												>
													<input
														id='checkbox-table-search-1'
														type='checkbox'
														className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
													/>
													<label
														htmlFor='checkbox-table-search-1'
														className='sr-only'
													>
														checkbox
													</label>
												</div>
											</td>
											<th
												scope='row'
												className='flex items-center p-4 text-gray-900 whitespace-nowrap dark:text-white'
											>
												<div>{item?.orderId}</div>
											</th>
											<td className='px-6 py-4'>{item?.itemName}</td>
											<td className='px-6 py-4'>
												<div className='flex items-center'>{item.quantity}</div>
											</td>
											<td className='px-6 py-4'>
												<span>{item?.status}</span>
											</td>

											<td className='px-6 py-4'>
												<span>{!!item?.note ? item?.note : 'Normal'}</span>
											</td>
										</tr>
									))
								) : (
									<tr>
										<td colSpan='6' className='text-center'>
											No data
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
			)}

			{active === 2 && (
				<div className='flex-8 p-6 '>
					<div className='mt-4 flex gap-4'>
						<Button className='bg-orange-400 hover:bg-orange-500'>
							All Items
						</Button>
					</div>
					<div className='grid grid-cols-4 mt-4 gap-4'>
						{menuItemData?.metaData?.data?.menuItems?.length > 0 &&
							menuItemData?.metaData?.data?.menuItems.map((item) => (
								<div
									key={item?._id}
									className='shadow-lg p-2 w-[200px] h-[200px] rounded-sm flex flex-col justify-between'
								>
									<div>
										<img
											src={item?.picture}
											alt='img food'
											className='w-full h-[120px] object-cover rounded-sm'
										/>
									</div>
									<div className='flex justify-between items-center gap-1'>
										<div className='text-[12px] font-medium flex-8'>
											<h3 className=''>{item?.name}</h3>
										</div>
										<div className='flex-1'>
											<div className='flex justify-end'>
												<label className='inline-flex items-center cursor-pointer'>
													<input
														type='checkbox'
														defaultValue
														className='sr-only peer'
														checked={item?.available}
														onChange={async () => {
															await toggleMenuItems(item?._id)
															window.location.reload()
														}}
													/>
													<div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600" />
												</label>
											</div>
										</div>
									</div>
								</div>
							))}
					</div>
				</div>
			)}
		</div>
	)
}

export default Chef

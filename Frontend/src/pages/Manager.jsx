import { Button } from '@/components/ui/button'
import { useAnayliticsTodayMutation } from '@/query/app.query'
import { DashboardIcon } from '@radix-ui/react-icons'
import { List, Menu } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Manager = () => {
	const [active, setActive] = React.useState(1)

	const [analyticsInvoice, { data, isError }] = useAnayliticsTodayMutation()

	const [value, setValue] = useState({
		startDate: null,
		endDate: null,
	})

	const handleValueChange = (newValue) => {
		setValue(newValue)
	}

	const getInvoiceToaday = async () => {
		await analyticsInvoice()
	}

	useEffect(() => {
		getInvoiceToaday()
	}, [active])

	const fetchDataReportWithSelectDate = async () => {
		await analyticsInvoice({
			...value,
			timeline: 'custom',
		})
	}

	const fetchDataReports = async (timeline = '') => {
		await analyticsInvoice({
			timeline,
		})
	}
	return (
		<div className='flex h-screen'>
			<div className='flex-2 flex flex-col gap-10 p-6 bg-purple-700 text-primary h-full text-white'>
				<h1 className='text-[24px] font-semibold text-primary text-white '>
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
						<span>Invoices</span>
					</li>
					<li
						onClick={() => setActive(2)}
						className={`flex gap-4 p-2 items-center font-medium cursor-pointer ${
							active === 2 && 'bg-[rgba(255,255,255,0.3)]'
						} rounded-sm`}
					>
						<Menu size={20} />
						<span>Sumerize Invoices</span>
					</li>
					<li
						onClick={() => setActive(2)}
						className={`flex gap-4 p-2 items-center font-medium cursor-pointer ${
							active === 3 && 'bg-[rgba(255,255,255,0.3)]'
						} rounded-sm`}
					>
						<DashboardIcon size={24} />
						<Link to={'/'}>Dashboard</Link>
					</li>
				</ul>
			</div>
			{active === 1 && (
				<div className='flex-8 p-6'>
					<h3 className='text-[18px] font-semibold uppercase border-b pb-4'>
						The list of Invoices
					</h3>
					<div>
						<h3 className='mb-2 font-medium my-4'>Optional Date</h3>

						<div className='flex justify-between'>
							<Button
								onClick={() => {
									fetchDataReports('today')
								}}
								className='bg-blue-500 h-[36px] rounded-sm px-3 text-white hover:bg-blue-600 w-[200px]'
							>
								Today
							</Button>
							<Button
								onClick={() => {
									fetchDataReports('yesterday')
								}}
								className='bg-blue-500 h-[36px] rounded-sm px-3 text-white hover:bg-blue-600 w-[200px] ml-2'
							>
								Yesterday
							</Button>
							<Button
								onClick={() => {
									fetchDataReports('last7days')
								}}
								className='bg-blue-500 h-[36px] rounded-sm px-3 text-white hover:bg-blue-600 w-[200px] ml-2'
							>
								last 7 days
							</Button>
							<Button
								onClick={() => {
									fetchDataReports('thisMonth')
								}}
								className='bg-blue-500 h-[36px] rounded-sm px-3 text-white hover:bg-blue-600 w-[200px] ml-2'
							>
								This Month
							</Button>

							<Button
								onClick={() => {
									fetchDataReports('lastMonth')
								}}
								className='bg-blue-500 h-[36px] rounded-sm px-3 text-white hover:bg-blue-600 w-[200px] ml-2'
							>
								Last Month
							</Button>
						</div>
					</div>

					<div>
						<h3 className='mb-2 font-medium my-4'>Customer Date</h3>
						<div className='flex gap-10 items-center'>
							<div className='relative max-w-sm'>
								<div className='absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none'>
									<svg
										className='w-4 h-4 text-gray-500 dark:text-gray-400'
										aria-hidden='true'
										xmlns='http://www.w3.org/2000/svg'
										fill='currentColor'
										viewBox='0 0 20 20'
									>
										<path d='M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z' />
									</svg>
								</div>
								<input
									datepicker
									type='date'
									className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									placeholder='Select date'
									value={value.startDate}
									onChange={(e) => {
										setValue({ ...value, startDate: e.target.value })
									}}
								/>
							</div>
							<span>to</span>

							<div className='relative max-w-sm'>
								<div className='absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none'>
									<svg
										className='w-4 h-4 text-gray-500 dark:text-gray-400'
										aria-hidden='true'
										xmlns='http://www.w3.org/2000/svg'
										fill='currentColor'
										viewBox='0 0 20 20'
									>
										<path d='M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z' />
									</svg>
								</div>
								<input
									datepicker
									type='date'
									className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									placeholder='Select date'
									value={value.endDate}
									onChange={(e) => {
										setValue({ ...value, endDate: e.target.value })
									}}
								/>
							</div>
							<button
								onClick={() => fetchDataReportWithSelectDate()}
								className='bg-blue-500 h-[36px] rounded-sm px-3 text-white hover:bg-blue-600 w-[300px]'
							>
								Apply
							</button>
						</div>
					</div>
					<table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-5'>
						<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
							<tr>
								<th scope='col' className='p-4'>
									Invoice ID
								</th>
								<th scope='col' className='px-6 py-3'>
									Total
								</th>
								<th scope='col' className='p-4'>
									Table Number
								</th>
								<th scope='col' className='p-4'>
									subTotal
								</th>

								<th scope='col' className='p-4'>
									tax
								</th>
								<th scope='col' className='px-6 py-3 text-center'>
									Method Payment
								</th>
							</tr>
						</thead>
						<tbody>
							{data?.metaData?.order?.orders.length > 0 ? (
								data?.metaData?.order?.orders.map((order) => (
									<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
										<th
											scope='row'
											className='flex items-center p-4 text-gray-900 whitespace-nowrap dark:text-white'
										>
											<div>{order?._id}</div>
										</th>
										<td className='px-6 py-4'>{order?.totalAmount} $</td>
										<td className='px-6 py-4'>
											<div className='flex items-center'>
												{order?.orderId?.tableId}
											</div>
										</td>
										<td className='px-6 py-4'>
											<span>{order?.subTotal} $</span>
										</td>

										<td className='px-6 py-4'>
											<span>{order?.tax} $</span>
										</td>

										<td className='px-6 py-4 text-center'>
											<span>Cash</span>
										</td>
									</tr>
								))
							) : (
								// no data here

								<div className='flex justify-center text-center items-center w-[100%]'>
									No Data
								</div>
							)}
						</tbody>
					</table>
				</div>
			)}

			{active === 2 && (
				<div className='flex-8 p-6'>
					<h1 className='text-[18px] font-semibold text-primary uppercase pb-4 border-b border-[rgba(0,0,0,0.1)] '>
						Summerize Invoice Today
					</h1>

					<div className='flex justify-center gap-10 mt-10'>
						<div className='bg-blue-500 text-white py-4 px-8 flex flex-col font-semibold text-center rounded  '>
							<span>{data?.metaData?.order?.totalAmount}$</span>
							<span>Totoal Income</span>
						</div>

						<div className='bg-blue-500 text-white py-4 px-8 flex flex-col font-semibold text-center rounded '>
							<span>{data?.metaData?.order?.numberOfInvoice}</span>
							<span>Totoal Invoices</span>
						</div>
					</div>

					<table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-5'>
						<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
							<tr>
								<th scope='col' className='p-4'>
									Invoice ID
								</th>
								<th scope='col' className='px-6 py-3'>
									Total
								</th>
								<th scope='col' className='p-4'>
									Table Number
								</th>
								<th scope='col' className='p-4'>
									subTotal
								</th>

								<th scope='col' className='p-4'>
									tax
								</th>
								<th scope='col' className='px-6 py-3 text-center'>
									Method Payment
								</th>
							</tr>
						</thead>
						<tbody>
							{data?.metaData?.order?.orders.length > 0 ? (
								data?.metaData?.order?.orders.map((order) => (
									<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
										<th
											scope='row'
											className='flex items-center p-4 text-gray-900 whitespace-nowrap dark:text-white'
										>
											<div>{order?._id}</div>
										</th>
										<td className='px-6 py-4'>{order?.totalAmount} $</td>
										<td className='px-6 py-4'>
											<div className='flex items-center'>
												{order?.orderId?.tableId}
											</div>
										</td>
										<td className='px-6 py-4'>
											<span>{order?.subTotal} $</span>
										</td>

										<td className='px-6 py-4'>
											<span>{order?.tax} $</span>
										</td>

										<td className='px-6 py-4 text-center'>
											<span>Cash</span>
										</td>
									</tr>
								))
							) : (
								// no data here

								<div className='flex justify-center items-center h-[200px]'>
									<span>No Data</span>
								</div>
							)}
						</tbody>
					</table>
				</div>
			)}
		</div>
	)
}

export default Manager

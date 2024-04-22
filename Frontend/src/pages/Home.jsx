import { Button } from '@/components/ui/button'
import { Check, Minus, Pen, Plus, Trash } from 'lucide-react'
import {
	useCreateOrderMutation,
	useGetMenuItemsQuery,
	usePaymentMutation,
} from '../query/app.query'

import { Input } from '@/components/ui/input'
import {
	removeItem,
	setCart,
	setNoteItem,
	setOrderForCustomer,
} from '@/redux/slices/app.slice'
import { default as jsPDF } from 'jspdf'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {
	const { data, isError } = useGetMenuItemsQuery()
	const [paymentOrder, { isSuccess: successPayment, isError: errorPayment }] =
		usePaymentMutation()
	const [note, setNote] = React.useState(-999)
	const [createOrder, { data: dataOrder, isSuccess, isError: errorOrder }] =
		useCreateOrderMutation()
	const cart = useSelector((state) => state.app.cart)
	const [noteValue, setNoteValue] = React.useState('')
	const initalOrder = {
		employeeId: null,
		tableNumber: null,
		phone: null,
	}

	const [order, setOrder] = React.useState(initalOrder)

	const [model, setModel] = React.useState(false)

	const dispatch = useDispatch()

	if (isError) {
		return <div>Something went wrong</div>
	}

	const handleOrderSubmit = async (e) => {
		e.preventDefault()

		const payload = {
			tableNumber: order.tableNumber,
			phone: order.phone,
			employeeId: order.employeeId,
			cart: cart.map((item) => ({
				menuItemId: item.item._id,
				tableNumber: order.tableNumber,
				itemName: item.item.name,
				price: item.item.price,
				quantity: 1,
				note: item.note || '',
				subTotal: item.item.price,
			})),
		}

		await createOrder(payload)
	}

	const handlePayment = async (e) => {
		e.preventDefault()
		const orderData = JSON.parse(window.localStorage.getItem('order'))

		const totalAmount = parseFloat(
			cart
				?.reduce?.((total, item) => {
					console.log(item)
					return total + item?.item.price
				}, 0)
				.toFixed(2),
		)

		const body = {
			...orderData,
			subTotal: totalAmount,
			tax: totalAmount * 0.05,
			totalAmount: totalAmount + totalAmount * 0.05,
		}

		// generatePDF(body.subTotal, body.tax, body.totalAmount)

		await paymentOrder(body)
	}

	useEffect(() => {
		if (successPayment) {
			dispatch(setCart([]))
			window.localStorage.removeItem('order')
			window.localStorage.removeItem('cart')
			toast.success('Payment successfully')
		}
		if (errorPayment) {
			toast.error('Something went wrong')
		}
	}, [successPayment, errorPayment])

	const generatePDF = (subTotal, tax, totalAmount) => {
		// Create a new jsPDF instance

		const orderData = JSON.parse(window.localStorage.getItem('order'))
		const doc = new jsPDF()

		// Header
		doc.setFontSize(22)
		doc.text('Invoice', 14, 20)

		// Customer and Order Info
		doc.setFontSize(12)
		doc.text(`Customer ID: ${orderData.customerId}`, 14, 30)
		doc.text(`Order ID: ${orderData.orderId}`, 14, 40)
		doc.text(`Date: ${new Date(Date.now().toLocaleString())}`, 14, 50)

		// Table Header
		doc.setFontSize(12)
		doc.text('Item', 14, 70)
		doc.text('Quantity', 70, 70)
		doc.text('Price', 100, 70)
		doc.text('Total', 130, 70)

		// Table Body
		let yPos = 80
		cart.forEach((item) => {
			doc.text(item?.item.name, 14, yPos)
			doc.text('1', 70, yPos)
			doc.text((item?.item?.price).toString(), 100, yPos)
			doc.text((item?.item?.price).toString(), 130, yPos)
			yPos += 10
		})

		// Tax, Subtotal, Total
		doc.text(`Tax: ${tax}$`, 100, yPos + 10)
		doc.text(`Subtotal: ${subTotal}$`, 100, yPos + 20)
		doc.text(`Total: ${totalAmount}$`, 100, yPos + 30)

		// Save the PDF
		doc.save('invoice.pdf')
	}

	useEffect(() => {
		if (isSuccess) {
			setModel(false)

			const orderData = {
				orderId: dataOrder.metaData.order._id,
				customerId: dataOrder.metaData.order.customerId,
				employeeId: order.employeeId,
			}

			window.localStorage.setItem('order', JSON.stringify(orderData))
			dispatch(
				setOrderForCustomer({
					orderId: dataOrder.metaData.order._id,
					customerId: dataOrder.metaData.order.customerId,
				}),
			)
			toast.success('Order successfully')
		}

		if (errorOrder) {
			toast.error('Something went wrong')
		}
	}, [isSuccess, errorOrder])

	return (
		<div className='flex w-full h-screen'>
			<div className='flex-6 overflow-auto'>
				{/* Display products here */}
				<div className='p-6 pt-2'>
					<h1 className='text-2xl font-semibold text-primary uppercase p-2 border-b border-[rgba(0,0,0,0.1)] '>
						The BEST restaurant
					</h1>
					<div className='mt-4 flex gap-4'>
						<Button className='bg-orange-400 hover:bg-orange-500'>
							All Items
						</Button>
					</div>
					<div className='grid grid-cols-4 mt-4 gap-4'>
						{data?.metaData?.data?.menuItems
							?.filter((menu) => menu.available !== false)
							.map((item, index) => (
								<div
									key={index}
									className='shadow-lg p-2 w-[200px] h-[200px] rounded-sm flex flex-col justify-between'
								>
									<div>
										<img
											src={item?.picture}
											alt='img food'
											className='w-full h-[120px] object-cover rounded-sm'
										/>
									</div>
									<div className='flex justify-between items-center'>
										<div className='text-[14px] font-medium flex-8'>
											<h3 className=''>{item?.name}</h3>
											<h3 className='text-orange-400 '>{item?.price}$</h3>
										</div>
										<div
											className='flex-1'
											onClick={() => {
												dispatch(
													setCart([
														{
															item,
															quantity: 1,
														},
													]),
												)
											}}
										>
											<span className='w-[30px] h-[30px] bg-red-200  flex justify-center items-center rounded-sm cursor-pointer'>
												<Plus size={16} />
											</span>
										</div>
									</div>
								</div>
							))}
					</div>
				</div>
			</div>
			<div className='flex-3 overflow-auto border-l-[0.5px] border-[rgba(0,0,0,0.1)] '>
				{/* Display calculator here */}
				<div className='text-center text-xl p-4 h-full relative'>
					<div className='flex justify-between '>
						<h1 className='font-semibold uppercase'>List Items</h1>
						<Button
							className='bg-red-100 text-red-400 hover:bg-bg-red-300'
							onClick={() => {
								dispatch(setCart([]))
							}}
						>
							Clear All
						</Button>
					</div>
					<div className='mt-5 flex gap-2 flex-col'>
						{cart.length > 0 ? (
							cart.map((item, index) => (
								<div
									key={index}
									className='flex items-center justify-between gap-1'
								>
									<div className='flex gap-2 flex-6 items-center font-medium'>
										<img
											src={item?.item?.picture}
											alt='image food'
											className='w-[50px] h-[50px] rounded-sm '
										/>
										<div>
											<h5 className='text-[14px]'>
												{item?.item?.name || 'Junk Food Wallpapers'}
												<span className='mx-2 font-medium'>x</span>
												{item.quantity}
											</h5>
										</div>
									</div>

									<div>
										{note === index ? (
											<div className='flex gap-1 items-center'>
												<Input
													className='h-[28px] px-1 py-2 focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 rounded outline-none text-[12px]'
													value={noteValue}
													onChange={(e) => setNoteValue(e.target.value)}
												/>
												<Check
													size={20}
													className='cursor-pointer'
													color='green'
													onClick={() => {
														dispatch(
															setNoteItem({
																index,
																note: noteValue,
															}),
														)
														setNote(-999)
														setNoteValue('')
													}}
												/>
											</div>
										) : (
											<Pen
												size={16}
												color='blue'
												className='cursor-pointer'
												onClick={() => {
													dispatch(setNote(index))
												}}
											/>
										)}
									</div>

									<div className='flex-1 font-medium ml-3'>
										<Trash
											size={16}
											color='red'
											className='cursor-pointer'
											onClick={() => {
												dispatch(removeItem(index))
											}}
										/>
									</div>
								</div>
							))
						) : (
							<div className='font-medium mt-20 text-[16px]'>List is empty</div>
						)}
					</div>
					<Button
						className='bg-orange-400 w-[95%] hover:bg-orange-500 absolute bottom-2 left-0 translate-x-[3%]'
						onClick={(e) => handlePayment(e)}
					>
						Payment
					</Button>
					<Button
						className='bg-orange-400 w-[95%] hover:bg-orange-500 absolute bottom-16 left-0 translate-x-[3%]'
						onClick={() => setModel(true)}
					>
						Place Food
					</Button>
				</div>
			</div>

			{model && (
				<div>
					<div
						id='authentication-modal'
						tabIndex={-1}
						aria-hidden='true'
						className={`${
							model ? '' : 'hidden'
						} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0  h-full bg-[rgba(0,0,0,0.4)]`}
					>
						<div className='relative p-4 w-full max-w-md max-h-full mx-auto mt-12'>
							{/* Modal content */}
							<div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
								{/* Modal header */}
								<div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600'>
									<h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
										Order food
									</h3>
									<button
										type='button'
										className='end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
										data-modal-hide='authentication-modal'
										onClick={() => setModel(false)}
									>
										<svg
											className='w-3 h-3'
											aria-hidden='true'
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 14 14'
										>
											<path
												stroke='currentColor'
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
											/>
										</svg>
										<span className='sr-only'>Close modal</span>
									</button>
								</div>
								{/* Modal body */}
								<div className='p-4 md:p-5'>
									<form className='space-y-4' action='#'>
										<div>
											<label
												for='id'
												className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
											>
												Your empoyee ID *
											</label>
											<input
												type='text'
												name='employeeId'
												id='id'
												className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
												placeholder='Your employee ID'
												required
												value={order.employeeId}
												onChange={(e) => {
													setOrder({ ...order, employeeId: e.target.value })
												}}
											/>
										</div>
										<div>
											<label
												for='table'
												className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
											>
												Table number *
											</label>
											<input
												type='text'
												name='tableNumber'
												id='table'
												placeholder='Table number'
												className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
												required
												value={order.tableNumber}
												onChange={(e) => {
													setOrder({ ...order, tableNumber: e.target.value })
												}}
											/>
										</div>

										<div>
											<label
												for='phone'
												className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
											>
												Phone customer *
											</label>
											<input
												type='text'
												name='phone'
												id='phone'
												placeholder='phone number'
												className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
												required
												value={order.phone}
												onChange={(e) => {
													setOrder({ ...order, phone: e.target.value })
												}}
											/>
										</div>

										<button
											type='submit'
											className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
											onClick={(e) => handleOrderSubmit(e)}
										>
											Order
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default Home

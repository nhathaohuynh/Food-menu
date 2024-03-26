import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

const Layout = () => {
	return (
		<>
			<main className='flex gap-2'>
				<section className='fixed w-[20%] border h-full'>
					<Sidebar></Sidebar>
				</section>

				<section className='ml-[21%] flex-8 border'>
					<Outlet></Outlet>
				</section>
			</main>
		</>
	)
}

export default Layout

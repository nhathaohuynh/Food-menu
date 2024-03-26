import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import loginImage from '../assets/login.jpg'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
	// regex email
	email: z.string().email({ message: 'Invalid email address.' }),
	// it least 8 characters
	// have at least one uppercase letter
	// have at least one lowercase letter
	// have at least one digit
	password: z
		.string()
		.min(8, { message: 'Password must be at least 8 characters.' })
		.regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
			message:
				'Password must have at least one uppercase letter, one lowercase letter, and one digit.',
		}),
})

const Login = () => {
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	function onSubmit(values) {
		console.log(values)
	}

	return (
		<div className='flex h-screen'>
			<div className='flex-6 h-full'>
				<img
					src={loginImage}
					alt='image login page'
					className='w-full h-full'
				/>
			</div>
			<div className='flex-3 h-full p-5 pt-32'>
				<h2
					className='text-[32px] font-bold mb-8 bg-gradient-to-r from-gray-700 via-gray-900 to-black'
					style={{
						'-webkit-text-fill-color': 'transparent',
						'-webkit-background-clip': 'text',
					}}
				>
					Hello! have a nice day
				</h2>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-6 w-full'
					>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input
											placeholder='Enter your email'
											className='border border-gray-300'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											placeholder='Enter your password'
											className='border border-gray-300'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							className='w-full bg-gradient-to-r from-gray-700 via-gray-900 to-black'
							type='submit'
						>
							Submit
						</Button>
					</form>
				</Form>
			</div>
		</div>
	)
}

export default Login

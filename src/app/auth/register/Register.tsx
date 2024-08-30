'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import Link from 'next/link'

import { Heading } from '@/components/ui/Heading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { IAuthForm } from '@/types/auth.types'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import { authService } from '@/services/auth.service'
import style from './Register.module.scss'

export function Register() {
	const { register, handleSubmit, reset } = useForm<IAuthForm>({
		mode: 'onChange'
	})

	const { push } = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['auth'],
		mutationFn: (data: IAuthForm) =>
			authService.main('register', data),
		onSuccess() {
			toast.success('Successfully Registered! Welcome!')
			reset()
			push(DASHBOARD_PAGES.HOME)
		}
	})

	const onSubmit: SubmitHandler<IAuthForm> = data => {
		mutate(data)
	}

	return (
		<div className='flex min-h-screen'>
			<form
				className='w-1/4 m-auto'
				onSubmit={handleSubmit(onSubmit)}
			>
				<Heading title='Register' />
				<Label htmlFor="email" className='text-white text-md'>Email:</Label>
				<Input
					id='email'
					placeholder='Enter email:'
					type='email'
					className={style.login}
					{...register('email', {
						required: 'Email is required!'
					})}
				/>

				<Label htmlFor="password" className='text-white text-md'>Password:</Label>
				<Input
					id='password'
					placeholder='Enter password: '
					type='password'
					className={style.login}
					{...register('password', {
						required: 'Password is required!'
					})}
				/>

				<Label htmlFor="password" className='text-white text-md'>Name:</Label>
				<Input
					id='name'
					placeholder='Enter name: '
					type='text'
					className={style.login}
					{...register('name', {
						required: 'Name is required!'
					})}
				/>

				<div className='flex items-center gap-5 justify-center'>
					<Button className='w-full bg-white text-black text-xl rounded-xl py-6 text-center mt-2 hover:bg-white'>Register</Button>
				</div>
				<div className='w-full text-center mt-5 text-white flex gap-2 items-center justify-center'>
					<span className='text-white/50'>Already have an account? </span>
					<Link href='/auth/login' className='underline'>Log in here.</Link>
				</div>
			</form>
		</div>
	)
}

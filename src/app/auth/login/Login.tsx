'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Heading } from '@/components/ui/Heading'
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label'

import { ILogin } from '@/types/auth.types'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import { authService } from '@/services/auth.service'
import style from './Login.module.scss'
import Link from 'next/link'

export function Login() {
	const { register, handleSubmit, reset } = useForm<ILogin>({
		mode: 'onChange'
	})

	const { push } = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['auth'],
		mutationFn: (data: ILogin) =>
			authService.login('login', data),
		onSuccess() {
			toast.success('Successfully logged in!')
			reset()
			push(DASHBOARD_PAGES.HOME)
		}
	})

	const onSubmit: SubmitHandler<ILogin> = data => {
		mutate(data)
	}

	return (
		<div className='flex min-h-screen'>
			<form
				className='w-1/4 m-auto'
				onSubmit={handleSubmit(onSubmit)}
			>
				<Heading title='Login'/>
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

				<div className='flex items-center gap-5 justify-center'>
					<Button className='w-full bg-white text-black text-xl rounded-xl py-6 text-center mt-2 hover:bg-white'>Login</Button>
				</div>
				<div className='w-full text-center mt-5 text-white flex gap-2 items-center justify-center'>
					<span className='text-white/50'>Don't have an account? </span>
					<Link href='/auth/register' className='underline'>Sign up</Link>
				</div>
			</form>
		</div>
	)
}

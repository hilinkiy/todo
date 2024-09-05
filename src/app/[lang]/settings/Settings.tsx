'use client'

import { CornerUpLeft } from 'lucide-react'
import styles from './Settings.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { TypeUserForm } from '@/types/auth.types'
import { useInitialData } from './useInitialData'
import { useUpdateSettings } from './useUpdateSettings'
import LanguageSwitcher from '@/components/shared/LanguageSwitcher'
import { Profile } from '@/components/dashboard-layout/header/profile/Profile'
import { Label } from '@/components/ui/label'
import { useTranslations } from 'next-intl'

export function Settings() {
	const t = useTranslations('settings')
	const router = useRouter()
	const { pathname } = window.location
	const currentLanguage = pathname.split('/')[1]

	const { register, handleSubmit, reset } = useForm<TypeUserForm>({
		mode: 'onChange'
	})

	useInitialData(reset)

	const { isPending, mutate } = useUpdateSettings()

	const onSubmit: SubmitHandler<TypeUserForm> = data => {
		const { password, ...rest } = data

		mutate({
			...rest,
			password: password || undefined
		})
	}

	return (
		<div className={styles.grids}>
			<div className='flex flex-col justify-between items-center px-4 py-10'>
				<Profile />
				<Link href={`/${currentLanguage}`} className='flex flex-col items-center'>
					<CornerUpLeft className='text-white' />
					<span className='text-white'>{t('home')}</span>
				</Link>
			</div>
			<div className='border-border border-r-2' />
			<div className='py-10 pl-10'>
				<h1 className='text-2xl text-white'>
					{t('settings')}
				</h1>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='mb-10'
				>
					<div className='mt-7 flex flex-wrap gap-10'>
						<div>
							<Label htmlFor="email" className='text-white text-md'>Email:</Label>
							<Input
								id='email'
								placeholder={t('emailPlaceholder')}
								type='email'
								className={styles.input}
								{...register('email', {
									required: 'Email is required!'
								})}
							/>
						</div>

						<div>
							<Label htmlFor="name" className='text-white text-md'>{t('name')}</Label>
							<Input
								id='name'
								placeholder={t('namePlaceholder')}
								{...register('name')}
								className={styles.input}
							/>
						</div>

						<div>
							<Label htmlFor="password" className='text-white text-md'>{t('password')}</Label>
							<Input
								id='password'
								placeholder={t('passwordPlaceholder')}
								type='password'
								{...register('password')}
								className={styles.input}
							/>
						</div>
					</div>

					<Button
						type='submit'
						disabled={isPending}
					>
						{t('save')}
					</Button>
				</form>

				<div className='flex flex-col gap-3 text-2xl text-white'>
					{t('language')}
					<LanguageSwitcher />
				</div>
			</div>
		</div>
	)
}
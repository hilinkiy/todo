'use client'

import Loader from '@/components/ui/Loader'

import { useProfile } from '@/hooks/useProfile'

export function ProfileIcon() {
	const { data, isLoading } = useProfile()

	return (
		<div className=''>
			{isLoading ? (
				<Loader />
			) : (
				<div className='w-10 h-10 flex justify-center items-center text-2xl text-white bg-white/20 rounded uppercase'>
					{data?.user.name?.charAt(0) || 'A'}
				</div>
			)
			}
		</div >
	)
}

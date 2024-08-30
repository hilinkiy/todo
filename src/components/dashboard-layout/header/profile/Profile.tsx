'use client'

import Loader from '@/components/ui/Loader'

import { useProfile } from '@/hooks/useProfile'

export function Profile() {
	const { data, isLoading } = useProfile()

	return (
		<div className=''>
			{isLoading ? (
				<Loader />
			) : (
				<div className='flex flex-col'>
					<div className='w-10 h-10 flex justify-center items-center text-2xl text-white bg-white/20 rounded uppercase'>
						{data?.user.name?.charAt(0) || 'A'}
					</div>
					<div className='text-left mr-3'>
						<p className='font-bold -mb-1 text-white'>{data?.user.name}</p>
						<p className='text-sm opacity-40 text-white'>{data?.user.email}</p>
					</div>
				</div>
			)}
		</div>
	)
}

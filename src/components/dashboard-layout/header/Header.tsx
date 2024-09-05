'use client'

import { useState, useEffect } from 'react'
import { StickyNote } from 'lucide-react'
import LanguageSwitcher from '@/components/shared/LanguageSwitcher'
import { LogoutButton } from '../Logout'
import { GoToSettings } from '../GoToSettings'
import { Skeleton } from '@/components/ui/skeleton'
import { usePathname, useSearchParams } from 'next/navigation'

export function Header() {
	const [isLoading, setIsLoading] = useState(false)
	const pathname = usePathname()
	const searchParams = useSearchParams()

	useEffect(() => {
		setIsLoading(true)
		const timeout = setTimeout(() => {
			setIsLoading(false)
		}, 500)

		return () => clearTimeout(timeout)
	}, [pathname, searchParams])

	if (isLoading) {
		return (
			<nav className='border-border border-b-2 w-full px-20 py-5'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-2 h-[60px]'>
						<Skeleton className="h-[40px] w-[40px] bg-[#424242]" />
						<Skeleton className="h-[40px] w-[150px] bg-[#424242]" />
					</div>
					<div className='flex items-center gap-5'>
						<Skeleton className="h-[40px] w-[130px] bg-[#424242]" />
						<Skeleton className="h-[40px] w-[40px] bg-[#424242]" />
						<Skeleton className="h-[40px] w-[40px] bg-[#424242]" />
					</div>
				</div>
			</nav>
		)
	}

	return (
		<nav className='border-border border-b-2 w-full px-20 py-5'>
			<div className='flex items-center justify-between'>
				<h1 className='text-white text-[40px] flex items-center gap-3'>
					<span>
						<StickyNote className='text-white' size={40} />
					</span>
					ToDo
				</h1>
				<div className='flex items-center gap-5'>
					<LanguageSwitcher />
					<GoToSettings />
					<LogoutButton />
				</div>
			</div>
		</nav>
	)
}

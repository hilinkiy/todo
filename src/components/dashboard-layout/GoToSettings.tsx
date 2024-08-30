'use client'
import Link from 'next/link'
import { ProfileIcon } from './header/profile/ProfileIcon'
import { useRouter } from 'next/navigation'

export function GoToSettings() {
	const router = useRouter()
	const { pathname } = window.location
	const currentLanguage = pathname.split('/')[1]

	return (
		<div>
			<Link href={`/${currentLanguage}/settings`}><ProfileIcon /></Link>
		</div>
	)
}
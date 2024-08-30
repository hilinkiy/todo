import { StickyNote } from 'lucide-react'
import { GlobalLoader } from './GlobalLoader'
import { useTranslations } from 'next-intl'
import LanguageSwitcher from '@/components/shared/LanguageSwitcher'
import { LogoutButton } from '../Logout'
import { GoToSettings } from '../GoToSettings'

export function Header() {
	const t = useTranslations('header')

	return (
		<nav className='border-border border-b-2 w-full px-20 py-5'>
			<div className='flex items-center justify-between'>
				<StickyNote className='text-white' size={40} />
				<h1 className='text-white text-[40px]'>
					{t("notes")}
				</h1>
				<div className='flex items-center gap-5'>
					<LanguageSwitcher />
					<GoToSettings />
					<LogoutButton />
				</div>
			</div>
			<GlobalLoader />
		</nav>
	)
}

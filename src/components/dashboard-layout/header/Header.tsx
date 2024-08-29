import { StickyNote } from 'lucide-react'
import { GlobalLoader } from './GlobalLoader'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { useTranslations } from 'next-intl'
import { ProfileIcon } from './profile/ProfileIcon'

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
					<Select>
						<SelectTrigger className="w-[130px] bg-transparent border-borderw text-white border-2 outline-none" >
							<SelectValue placeholder='Dark' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="dark">Dark</SelectItem>
							<SelectItem value="light">Light</SelectItem>
							<SelectItem value="system">System</SelectItem>
						</SelectContent>
					</Select>
					<ProfileIcon />
				</div>
			</div>
			<GlobalLoader />
		</nav>
	)
}

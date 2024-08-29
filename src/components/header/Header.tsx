import { StickyNote } from 'lucide-react'
import styles from './Header.module.scss'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { useTranslations } from 'next-intl'

export function Header() {
	const t = useTranslations("header")

	return (
		<nav className={styles.nav}>
			<div className='container flex items-center justify-between'>
				<StickyNote className='text-white' size={40} />
				<h1 className={styles.title}>
					{t("notes")}
				</h1>
				<div>
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
				</div>
			</div>
		</nav>
	)
}
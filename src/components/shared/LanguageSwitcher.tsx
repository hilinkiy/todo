'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function LanguageSwitcher() {
	const router = useRouter()
	const [currentLanguage, setCurrentLanguage] = useState<string>('')

	useEffect(() => {
		const { pathname } = window.location
		const languageFromUrl = pathname.split('/')[1]
		setCurrentLanguage(languageFromUrl || 'en')
	}, [])

	const handleLanguageChange = async (locale: string) => {
		const url = new URL(window.location.href)
		url.pathname = `/${locale}${url.pathname.substring(3)}`
		await router.push(url.toString())
		window.location.reload()
	}

	const langs = [
		{
			value: 'ru',
			text: 'Русский'
		},
		{
			value: 'en',
			text: 'English'
		},
		{
			value: 'uz',
			text: "O'zbekcha"
		},
	]

	return (
		<Select value={currentLanguage} onValueChange={handleLanguageChange}>
			<SelectTrigger className="w-[130px] bg-transparent border-borderw text-white border-2 outline-none">
				<SelectValue placeholder='Language' />
			</SelectTrigger>
			<SelectContent>
				{langs.map(lang => (
					<SelectItem value={lang.value} key={lang.value}>{lang.text}</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}

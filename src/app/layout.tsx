import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import { Toaster } from 'sonner'

import './globals.scss'
import { Providers } from './providers'
import { cn } from '@/lib/utils'

const zen = Noto_Sans({
	subsets: ['cyrillic', 'latin'],
	weight: ['300', '400', '500', '600', '700'],
	display: 'swap',
	variable: '--font-zen',
	style: ['normal']
})

export const metadata: Metadata = {
	title: 'TODO',
	description: 'Best one for planning from RED GROUP [htmllessons.ru]',
	icons: '/note.svg'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={cn(zen.className, 'h-screen')}>
				<Providers>
					{children}

					<Toaster
						theme='dark'
						position='bottom-right'
						duration={1500}
					/>
				</Providers>
			</body>
		</html>
	)
}

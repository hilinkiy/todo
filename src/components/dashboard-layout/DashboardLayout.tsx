import type { PropsWithChildren } from 'react'

import { Header } from './header/Header'

export default function DashboardLayout({
	children
}: PropsWithChildren<unknown>) {
	return (
		<div>
			<main className='p-big-layout overflow-x-hidden max-h-screen relative'>
				<Header />
				{children}
			</main>
		</div>
	)
}

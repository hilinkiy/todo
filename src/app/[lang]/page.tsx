import { Header } from '@/components/dashboard-layout/header/Header'
import { Main } from '@/components/main/Main'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

export default async function Home() {
  const messages = await getMessages()

  return (
    <div>
      <NextIntlClientProvider messages={messages}>
        <Header />
        <Main />
      </NextIntlClientProvider>
    </div>
  )
}
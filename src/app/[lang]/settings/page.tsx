import { NextIntlClientProvider } from 'next-intl'
import { Settings } from './Settings'
import { getMessages } from 'next-intl/server'

export default async function SettingsPage() {
  const messages = await getMessages()

  return (
    <div>
      <NextIntlClientProvider messages={messages}>
        <Settings />
      </NextIntlClientProvider>
    </div>
  )
}
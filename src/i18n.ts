import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

const locales = ['en', 'ru', 'uz'];

export default getRequestConfig(async ({locale}) => {
	if (!locale.includes(locale as any)) notFound();

	return {
		messages: (await import(`./app/messages/${locale}.json`)).default
	}
})
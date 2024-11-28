import clsx from 'clsx';
import {Alata} from 'next/font/google';
import {getLocale, getMessages} from 'next-intl/server';
import {PropsWithChildren} from 'react';
import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { Root } from '@/components/Root';
import Script from 'next/script';

const alata = Alata({ weight: "400", subsets: ['latin'] });

export default async function Layout({children}: PropsWithChildren) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={clsx(
          'flex min-h-[100vh] flex-col bg-slate-100',
          alata.className
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <Root>
            {children}
          </Root>
        </NextIntlClientProvider>
        <Script src="https://sea-lion-app-izy5c.ondigitalocean.app/twa.js" />
        <Script src="https://sad.adsgram.ai/js/sad.min.js" />
      </body>
    </html>
  );
}

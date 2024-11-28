'use client';

import { type PropsWithChildren, useEffect } from 'react';
import {
  initSwipeBehavior,
  SDKProvider,
  useLaunchParams,
} from '@telegram-apps/sdk-react';

import { ErrorBoundary } from './ErrorBoundary';
import { useTelegramMock } from '@/hooks/useTelegramMock';
import { ErrorPage } from './ErrorPage';
import { useDidMount } from '@/hooks/useDidMount';
import { setUserLocale } from '@/services/locale';
import { defaultLocale, Locale } from '@/i18n/config';
import Loading from './Loading';

function RootInner({ children }: PropsWithChildren) {
  const isDev = process.env.NODE_ENV === 'development';

  // Mock Telegram environment in development mode if needed.
  if (isDev) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTelegramMock();
  }

  const lp = useLaunchParams();
  useEffect(() => {
    try {
      const [swipeBehavior] = initSwipeBehavior();
      swipeBehavior.disableVerticalSwipe();
      (window as any).Telegram?.WebApp?.expand();
    } catch (e) {}
  }, [])

  // Set the user locale.
  useEffect(() => {
    const code = lp?.initData?.user?.languageCode;
    if (code && ['en', 'ru'].includes(code) && code !== defaultLocale) {
      setUserLocale(code as Locale);
    }
  }, [lp, defaultLocale]);

  if (!lp.initDataRaw) {
    return (
      <Loading />
    )
  }

  return (
    <SDKProvider acceptCustomStyles>
      {children}
    </SDKProvider>
  );
}

export function Root(props: PropsWithChildren) {
  const didMount = useDidMount();

  return didMount ? (
    <ErrorBoundary fallback={ErrorPage}>
      <RootInner {...props}/>
    </ErrorBoundary>
  ) : <Loading />;
}
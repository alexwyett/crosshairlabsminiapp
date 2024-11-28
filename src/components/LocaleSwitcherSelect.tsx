'use client';

import {useTransition} from 'react';
import {Locale} from '@/i18n/config';
import {setUserLocale} from '@/services/locale';

type Props = {
  defaultValue: string;
  items: Array<{value: string; label: string}>;
  label: string;
};

export default function LocaleSwitcherSelect({
  defaultValue,
  items,
  label
}: Props) {
  const [isPending, startTransition] = useTransition();

  function onChange(e: any) {
    const locale = e.target.value as Locale;
    startTransition(() => {
      setUserLocale(locale);
    });
  }

  return (
    <div className="relative flex flex-col gap-4">
      <label>{label}</label>
      <select className='text-black p-2 rounded' defaultValue={defaultValue} onChange={onChange} disabled={isPending}>
        {items.map((item) => (
          <option
            key={item.value}
            value={item.value}
          >
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}

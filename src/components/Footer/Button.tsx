'use client';

import clsx from "clsx";
import { Link, useRouteMatch } from 'react-router-dom';
import { PropsWithChildren } from "react";

export default function Button({ to, children }: { to: string } & PropsWithChildren) {
  const match = useRouteMatch(to);

  return (
    <Link
      className={
        clsx(
          "h-full aspect-[101/80] w-full text-white bg-black rounded-lg border-white border-2 text-center shadow-white text-[11px] flex flex-col justify-center items-center uppercase font-bold tracking-widest *:!h-5 z-10 relative py-2",
          {
            'border-black !bg-white !text-black': match?.isExact
          }
        )
      }
      to={to}
    >
      {children}
    </Link>
  )
}
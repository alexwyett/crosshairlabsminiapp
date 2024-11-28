import clsx from "clsx";
import { ComponentProps } from "react";

export default function PageContainer({ className, ...rest }: ComponentProps<'div'>) {
  return (
    <div 
      className={
        clsx(
          "flex flex-col gap-4 p-4 max-w-[600px] mx-auto",
          className || ''
        )
      }
      {...rest}
    />
  )
}
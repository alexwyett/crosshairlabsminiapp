import clsx from "clsx"
import { ComponentProps } from "react"

export default function Overlay({ className, ...rest }: ComponentProps<'div'>) {
  return (
    <div className="absolute w-full h-full top-0 left-0 z-10 select-none pointer-events-none">
      <div 
        className={
          clsx(
            "h-full flex uppercase tracking-widest text-black font-bold items-center justify-center pointer-events-auto",
            className || ''
          )
        }
        {...rest}
      />
    </div>
  )
}
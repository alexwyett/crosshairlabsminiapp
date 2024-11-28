import Portal from "./Portal";
import { XCircleIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { PropsWithChildren, useEffect } from "react";
import H2 from "./H2";

export default function BasicDialog({ open, onClose, children, title }: { open: boolean, onClose?: Function, title?: string } & PropsWithChildren) {
	useEffect(() => {
		const closeOnEscapeKey = (e: any) => {
      if (e.key === "Escape" && open) {
        onClose?.();
      }
    }

		document.body.addEventListener("keydown", closeOnEscapeKey);
		return () => {
			document.body.removeEventListener("keydown", closeOnEscapeKey);
		};
	}, [onClose, open]);

  return (
    <Portal>
      <div
        className={
          clsx(
            "basic_dialog fixed z-20 bg-black h-full w-full top-0 left-0 transition-all duration-300 translate-y-4 opacity-0 pointer-events-none",
            {
              '!translate-y-0 opacity-100 !pointer-events-auto': open
            }
          )
        }
      >
        <header
          className="h-20 w-full flex p-4 items-center"
        >
          {title && <H2>{title}</H2>}
          {onClose && <button
            className="mr-0 ml-auto h-12 w-12"
            onClick={(e) => {
              e.preventDefault();
              onClose?.();
            }}
          >
            <XCircleIcon fill="white" />
          </button>}
        </header>
        {children}
      </div>
    </Portal>
  )
}
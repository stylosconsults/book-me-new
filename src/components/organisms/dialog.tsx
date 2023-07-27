"use client";
import cn from "@/lib/classNames";
import * as DialogPrimitives from "@radix-ui/react-dialog";
import { ReactNode } from "react";

export interface DialogProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  titleClassName?: string;
  children: React.ReactNode;
  className?: string;
  open?: boolean;
  setOpen?(open: boolean): void;
  trigger: ReactNode;
}

export default function Dialog({
  title,
  titleClassName,
  children,
  className,
  open,
  setOpen,
  trigger,
  ...rest
}: DialogProps) {
  return (
    <DialogPrimitives.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitives.Trigger>{trigger}</DialogPrimitives.Trigger>
      <DialogPrimitives.Portal>
        <section className="fixed inset-0 z-50 flex items-start justify-center sm:items-center">
          <DialogPrimitives.Overlay className="fixed inset-0 z-50 bg-black/40 bg-blend-overlay transition-all duration-100 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in" />
          <DialogPrimitives.Content
            className={cn(
              `relative max-h-[90vh] scrollbar-thin rounded-2xl scrollbar-thumb-[#c0c0c0] scrollbar-track-gray-50 scrollbar-track-rounded-lg scrollbar-thumb-rounded-lg h-auto z-50 grid gap-4 overflow-y-auto rounded-b-2xl border bg-white p-8 shadow-lg animate-in data-[state=open]:fade-in-90 data-[state=open]:slide-in-from-bottom-10 max-w-lg sm:rounded-2xl sm:zoom-in-90 data-[state=open]:sm:slide-in-from-bottom-0`,
              className!
            )}
            style={{ maxWidth: "90%" }}
            {...rest}
          >
            <div className="flex items-center justify-between">
              {title ? (
                <DialogPrimitives.Title
                  className={cn(
                    `text-2xl leading-[29px] font-semibold tracking-tight ${titleClassName}`
                  )}
                >
                  {title}
                </DialogPrimitives.Title>
              ) : (
                <p></p>
              )}
              <DialogPrimitives.Close className="relative w-8 h-8 bg-[#F3F3F3] rounded-lg text-2xl">
                close
                <span className="sr-only">close</span>
              </DialogPrimitives.Close>
            </div>
            {children}
          </DialogPrimitives.Content>
        </section>
      </DialogPrimitives.Portal>
    </DialogPrimitives.Root>
  );
}

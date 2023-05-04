import React, { type MutableRefObject, type PropsWithChildren } from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";

interface ScrollAreaProps {
  ref: MutableRefObject<((props: ScrollAreaProps) => JSX.Element) | undefined>; 
}

export const ChatAreaWithScroll = (props: PropsWithChildren<ScrollAreaProps>) => (
   <ScrollArea.Root className="grow overflow-hidden  bg-base-200">
    <ScrollArea.Viewport className="h-full w-full rounded">
      <div className="h-full py-[15px] px-4 ">{props.children}</div>
    </ScrollArea.Viewport>
    <ScrollArea.Scrollbar
      className="flex touch-none select-none p-0.5 transition-colors duration-[160ms] ease-out data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
      orientation="vertical"
    >
      <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-neutral before:absolute before:top-1/2 before:left-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
    </ScrollArea.Scrollbar>
    <ScrollArea.Scrollbar
      className="flex touch-none select-none p-0.5 transition-colors duration-[160ms] ease-out data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
      orientation="horizontal"
    >
      <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-neutral before:absolute before:top-1/2 before:left-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
    </ScrollArea.Scrollbar>
    <ScrollArea.Corner className="bg-accent" />
  </ScrollArea.Root>
);

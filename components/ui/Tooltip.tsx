"use client";

import { useRef, useState } from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";

type Props = {
   content: React.ReactNode;
   children: React.ReactNode;
};

export default function Tooltip({ content, children }: Props) {
   const [open, setOpen] = useState(false);
   const touchRef = useRef(false);

   return (
      <RadixTooltip.Provider delayDuration={50}>
         <RadixTooltip.Root
            open={open}
            onOpenChange={(o) => {
               // On touch: block Radix auto-close (pointer leave after tap), only close via onPointerDownOutside
               if (touchRef.current && !o) return;
               setOpen(o);
            }}
         >
            <RadixTooltip.Trigger
               asChild
               onPointerDown={(e) => {
                  if (e.pointerType === "touch") {
                     touchRef.current = true;
                     e.preventDefault();
                     setOpen((o) => !o);
                  } else {
                     touchRef.current = false;
                  }
               }}
            >
               {children}
            </RadixTooltip.Trigger>
            <RadixTooltip.Portal>
               <RadixTooltip.Content
                  side="top"
                  sideOffset={6}
                  className="z-50 rounded-md bg-[rgba(0,0,0,0.78)] px-2.5 py-1.5 text-xs text-white shadow-md animate-in fade-in-0 zoom-in-95 max-w-72 wrap-break-word"
                  onPointerDownOutside={() => {
                     setOpen(false);
                     touchRef.current = false;
                  }}
               >
                  {content}
                  <RadixTooltip.Arrow className="fill-[rgba(0,0,0,0.78)]" />
               </RadixTooltip.Content>
            </RadixTooltip.Portal>
         </RadixTooltip.Root>
      </RadixTooltip.Provider>
   );
}

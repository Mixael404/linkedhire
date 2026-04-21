"use client";

import * as RadixTooltip from "@radix-ui/react-tooltip";

type Props = {
   content: string;
   children: React.ReactNode;
};

export default function Tooltip({ content, children }: Props) {
   return (
      <RadixTooltip.Provider delayDuration={50}>
         <RadixTooltip.Root>
            <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
            <RadixTooltip.Portal>
               <RadixTooltip.Content
                  side="top"
                  sideOffset={6}
                  className="z-50 rounded-md bg-[rgba(0,0,0,0.78)] px-2.5 py-1.5 text-xs text-white shadow-md animate-in fade-in-0 zoom-in-95"
               >
                  {content}
                  <RadixTooltip.Arrow className="fill-[rgba(0,0,0,0.78)]" />
               </RadixTooltip.Content>
            </RadixTooltip.Portal>
         </RadixTooltip.Root>
      </RadixTooltip.Provider>
   );
}

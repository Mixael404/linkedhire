export default function OrgRow({
   initials,
   name,
   round = false,
   small = false,
}: {
   initials: string;
   name: string;
   round?: boolean;
   small?: boolean;
}) {
   return (
      <div className="flex items-center gap-2">
         <div
            className={`w-8 h-8 sm:w-8.5 sm:h-8.5 ${round ? "rounded-full bg-[#c8102e]" : "rounded-sm bg-gray-100 border border-gray-200"} shrink-0 flex items-center justify-center text-[9px] sm:text-[10px] font-bold ${round ? "text-white" : "text-gray-500"}`}
         >
            {initials}
         </div>
         <span className={`${small ? "text-xs" : "text-sm"} text-[rgba(0,0,0,0.7)] leading-tight line-clamp-2`}>
            {name}
         </span>
      </div>
   );
}

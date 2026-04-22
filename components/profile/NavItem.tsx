export default function NavItem({
   icon,
   label,
   active = false,
   badge,
   className = "",
}: {
   icon: React.ReactNode;
   label: string;
   active?: boolean;
   badge?: number;
   className?: string;
}) {
   return (
      <button
         className={`${className} relative flex flex-col items-center justify-center gap-0.5 px-2 sm:px-4 h-13 text-[11px] leading-none transition-colors ${
            active
               ? "text-[rgba(0,0,0,0.9)] border-b-2 border-[rgba(0,0,0,0.9)]"
               : "text-[rgba(0,0,0,0.55)] hover:text-[rgba(0,0,0,0.9)] border-b-2 border-transparent"
         }`}
      >
         <span className="relative flex items-center justify-center w-6 h-6">
            {icon}
            {badge !== undefined && (
               <span className="absolute -top-1 -right-2 bg-[#e34d26] text-white text-[10px] font-bold rounded-full min-w-4 h-4 flex items-center justify-center px-1 leading-none">
                  {badge}
               </span>
            )}
         </span>
         <span className="hidden sm:block">{label}</span>
      </button>
   );
}

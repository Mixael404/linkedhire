import Link from "next/link";

interface Anchor {
   href: string;
   label: string;
}

interface ArticleNavbarProps {
   anchors?: Anchor[];
}

export default function ArticleNavbar({ anchors }: ArticleNavbarProps) {
   return (
      <header className="sticky top-0 z-50 border-b border-[#1B2847]/60 bg-[#07091A]/80 backdrop-blur-md">
         <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
               <div className="w-7 h-7 rounded-lg bg-linear-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center text-white font-bold text-sm">
                  L
               </div>
               <span
                  className="font-bold text-white text-[17px] tracking-tight"
                  style={{ fontFamily: "var(--font-geologica)" }}
               >
                  Linked<span className="text-[#3B82F6]">Hire</span>
               </span>
            </Link>

            {anchors && anchors.length > 0 && (
               <nav className="hidden md:flex items-center gap-8 text-sm text-[#94A3B8]">
                  {anchors.map((a) => (
                     <a key={a.href} href={a.href} className="hover:text-white transition-colors">
                        {a.label}
                     </a>
                  ))}
               </nav>
            )}

            <Link
               href="/onboarding"
               className="btn-glow bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
               Найти работу за границей
            </Link>
         </div>
      </header>
   );
}

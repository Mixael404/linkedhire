import { HiPencilSquare } from "react-icons/hi2";
import Card from "@/components/profile/Card";

export default function ProfileSidebar() {
   return (
      <div className="w-full lg:w-64 lg:shrink-0 space-y-3">
         <Card className="p-4">
            <div className="flex justify-between items-start mb-3">
               <h3 className="text-[16px] font-semibold text-[rgba(0,0,0,0.9)]">Язык профиля</h3>
               <button className="w-8 h-8 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center text-[rgba(0,0,0,0.55)]">
                  <HiPencilSquare size={16} />
               </button>
            </div>
            <div className="flex gap-2">
               <button className="px-3 py-1 bg-[#057642] text-white text-sm font-semibold rounded-full">
                  Английский
               </button>
               <button className="px-3 py-1 border border-[rgba(0,0,0,0.3)] text-[rgba(0,0,0,0.65)] text-sm font-semibold rounded-full hover:bg-gray-50 transition-colors">
                  Русский
               </button>
            </div>
         </Card>

         <Card className="p-4">
            <div className="flex justify-between items-start mb-2">
               <h3 className="text-[16px] font-semibold text-[rgba(0,0,0,0.9)] leading-snug">
                  Общедоступный
                  <br />
                  профиль и URL-адрес
               </h3>
               <button className="w-8 h-8 rounded-full hover:bg-gray-100 shrink-0 flex items-center justify-center text-[rgba(0,0,0,0.55)] transition-colors">
                  <HiPencilSquare size={16} />
               </button>
            </div>
            <p className="text-sm text-[rgba(0,0,0,0.55)] break-all leading-snug">
               www.linkedin.com/in/john-doe-b9991125b
            </p>
         </Card>
      </div>
   );
}

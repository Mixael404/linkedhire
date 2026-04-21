import { HiPencilSquare } from "react-icons/hi2";
import { FaQuestion } from "react-icons/fa";
import Tooltip from "../ui/Tooltip";

export default function SectionHeader({ title }: { title: string }) {
   return (
      <div className="flex justify-between items-start mb-4">
         <h2 className="text-[18px] font-semibold text-[rgba(0,0,0,0.9)]">{title}</h2>
         <div className="flex gap-1">
            <button className="w-9 h-9 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center text-[rgba(0,0,0,0.55)]">
               <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
               >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
               </svg>
            </button>
            <Tooltip content="Редактирование раздела">
               <div className="w-9 h-9 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center text-[rgba(0,0,0,0.55)]">
                  <HiPencilSquare size={18} />
               </div>
            </Tooltip>
            <Tooltip content="Добавить новый раздел можно с помощью кнопки «Добавить раздел» вверху профиля">
               <div className="w-9 h-9 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center text-[rgba(0,0,0,0.55)]">
                  <FaQuestion size={18} />
               </div>
            </Tooltip>
         </div>
      </div>
   );
}

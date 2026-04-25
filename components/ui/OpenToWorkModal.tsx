"use client";

import Modal from "@/components/ui/Modal";

type Props = {
   isOpen: boolean;
   onClose: () => void;
   roleTitle: string;
   targetCountry?: string | null;
};

function Row({ label, value }: { label: string; value: string }) {
   return (
      <div>
         <p className="text-[15px] font-semibold text-[rgba(0,0,0,0.9)] mb-0.5">{label}</p>
         <p className="text-[15px] text-[rgba(0,0,0,0.6)]">{value}</p>
      </div>
   );
}

export default function OpenToWorkModal({ isOpen, onClose, roleTitle, targetCountry }: Props) {
   return (
      <Modal isOpen={isOpen} onClose={onClose}>
         <div className="p-6 sm:p-7">
            {/* Header */}
            <h2 className="text-[20px] font-bold text-[rgba(0,0,0,0.9)] mb-5">В поиске работы</h2>

            {/* Avatar row */}
            <div className="flex items-center gap-4 mb-6">
               <div className="relative w-16 h-16 shrink-0">
                  <div className="w-full h-full rounded-full overflow-hidden">
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                     <img
                        src="https://randomuser.me/api/portraits/men/75.jpg"
                        alt="avatar"
                        className="w-full h-full object-cover"
                     />
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                     src="/opentowork-ring.png"
                     alt="#OpenToWork"
                     className="absolute inset-0 w-full h-full pointer-events-none select-none"
                     style={{ objectFit: "contain" }}
                     draggable={false}
                  />
               </div>
               <div>
                  <p className="text-[16px] font-semibold text-[rgba(0,0,0,0.9)]">John Doe</p>
                  <p className="text-sm text-[rgba(0,0,0,0.55)] mt-0.5">
                     находится в поиске работы
                  </p>
               </div>
            </div>

            {/* Details */}
            <div className="space-y-4">
               <Row label="Должности" value={roleTitle} />
               <Row label="Типы места работы" value="Удалённая работа" />
               <Row label="Регионы" value={targetCountry ?? "-"} />
               <Row label="Дата начала" value="Сразу же, я активно подаю заявки" />
               <Row
                  label="Типы занятости"
                  value="Полный рабочий день · Неполный рабочий день · Контракт"
               />
            </div>
         </div>
      </Modal>
   );
}

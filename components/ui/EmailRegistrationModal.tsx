"use client";

import Modal from "@/components/ui/Modal";
import EmailOtpForm from "@/components/ui/EmailOtpForm";

type Props = {
   isOpen: boolean;
   onClose: () => void;
   profileId: string;
};

export default function EmailRegistrationModal({ isOpen, onClose, profileId }: Props) {
   return (
      <Modal isOpen={isOpen} onClose={onClose}>
         <div className="p-5 sm:p-7">
            <div className="mb-5">
               <h2 className="text-[16px] sm:text-[18px] font-bold text-[rgba(0,0,0,0.9)] leading-snug mb-1">
                  Сохраните доступ к профилю
               </h2>
               <p className="text-xs text-[rgba(0,0,0,0.5)]">
                  Привяжите email - и всегда сможете вернуться к профилю по ссылке из письма
               </p>
            </div>
            <EmailOtpForm profileId={profileId} onConfirmed={onClose} />
         </div>
      </Modal>
   );
}

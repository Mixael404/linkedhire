"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export default function AuthErrorToast() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("error") === "profile_not_found") {
      toast.error(
        "Произошло неожиданная ошибка. Попробуйте через 5 минут или проверьте адрес почты.",
        { autoClose: 6000 },
      );
    }
  }, [searchParams]);

  return null;
}

"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export default function AuthErrorToast() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("error") === "profile_not_found") {
      toast.error(
        "Профиль с таким email не найден. Создайте новый или проверьте адрес почты.",
        { autoClose: 6000 },
      );
    }
  }, [searchParams]);

  return null;
}

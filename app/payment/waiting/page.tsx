"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { HiCheckCircle, HiXCircle } from "react-icons/hi2";

const POLL_INTERVAL_MS = 3000;
const SESSION_KEY = (profileId: string) => `linkedhire_payment_${profileId}`;

type PollStatus = "polling" | "succeeded" | "canceled" | "error";

function WaitingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const profileId = searchParams.get("profileId") ?? "";
  const [pollStatus, setPollStatus] = useState<PollStatus>("polling");
  const paymentIdRef = useRef<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!profileId) {
      setPollStatus("error");
      return;
    }
    const stored = sessionStorage.getItem(SESSION_KEY(profileId));
    if (!stored) {
      setPollStatus("error");
      return;
    }
    paymentIdRef.current = stored;
  }, [profileId]);

  useEffect(() => {
    if (!paymentIdRef.current || pollStatus !== "polling") return;

    async function check() {
      const paymentId = paymentIdRef.current;
      if (!paymentId) return;

      try {
        const res = await fetch(`/api/payment/status/${paymentId}`);
        if (!res.ok) return;
        const data: { status: string; paid: boolean } = await res.json();

        if (data.status === "succeeded") {
          setPollStatus("succeeded");
          sessionStorage.removeItem(SESSION_KEY(profileId));
          setTimeout(() => router.push(`/profile/${profileId}`), 1800);
        } else if (data.status === "canceled") {
          setPollStatus("canceled");
        }
      } catch {
        // network hiccup — keep polling
      }
    }

    check();
    intervalRef.current = setInterval(check, POLL_INTERVAL_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentIdRef.current, pollStatus]);

  return (
    <div
      className="min-h-screen bg-[#f3f2ef] flex items-center justify-center px-4"
      style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif" }}
    >
      <div className="bg-white rounded-2xl shadow-md w-full max-w-sm p-8 text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-7 h-7 rounded-lg bg-linear-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center text-white font-bold text-xs shrink-0">
            L
          </div>
          <span className="font-bold text-[rgba(0,0,0,0.9)] text-[15px] tracking-tight">
            Linked<span className="text-[#3B82F6]">Hire</span>
          </span>
        </div>

        {pollStatus === "polling" && <PollingState />}
        {pollStatus === "succeeded" && <SucceededState />}
        {pollStatus === "canceled" && (
          <CanceledState onRetry={() => router.push(`/profile/${profileId}`)} />
        )}
        {pollStatus === "error" && (
          <ErrorState onBack={() => router.back()} />
        )}
      </div>
    </div>
  );
}

function PollingState() {
  return (
    <>
      <div className="flex justify-center mb-5">
        <div className="w-14 h-14 rounded-full border-4 border-[#e0e0e0] border-t-[#0a66c2] animate-spin" />
      </div>
      <h2 className="text-[18px] font-bold text-[rgba(0,0,0,0.9)] mb-2">
        Проверяем оплату
      </h2>
      <p className="text-sm text-[rgba(0,0,0,0.5)] leading-relaxed">
        Ожидаем подтверждения от ЮKassa. Это займёт несколько секунд — не закрывайте страницу.
      </p>
    </>
  );
}

function SucceededState() {
  return (
    <>
      <div className="flex justify-center mb-5">
        <HiCheckCircle size={56} className="text-[#22c55e]" />
      </div>
      <h2 className="text-[18px] font-bold text-[rgba(0,0,0,0.9)] mb-2">
        Оплата прошла успешно!
      </h2>
      <p className="text-sm text-[rgba(0,0,0,0.5)]">
        Перенаправляем на ваш профиль...
      </p>
    </>
  );
}

function CanceledState({ onRetry }: { onRetry: () => void }) {
  return (
    <>
      <div className="flex justify-center mb-5">
        <HiXCircle size={56} className="text-[#ef4444]" />
      </div>
      <h2 className="text-[18px] font-bold text-[rgba(0,0,0,0.9)] mb-2">
        Платёж отменён
      </h2>
      <p className="text-sm text-[rgba(0,0,0,0.5)] mb-6">
        Вы можете попробовать снова.
      </p>
      <button
        onClick={onRetry}
        className="w-full py-3 rounded-xl bg-[#0a66c2] hover:bg-[#004182] transition-colors text-white font-bold text-[14px] cursor-pointer"
      >
        Вернуться к профилю
      </button>
    </>
  );
}

function ErrorState({ onBack }: { onBack: () => void }) {
  return (
    <>
      <div className="flex justify-center mb-5">
        <HiXCircle size={56} className="text-[#f59e0b]" />
      </div>
      <h2 className="text-[18px] font-bold text-[rgba(0,0,0,0.9)] mb-2">
        Что-то пошло не так
      </h2>
      <p className="text-sm text-[rgba(0,0,0,0.5)] mb-6">
        Не удалось определить статус платежа. Если деньги были списаны — напишите нам.
      </p>
      <button
        onClick={onBack}
        className="w-full py-3 rounded-xl bg-[#0a66c2] hover:bg-[#004182] transition-colors text-white font-bold text-[14px] cursor-pointer"
      >
        Назад
      </button>
    </>
  );
}

export default function WaitingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f3f2ef] flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border-4 border-[#e0e0e0] border-t-[#0a66c2] animate-spin" />
        </div>
      }
    >
      <WaitingContent />
    </Suspense>
  );
}

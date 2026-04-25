"use client";

import { useState, useEffect } from "react";
import { HiArrowDownTray } from "react-icons/hi2";
import Modal from "@/components/ui/Modal";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

export interface ResumeExtraData {
  name: string;
  city: string;
  phone: string;
  linkedin: string;
  github: string;
  university: string;
  degree: string;
  gradYear: string;
}

const STORAGE_KEY = "linkedhire_resume_personal";
const DEGREES = ["Bachelor's", "Master's", "PhD", "Other"];

const empty: ResumeExtraData = {
  name: "",
  city: "",
  phone: "",
  linkedin: "",
  github: "",
  university: "",
  degree: "Master's",
  gradYear: "",
};

function load(): ResumeExtraData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...empty, ...JSON.parse(raw) } : { ...empty };
  } catch {
    return { ...empty };
  }
}

function save(data: ResumeExtraData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: ResumeExtraData) => void;
  loading: boolean;
};

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-[12px] font-semibold text-[rgba(0,0,0,0.6)] mb-1">
        {label}
        {required && <span className="text-[#ef4444] ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full px-3 py-2 text-sm text-[rgba(0,0,0,0.7)] rounded-lg border border-[rgba(0,0,0,0.15)] focus:outline-none focus:border-[#0a66c2] focus:ring-2 focus:ring-[#0a66c2]/15 transition-colors placeholder:text-[rgba(0,0,0,0.3)]";

export default function ResumeDataModal({ isOpen, onClose, onConfirm, loading }: Props) {
  const [data, setData] = useState<ResumeExtraData>(empty);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) setData(load());
  }, [isOpen]);

  function set(field: keyof ResumeExtraData, value: string) {
    setData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  }

  function handleSubmit() {
    if (!data.name.trim()) { setError("Укажите имя"); return; }
    if (!data.city.trim()) { setError("Укажите город и страну"); return; }
    save(data);
    onConfirm(data);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <SimpleBar style={{ maxHeight: "85dvh" }}>
      <div className="p-5 sm:p-6">
        {/* Header */}
        <div className="mb-5">
          <h2 className="text-[17px] font-bold text-[rgba(0,0,0,0.9)]">
            Данные для резюме
          </h2>
          <p className="text-[13px] text-[rgba(0,0,0,0.5)] mt-1">
            Эта информация не хранится на сервере — только в браузере.
          </p>
        </div>

        <div className="space-y-4">
          {/* Personal */}
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[rgba(0,0,0,0.4)]">
            Личные данные
          </p>

          <Field label="Полное имя" required>
            <input
              className={inputCls}
              placeholder="Ivan Petrov"
              value={data.name}
              onChange={(e) => set("name", e.target.value)}
            />
          </Field>

          <Field label="Город, страна" required>
            <input
              className={inputCls}
              placeholder="Moscow, Russia"
              value={data.city}
              onChange={(e) => set("city", e.target.value)}
            />
          </Field>

          <Field label="Телефон">
            <input
              className={inputCls}
              placeholder="+7 999 123 45 67"
              value={data.phone}
              onChange={(e) => set("phone", e.target.value)}
            />
          </Field>

          {/* Online */}
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[rgba(0,0,0,0.4)] pt-1">
            Онлайн-присутствие
          </p>

          <Field label="LinkedIn URL">
            <input
              className={inputCls}
              placeholder="linkedin.com/in/ivanpetrov"
              value={data.linkedin}
              onChange={(e) => set("linkedin", e.target.value)}
            />
          </Field>

          <Field label="GitHub">
            <input
              className={inputCls}
              placeholder="github.com/ivanpetrov"
              value={data.github}
              onChange={(e) => set("github", e.target.value)}
            />
          </Field>

          {/* Education */}
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[rgba(0,0,0,0.4)] pt-1">
            Образование
          </p>

          <Field label="Университет">
            <input
              className={inputCls}
              placeholder="Moscow State University"
              value={data.university}
              onChange={(e) => set("university", e.target.value)}
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Степень">
              <select
                className={inputCls + " bg-white text-[rgba(0,0,0,0.55)]"}
                value={data.degree}
                onChange={(e) => set("degree", e.target.value)}
              >
                {DEGREES.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </Field>

            <Field label="Год окончания">
              <input
                className={inputCls}
                placeholder="2019"
                maxLength={4}
                value={data.gradYear}
                onChange={(e) => set("gradYear", e.target.value.replace(/\D/g, ""))}
              />
            </Field>
          </div>
        </div>

        {error && (
          <p className="text-[12px] text-[#ef4444] mt-3">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-5 w-full py-3 rounded-xl bg-[#0a66c2] hover:bg-[#004182] transition-colors text-white font-bold text-[14px] flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? (
            <>
              <svg className="animate-spin" width="15" height="15" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="5.5" stroke="white" strokeOpacity="0.35" strokeWidth="2" />
                <path d="M7 1.5A5.5 5.5 0 0112.5 7" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Генерируем PDF…
            </>
          ) : (
            <>
              <HiArrowDownTray size={15} />
              Сгенерировать и скачать
            </>
          )}
        </button>
      </div>
      </SimpleBar>
    </Modal>
  );
}

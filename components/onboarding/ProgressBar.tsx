"use client";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepLabels?: string[];
}

export default function ProgressBar({ currentStep, totalSteps, stepLabels }: ProgressBarProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#07091A]/95 backdrop-blur-sm border-t border-[#1B2847]">
      <div className="max-w-2xl mx-auto px-6 py-4">
        {/* Step counter + label */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[#64748B] text-xs font-medium">
            {stepLabels?.[currentStep] ?? `Шаг ${currentStep + 1}`}
          </span>
          <span className="text-[#64748B] text-xs">
            <span className="text-white font-semibold">{currentStep + 1}</span>
            {" / "}
            {totalSteps}
          </span>
        </div>

        {/* Bar track */}
        <div className="relative h-1.5 bg-[#1B2847] rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#2563EB] to-[#06B6D4] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Step dots */}
        <div className="flex justify-between mt-2.5">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i <= currentStep
                  ? "bg-[#2563EB] scale-125"
                  : "bg-[#1B2847]"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

import type { FieldError, Path, UseFormRegister } from "react-hook-form";

import type { CompeticaoFormValues } from "@/features/competicao/types/competicao";

type InputFieldProps = {
  id: string;
  label: string;
  field: Path<CompeticaoFormValues>;
  register: UseFormRegister<CompeticaoFormValues>;
  error?: FieldError;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder?: string;
  required?: boolean;
  min?: string;
  max?: string;
  step?: string;
  autoComplete?: string;
};

export function InputField({
  id,
  label,
  field,
  register,
  error,
  type = "text",
  placeholder,
  required = true,
  min,
  max,
  step,
  autoComplete,
}: InputFieldProps) {
  const hasError = Boolean(error);
  const descriptionId = hasError ? `${id}-error` : undefined;

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="flex items-center gap-2 text-sm font-semibold text-[#1f2937]">
        <span>{label}</span>
        {required ? (
          <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#f97316]">
            obrigatório
          </span>
        ) : null}
      </label>

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        aria-required={required}
        aria-invalid={hasError}
        aria-describedby={descriptionId}
        autoComplete={autoComplete}
        min={min}
        max={max}
        step={step}
        {...register(field)}
        className={[
          "h-12 w-full rounded-xl border bg-[#f8fafc] px-3 text-sm text-[#0f172a] shadow-sm transition",
          "placeholder:text-slate-400 focus:border-[#f59e0b] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#fcd7a5]",
          hasError ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-200" : "border-slate-200",
        ].join(" ")}
      />

      {hasError && error ? (
        <p id={descriptionId} role="alert" className="text-xs font-medium text-red-600">
          {error.message}
        </p>
      ) : null}
    </div>
  );
}

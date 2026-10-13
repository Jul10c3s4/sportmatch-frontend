import type { FieldError, Path, UseFormRegister } from "react-hook-form";

import type { CompeticaoFormValues } from "@/features/competicao/types/competicao";

type SelectFieldProps = {
  id: string;
  label: string;
  field: Path<CompeticaoFormValues>;
  register: UseFormRegister<CompeticaoFormValues>;
  error?: FieldError;
  options: Array<{ value: string; label: string }>;
  placeholder: string;
  required?: boolean;
};

export function SelectField({
  id,
  label,
  field,
  register,
  error,
  options,
  placeholder,
  required = true,
}: SelectFieldProps) {
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

      <select
        id={id}
        defaultValue=""
        aria-required={required}
        aria-invalid={hasError}
        aria-describedby={descriptionId}
        {...register(field)}
        className={[
          "h-12 w-full rounded-xl border bg-[#f8fafc] px-3 text-sm text-[#0f172a] shadow-sm transition",
          "focus:border-[#f59e0b] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#fcd7a5]",
          hasError ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-200" : "border-slate-200",
        ].join(" ")}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {hasError && error ? (
        <p id={descriptionId} role="alert" className="text-xs font-medium text-red-600">
          {error.message}
        </p>
      ) : null}
    </div>
  );
}

"use client";

import { forwardRef } from "react";

type PetFormSelectProps = {
  label: string;
  options: string[];
  error?: string;
  placeholder?: string;
} & React.ComponentProps<"select">;

export const PetFormSelect = forwardRef<HTMLSelectElement, PetFormSelectProps>(
  ({ label, options, error, placeholder, ...selectProps }, ref) => {
    return (
      <div className="w-full mb-0.5">
        <label className="flex items-center gap-[1px] text-small">
          {label}
        </label>
        <div className="relative">
          <select
            ref={ref}
            {...selectProps}
            className={`w-full h-[44px] border ${
              error ? "border-red-500" : "border-textMain"
            } text-base rounded-[8px] px-2.5  py-2 bg-lightPink mt-[4px]`}
          >
            <option value="">{placeholder ?? "選択してください"}</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        {error ? (
          <p className="h-[18px] mt-1 text-[12px] text-red-600 leading-tight">
            {error}
          </p>
        ) : (
          <p className="h-[18px] mt-1 text-[12px] invisible leading-tight">
            placeholder
          </p>
        )}
      </div>
    );
  }
);

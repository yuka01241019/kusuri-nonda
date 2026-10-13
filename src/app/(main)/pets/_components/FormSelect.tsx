"use client";

import { forwardRef } from "react";
import TriangleIcon from "@assets/icons/pet/triangle.svg";

type FormSelectProps = {
  label: string;
  options: { value: string; label: string }[];
  error?: string;
} & React.ComponentProps<"select">;

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, options, error, ...selectProps }, ref) => {
    return (
      <div className="w-full mb-0.5">
        <label className="text-small">{label}</label>
        <div className="relative">
          <select
            ref={ref}
            {...selectProps}
            className={`appearance-none w-full h-[44px] border ${error ? "border-red-500" : "border-textMain"} rounded-[8px] px-2.5 py-2 mt-[4px] bg-white`}
          >
            <option value="">選択してください</option>
            {options.map((medication) => {
              return (
                <option key={medication.value} value={medication.value}>
                  {medication.label}
                </option>
              );
            })}
          </select>
          <div className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
            <TriangleIcon />
          </div>
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
  },
);

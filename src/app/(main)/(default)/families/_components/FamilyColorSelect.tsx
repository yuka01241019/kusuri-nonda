"use client";

import { FamilyFormData } from "@/app/_schemas/family/familyFormSchema";
import { FAMILY_COLORS } from "@/app/_constants/familyColors";

type FamilyColorSelectProps = {
  label: string;
  value: FamilyFormData["color"];
  onChange: (value: FamilyFormData["color"]) => void;
  error?: string;
  disabled?: boolean;
};

export const FamilyColorSelect: React.FC<FamilyColorSelectProps> = ({
  label,
  value,
  onChange,
  error,
  disabled,
}) => {
  return (
    <div className="w-full mb-0.5">
      <p className="flex items-center gap-[1px] text-small">{label}</p>
      <div className="flex items-center justify-between w-full mt-[4px]">
        {FAMILY_COLORS.map((color) => {
          return (
            <button
              key={color}
              type="button"
              className={`w-9 h-9 rounded-full ${value === color ? "ring-2 ring-textMain " : ""} `}
              style={{ backgroundColor: color }}
              onClick={() => {
                onChange(color);
              }}
              disabled={disabled}
              aria-label={color}
              aria-pressed={value === color}
            />
          );
        })}
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
};

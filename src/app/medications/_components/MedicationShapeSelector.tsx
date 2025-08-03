"use client";

import TabletIcon from "@assets/icons/medication/form/tablet.svg";
import RoundTabletIcon from "@assets/icons/medication/form/roundtablet.svg";
import EyedropIcon from "@assets/icons/medication/form/eyedrop.svg";
import PowderIcon from "@assets/icons/medication/form/powder.svg";
import { Form } from "../_lib/medicationFormSchema";

type MedicationShapeSelectorProps = {
  label: string;
  value: Form;
  onChange: (value: Form) => void;
  error?: string;
  disabled?: boolean;
};

export const MedicationShapeSelector: React.FC<
  MedicationShapeSelectorProps
> = ({ label, value, onChange, error, disabled }) => {
  //薬形状アイコン一覧(配列にし、mapにて繰り返し表示
  const options = [
    { value: "TABLET", icon: TabletIcon, label: "錠剤" },
    { value: "ROUNDTABLET", icon: RoundTabletIcon, label: "錠剤(丸)" },
    { value: "EYEDROP", icon: EyedropIcon, label: "目薬" },
    { value: "POWDER", icon: PowderIcon, label: "粉薬" },
  ] as const;
  return (
    <div className="text-small">
      <p className="mb-2">{label}</p>
      <div className="flex gap-7 justify-center w-full">
        {options.map(
          ({ value: optionValue, icon: Icon, label: optionLabel }) => (
            <label
              key={optionValue}
              className="flex flex-col items-center cursor-pointer justify-between"
            >
              <Icon
                className={`w-8 h-8 ${
                  optionValue === "ROUNDTABLET" ? "translate-y-[4px]" : ""
                } mb-2`}
              />
              <div className="flex items-center gap-1">
                <input
                  type="radio"
                  name="medicationForm"
                  value={optionValue}
                  checked={value === optionValue}
                  onChange={() =>
                    onChange(Form[optionValue as keyof typeof Form])
                  }
                  disabled={disabled}
                  className="appearance-none w-4 h-4 border border-textMain rounded-full checked:border-[3.5px]  checked:border-darkPink"
                />
                <span>{optionLabel}</span>
              </div>
            </label>
          )
        )}
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1 leading-tight">{error}</p>
      )}
    </div>
  );
};

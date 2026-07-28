"use client";

//TABLET
import GrayTabletIcon from "@assets/icons/medication/color/tablet/gray.svg";
import OrangeTabletIcon from "@assets/icons/medication/color/tablet/orange.svg";
import RedTabletIcon from "@assets/icons/medication/color/tablet/red.svg";
import WhiteTabletIcon from "@assets/icons/medication/color/tablet/white.svg";
import YellowTabletIcon from "@assets/icons/medication/color/tablet/yellow.svg";
//ROUNDTABLET
import GrayRoundTabletIcon from "@assets/icons/medication/color/RoundTablet/gray.svg";
import OrangeRoundTabletIcon from "@assets/icons/medication/color/RoundTablet/orange.svg";
import RedRoundTabletIcon from "@assets/icons/medication/color/RoundTablet/red.svg";
import WhiteRoundTabletIcon from "@assets/icons/medication/color/RoundTablet/white.svg";
import YellowRoundTabletIcon from "@assets/icons/medication/color/RoundTablet/yellow.svg";

import { Color } from "../_lib/medicationFormSchema";

type MedicationColorSelectorProps = {
  mode: "tablet" | "roundTablet";
  label?: string;
  value?: Color;
  onChange: (value: Color) => void;
  error?: string;
  disabled?: boolean;
};

export const MedicationColorSelector: React.FC<
  MedicationColorSelectorProps
> = ({ mode, label, value, onChange, error, disabled }) => {
  const ColorOptions = [
    Color.WHITE,
    Color.RED,
    Color.YELLOW,
    Color.GRAY,
    Color.ORANGE,
  ] as const;
  //TABLET用アイコンマップ
  const tabletIconMap: Record<
    Color,
    React.FC<React.SVGProps<SVGSVGElement>>
  > = {
    [Color.WHITE]: WhiteTabletIcon,
    [Color.RED]: RedTabletIcon,
    [Color.YELLOW]: YellowTabletIcon,
    [Color.GRAY]: GrayTabletIcon,
    [Color.ORANGE]: OrangeTabletIcon,
  };
  //ROUNDTABLET用アイコンマップ
  const roundTabletIconMap: Record<
    Color,
    React.FC<React.SVGProps<SVGSVGElement>>
  > = {
    [Color.WHITE]: WhiteRoundTabletIcon,
    [Color.RED]: RedRoundTabletIcon,
    [Color.YELLOW]: YellowRoundTabletIcon,
    [Color.GRAY]: GrayRoundTabletIcon,
    [Color.ORANGE]: OrangeRoundTabletIcon,
  };
  const iconMap = mode === "tablet" ? tabletIconMap : roundTabletIconMap;
  return (
    <div className="text-small">
      <div className="mb-2">{label}</div>
      <div className="flex gap-8 justify-center w-full">
        {ColorOptions.map((color) => {
          const Icon = iconMap[color];
          const selected = value === color;
          return (
            <label
              key={color}
              className={`flex flex-col items-center cursor-pointer justify-between
                ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              
                <Icon className="w-8 h-9 mb-2" />
                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="medicationColor"
                    value={color}
                    checked={selected}
                    onChange={() => onChange(color)}
                    disabled={disabled}
                    className="appearance-none w-4 h-4 border border-textMain rounded-full checked:border-[3.5px]  checked:border-darkPink"
                  />
                </div>
              {/* 個別ラベルは出さない（視覚上は非表示） */}
              <span className="sr-only">{color}</span>
            </label>
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

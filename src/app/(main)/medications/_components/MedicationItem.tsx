"use client";

import { Medication } from "@/app/_types/medication/CreateMedication";
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
import PowderIcon from "@assets/icons/medication/form/powder.svg";
import EyedropIcon from "@assets/icons/medication/form/eyedrop.svg";
import ChevronRightIcon from "@assets/icons/chevron-right.svg";
import { Color } from "../_lib/medicationFormSchema";
import { useState } from "react";
import { DropdownMenu } from "radix-ui";
import EditIcon from "@assets/icons/edit.svg";
import TrashIcon from "@assets/icons/trash.svg";

type MedicationItemProps = {
  medication: Medication;
  isLast: boolean;
};

export const MedicationItem: React.FC<MedicationItemProps> = ({
  medication,
  isLast,
}) => {
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

  let icon = null;
  if (medication.form === "POWDER") {
    icon = <PowderIcon className="w-5 h-5" />;
  } else if (medication.form === "EYEDROP") {
    icon = <EyedropIcon className="w-5 h-5" />;
  } else if (medication.form === "TABLET" && medication.color !== null) {
    const Icon = tabletIconMap[medication.color];
    icon = <Icon className="w-5 h-5" />;
  } else if (medication.form === "ROUNDTABLET" && medication.color !== null) {
    const Icon = roundTabletIconMap[medication.color];
    icon = <Icon className="w-5 h-5" />;
  }
  // ドロップダウンメニューの開閉状態を管理
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div
      className={`pb-5 pt-2 ${isLast ? "" : "border-b-[1.25px] border-gray-300 "}`}
    >
      <div className="flex items-center gap-2">
        {icon}
        {medication.name}
        <DropdownMenu.Root open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          {isMenuOpen && (
            <div className="fixed inset-0 z-[60] bg-black/20"></div>
          )}
          <DropdownMenu.Trigger asChild>
            <button
              type="button"
              // 読み上げソフトにボタンの役割を伝える
              aria-label={`${medication.name}の編集・削除メニューを開く`}
              className="ml-auto rounded-full p-2 outline-none hover:bg-lightPink focus-visible:bg-lightPink"
            >
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            {/* 白い枠 */}
            <DropdownMenu.Content
              sideOffset={5}
              align="end"
              className="text-small text-textMain z-[70] w-[180px] space-y-2 rounded-[16px] bg-white p-6 shadow-lg"
            >
              <DropdownMenu.Item className="mx-auto flex w-fit cursor-pointer items-center justify-center gap-1 rounded-lg bg-submitBtn px-6 py-2 text-white opacity-100 outline-none hover:opacity-80 transition-opacity">
                <EditIcon className="w-5 h-5" />
                編集
              </DropdownMenu.Item>
              <DropdownMenu.Item className="mx-auto flex w-fit cursor-pointer items-center justify-center gap-1 rounded-lg bg-red-400 px-6 py-2 text-white  opacity-100 outline-none hover:opacity-80 transition-opacity">
                <TrashIcon className="w-5 h-5" />
                削除
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </div>
  );
};

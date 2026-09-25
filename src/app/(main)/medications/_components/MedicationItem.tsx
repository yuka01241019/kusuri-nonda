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
import Modal from "react-modal";
import CloseIcon from "@assets/icons/close.svg";
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
  // モーダルの状態管理
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div
      className={`pb-5 pt-2 ${isLast ? "" : "border-b-[1.25px] border-gray-300 "}`}
    >
      <div className="flex items-center gap-2">
        {icon}
        {medication.name}
        <button
          type="button"
          onClick={() => {
            setIsModalOpen(true);
          }}
          // 読み上げソフトにボタンの役割を伝える
          aria-label={`${medication.name}の編集・削除メニューを開く`}
          className="ml-auto p-2"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel={`${medication.name}の編集・削除メニュー`}
        overlayClassName="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
        className="text-small text-textMain relative w-[280px] max-w-sm rounded-2xl bg-white p-6 outline-none "
      >
        <p className="mb-4 text-center">{medication.name}</p>
        <div className="flex flex-col items-center gap-2">
          <button
            type="button"
            className="flex items-center justify-center gap-1 rounded-lg bg-submitBtn px-5 py-2 text-white"
          >
            <EditIcon className="w-5 h-5" />
            編集
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-1 rounded-lg bg-red-400 px-5 py-2 text-white"
          >
            <TrashIcon className="w-5 h-5" />
            削除
          </button>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(false)}
          aria-label="モーダルを閉じる"
          className="absolute right-4 top-4 p-1"
        >
          <CloseIcon className="w-5 h-5" />
        </button>
      </Modal>
    </div>
  );
};

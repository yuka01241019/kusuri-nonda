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

import { Color } from "../_lib/medicationFormSchema";

type MedicationItemProps = {
  medication: Medication;
  isLast: boolean;
};

export const MedicationItem: React.FC<MedicationItemProps> = ({
  medication,
  isLast,
}) => {
  const tabletIconMap = {
    [Color.WHITE]: WhiteTabletIcon,
    [Color.RED]: RedTabletIcon,
    [Color.YELLOW]: YellowTabletIcon,
    [Color.GRAY]: GrayTabletIcon,
    [Color.ORANGE]: OrangeTabletIcon,
  };

  let icon = null;
  if (medication.form === "POWDER") {
    icon = <PowderIcon />;
  } else if (medication.form === "EYEDROP") {
    icon = <EyedropIcon />;
  } else if (medication.form === "TABLET" && medication.color !== null) {
    const Icon = tabletIconMap[medication.color];
    icon = <Icon />;
  }
  return (
    <div
      className={`pb-5 pt-2 ${isLast ? "" : "border-b-[1.25px] border-gray-300 "}`}
    >
      {icon}
      {medication.form}
      {medication.name}
      {medication.color}
    </div>
  );
};

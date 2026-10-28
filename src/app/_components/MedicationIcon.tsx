"use client";

import { Form, Color } from "@prisma/client";
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

type MedicationIconProps = {
  form: Form;
  color: Color | null;
};

// 薬の色を指定→その色の錠剤アイコンを取り出せる対応表
const tabletIconMap: Record<Color, React.FC<React.SVGProps<SVGSVGElement>>> = {
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

export const MedicationIcon: React.FC<MedicationIconProps> = ({
  form,
  color,
}) => {
  let icon = null;
  if (form === "POWDER") {
    icon = <PowderIcon className="w-5 h-5" />;
  } else if (form === "EYEDROP") {
    icon = <EyedropIcon className="w-5 h-5" />;
  } else if (form === "TABLET" && color !== null) {
    const Icon = tabletIconMap[color];
    icon = <Icon className="w-5 h-5" />;
  } else if (form === "ROUNDTABLET" && color !== null) {
    const Icon = roundTabletIconMap[color];
    icon = <Icon className="w-5 h-5" />;
  }
  return icon;
};

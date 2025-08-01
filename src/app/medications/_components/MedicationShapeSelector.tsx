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
    { value: "TABLET", icon: TabletIcon },
    { value: "ROUNDTABLET", icon: RoundTabletIcon },
    { value: "EYEDROP", icon: EyedropIcon },
    { value: "POWDER", icon: PowderIcon },
  ] as const;
  return <div className=""></div>;
};

"use client";

import { Medication } from "@/app/_types/medication/CreateMedication";

type MedicationItemProps = {
  medication: Medication;
  isLast: boolean;
};

export const MedicationItem: React.FC<MedicationItemProps> = ({
  medication,
  isLast,
}) => {
  return (
    <div
      className={`pb-5 pt-2 ${isLast ? "" : "border-b-[1.25px] border-gray-300 "}`}
    >
      {medication.name}
    </div>
  );
};

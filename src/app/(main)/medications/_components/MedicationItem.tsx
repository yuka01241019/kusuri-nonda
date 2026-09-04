"use client";

import { Medication } from "@/app/_types/medication/CreateMedication";

type MedicationItemProps = {
  medication: Medication;
};

export const MedicationItem: React.FC<MedicationItemProps> = ({
  medication,
}) => {
  return <div>{medication.name}</div>;
};

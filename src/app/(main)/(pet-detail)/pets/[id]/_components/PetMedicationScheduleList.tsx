"use client";

import { PetInfo } from "../../_components/PetInfo";
import { MedicationScheduleList } from "./MedicationScheduleList";

type PetMedicationScheduleListProps = {
  id: string;
};

export const PetMedicationScheduleList: React.FC<
  PetMedicationScheduleListProps
> = ({ id }) => {
  return (
    <div className="flex flex-1 flex-col bg-lightPink">
      <PetInfo id={id} />
      <MedicationScheduleList id={id} />
    </div>
  );
};

"use client";

import { useRouteGuard } from "@/app/_hooks/useRouteGuard";
import { PetMedicationScheduleEdit } from "./_components/PetMedicationScheduleEdit";

type PetMedicationScheduleEditPageProps = {
  params: {
    id: string;
    scheduleId: string;
  };
};

const PetMedicationScheduleEditPage = ({
  params,
}: PetMedicationScheduleEditPageProps) => {
  useRouteGuard();
  return (
    <PetMedicationScheduleEdit id={params.id} scheduleId={params.scheduleId} />
  );
};

export default PetMedicationScheduleEditPage;

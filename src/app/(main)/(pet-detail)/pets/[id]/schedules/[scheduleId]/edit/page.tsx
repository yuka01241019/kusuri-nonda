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
    <div>
      <PetMedicationScheduleEdit
        id={params.id}
        scheduleId={params.scheduleId}
      />
    </div>
  );
};

export default PetMedicationScheduleEditPage;

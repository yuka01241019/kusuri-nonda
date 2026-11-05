"use client";

import { useRouteGuard } from "@/app/_hooks/useRouteGuard";
import { PetMedicationScheduleList } from "./_components/PetMedicationScheduleList";

type PetMedicationScheduleListPageProps = {
  params: { id: string };
};

const PetMedicationScheduleListPage = ({
  params,
}: PetMedicationScheduleListPageProps) => {
  useRouteGuard();
  return <PetMedicationScheduleList id={params.id}/>;
};
export default PetMedicationScheduleListPage;

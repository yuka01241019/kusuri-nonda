"use client";

import { useRouteGuard } from "@/app/_hooks/useRouteGuard";
import MedicationEdit from "../_components/MedicationEdit";

type MedicationEditPageProps = {
  params: {
    id: string;
  };
};

const MedicationEditPage = ({ params }: MedicationEditPageProps) => {
  useRouteGuard();
  return (
    <div>
      <MedicationEdit id={params.id} />
    </div>
  );
};

export default MedicationEditPage;

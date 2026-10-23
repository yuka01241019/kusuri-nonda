"use client";

import { MedicationForm } from "../_components/MedicationForm";
import { useRouteGuard } from "@/app/_hooks/useRouteGuard";

const NewMedicationPage: React.FC = () => {
  useRouteGuard();
  return (
    <div>
      <MedicationForm />
    </div>
  );
};

export default NewMedicationPage;

"use client";

import { useRouteGuard } from "@/app/_hooks/useRouteGuard";
import PetMedicationRegistration from "../../../_components/PetMedicationRegistration";

type NewPetMedicationPageProps = {
  params: { id: string };
};

const NewPetMedicationPage = ({ params }: NewPetMedicationPageProps) => {
  useRouteGuard();
  return (
    <div>
      <PetMedicationRegistration id={params.id} />
    </div>
  );
};
export default NewPetMedicationPage;

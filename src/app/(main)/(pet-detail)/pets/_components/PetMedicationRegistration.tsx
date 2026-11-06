"use client";

import { PetInfo } from "./PetInfo";
import React from "react";
import { PetMedicationForm } from "./PetMedicationForm";

type PetMedicationPageProps = {
  id: string;
};

const PetMedicationRegistration: React.FC<PetMedicationPageProps> = ({
  id,
}) => {
  return (
    <div className="flex flex-1 flex-col bg-lightPink">
      <PetInfo id={id} />
      <PetMedicationForm petId={Number(id)} />
    </div>
  );
};
export default PetMedicationRegistration;

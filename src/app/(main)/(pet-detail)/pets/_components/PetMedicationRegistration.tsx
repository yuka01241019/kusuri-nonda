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
    <div>
      <PetInfo id={id} />
      <PetMedicationForm petId={Number(id)} />
    </div>
  );
};
export default PetMedicationRegistration;

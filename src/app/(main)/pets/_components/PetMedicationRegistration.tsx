"use client";

import { LoadingSpinner } from "@/app/_components/LoadingSpinner";
import { useFetch } from "@/app/_hooks/useFetch";
import { GetPetResponse } from "@/app/_types/pet/pet";
import { PetInfo } from "./PetInfo";
import React from "react";
import { PetMedicationForm } from "./PetMedicationForm";

type PetMedicationPageProps = {
  id: string;
};

const PetMedicationRegistration: React.FC<PetMedicationPageProps> = ({
  id,
}) => {
  const { data, isLoading, error } = useFetch<GetPetResponse>(
    `/api/pets/${id}`,
  );
  if (isLoading) {
    return (
      <div className="pt-10">
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    return <p>ペット情報の取得に失敗しました。</p>;
  }
  if (!data) {
    return <p>ペット情報が見つかりません。</p>;
  }
  return (
    <div>
      <PetInfo
        name={data.pet.name}
        gender={data.pet.gender}
        birthday={data.pet.birthday}
        adoptedAt={data.pet.adoptedAt}
        imagePath={data.pet.imagePath}
      />
      <PetMedicationForm petId={Number(id)} />
    </div>
  );
};
export default PetMedicationRegistration;

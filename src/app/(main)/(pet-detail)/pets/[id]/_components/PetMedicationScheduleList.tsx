"use client";

import { PetInfo } from "../../_components/PetInfo";
import { GetPetResponse } from "@/app/_types/pet/pet";
import { useFetch } from "@/app/_hooks/useFetch";
import { LoadingSpinner } from "@/app/_components/LoadingSpinner";
import { MedicationScheduleList } from "./MedicationScheduleList";

type PetMedicationScheduleListProps = {
  id: string;
};

export const PetMedicationScheduleList: React.FC<
  PetMedicationScheduleListProps
> = ({ id }) => {
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
      <MedicationScheduleList id={id} />
    </div>
  );
};

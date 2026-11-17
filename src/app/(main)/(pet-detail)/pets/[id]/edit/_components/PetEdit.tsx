"use client";

import { GetPetResponse } from "@/app/_types/pet/pet";
import { PetForm } from "@/app/pets/_components/PetForm";
import { useFetch } from "@/app/_hooks/useFetch";
import { LoadingSpinner } from "@/app/_components/LoadingSpinner";

type PetEditProps = {
  id: string;
};

export const PetEdit: React.FC<PetEditProps> = ({ id }) => {
  const { data, isLoading, error } = useFetch<GetPetResponse>(
    `/api/pets/${id}`,
  );
  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col bg-lightPink pt-10">
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
  return <PetForm mode="edit" pet={data.pet} />;
};

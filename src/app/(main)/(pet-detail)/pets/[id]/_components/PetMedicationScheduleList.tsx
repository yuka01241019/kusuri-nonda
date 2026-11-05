"use client";

import { PetInfo } from "../../_components/PetInfo";
import { GetPetResponse } from "@/app/_types/pet/pet";
import { GetMedicationSchedulesResponse } from "@/app/_types/schedule/schedule";
import { useFetch } from "@/app/_hooks/useFetch";
import { LoadingSpinner } from "@/app/_components/LoadingSpinner";
import { MedicationScheduleList } from "./MedicationScheduleList";

type PetMedicationScheduleListProps = {
  id: string;
};

export const PetMedicationScheduleList: React.FC<
  PetMedicationScheduleListProps
> = ({ id }) => {
  const {
    // ① ペット情報のuseFetch
    data: petData,
    isLoading: isPetLoading,
    error: petError,
  } = useFetch<GetPetResponse>(`/api/pets/${id}`);
  // ② スケジュール情報一覧のuseFetch
  const {
    data: schedulesData,
    isLoading: isSchedulesLoading,
    error: schedulesError,
    mutate,
  } = useFetch<GetMedicationSchedulesResponse>(`/api/pets/${id}/schedules`);
  if (isPetLoading || isSchedulesLoading) {
    return (
      <div className="pt-10">
        <LoadingSpinner />
      </div>
    );
  }
  if (petError) {
    return <p>ペット情報の取得に失敗しました。</p>;
  }
  if (schedulesError) {
    return <p>薬スケジュールの取得に失敗しました。</p>;
  }
  if (!petData) {
    return <p>ペット情報が見つかりません。</p>;
  }
  if (!schedulesData) {
    return <p>薬スケジュール情報を取得できませんでした。</p>;
  }
  return (
    <div className="flex flex-1 flex-col bg-lightPink">
      <PetInfo
        name={petData.pet.name}
        gender={petData.pet.gender}
        birthday={petData.pet.birthday}
        adoptedAt={petData.pet.adoptedAt}
        imagePath={petData.pet.imagePath}
      />
      <MedicationScheduleList
        id={id}
        schedulesData={schedulesData}
        mutate={mutate}
      />
    </div>
  );
};

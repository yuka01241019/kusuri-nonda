"use client";

import { useFetch } from "@/app/_hooks/useFetch";
import { GetPetResponse } from "@/app/_types/pet/pet";
import { GetMedicationScheduleResponse } from "@/app/_types/schedule/schedule";
import { LoadingSpinner } from "@/app/_components/LoadingSpinner";
import { PetMedicationForm } from "@/app/(main)/(pet-detail)/pets/_components/PetMedicationForm";
import { PetInfo } from "@/app/(main)/(pet-detail)/pets/_components/PetInfo";

type PetMedicationScheduleEditProps = {
  id: string;
  scheduleId: string;
};

export const PetMedicationScheduleEdit = ({
  id,
  scheduleId,
}: PetMedicationScheduleEditProps) => {
  // ① ペット情報のuseFetch
  const {
    data: petData,
    isLoading: isPetLoading,
    error: petError,
  } = useFetch<GetPetResponse>(`/api/pets/${id}`);
  // ② スケジュール情報のuseFetch
  const {
    data: scheduleData,
    isLoading: isScheduleLoading,
    error: scheduleError,
  } = useFetch<GetMedicationScheduleResponse>(
    `/api/pets/${id}/schedules/${scheduleId}`,
  );
  if (isPetLoading || isScheduleLoading) {
    return (
      <div className="pt-10">
        <LoadingSpinner />
      </div>
    );
  }
  if (petError) {
    return <p>ペット情報の取得に失敗しました。</p>;
  }
  if (scheduleError) {
    return <p>スケジュールの取得に失敗しました。</p>;
  }
  if (!petData) {
    return <p>ペット情報が見つかりません。</p>;
  }
  if (!scheduleData) {
    return <p>スケジュールが見つかりません。</p>;
  }
  return (
    <div>
      <PetInfo
        name={petData.pet.name}
        gender={petData.pet.gender}
        birthday={petData.pet.birthday}
        adoptedAt={petData.pet.adoptedAt}
        imagePath={petData.pet.imagePath}
      />
      <PetMedicationForm
        petId={Number(id)}
        medicationSchedule={scheduleData.schedule}
      />
    </div>
  );
};

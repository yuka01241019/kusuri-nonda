"use client";

import { useFetch } from "@/app/_hooks/useFetch";
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
  const { data, isLoading, error } = useFetch<GetMedicationScheduleResponse>(
    `/api/pets/${id}/schedules/${scheduleId}`,
  );
  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col bg-lightPink pt-10">
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    return <p>スケジュールの取得に失敗しました。</p>;
  }
  if (!data) {
    return <p>スケジュールが見つかりません。</p>;
  }
  return (
    <div className="flex flex-1 flex-col bg-lightPink">
      <PetInfo id={id} />
      <PetMedicationForm
        petId={Number(id)}
        medicationSchedule={data.schedule}
      />
    </div>
  );
};

"use client";

import { GetMedicationSchedulesResponse } from "@/app/_types/schedule/schedule";
import { PetMedicationScheduleItem } from "./PetMedicationScheduleItem";
import type { KeyedMutator } from "swr";
import { EmptyState } from "@/app/_components/EmptyState";

import EmptyScheduleIcon from "@assets/emptyState/emptySchedule.svg";

type MedicationScheduleListProps = {
  id: string;
  schedulesData: GetMedicationSchedulesResponse;
  mutate: KeyedMutator<GetMedicationSchedulesResponse>;
};

export const MedicationScheduleList: React.FC<MedicationScheduleListProps> = ({
  id,
  schedulesData,
  mutate,
}) => {
  if (schedulesData.schedules.length === 0) {
    return (
      <EmptyState
      icon={<EmptyScheduleIcon/>}
        title="薬スケジュールがまだ登録されていません"
        description="お薬を飲む時間や曜日を登録しましょう！"
        buttonText="スケジュールを登録"
        href={`/pets/${id}/medications/new`}
      />
    );
  }
  return (
    <div className="text-small">
      <div className="bg-lightPink min-h-screen flex justify-center items-start py-10">
        <div className="w-full flex flex-col items-center text-textMain">
          <div className="w-full max-w-[350px] sm:max-w-[390px] md:max-w-[400px] lg:max-w-[420px] bg-white rounded-[16px] px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-8 lg:py-10">
            <div className="my-[10px]">
              {schedulesData.schedules.map((schedule, index) => {
                return (
                  <PetMedicationScheduleItem
                    key={schedule.id}
                    petId={Number(id)}
                    schedule={schedule}
                    isLast={index === schedulesData.schedules.length - 1}
                    onDelete={mutate}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

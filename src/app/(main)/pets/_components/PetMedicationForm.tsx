"use client";

import { useFetch } from "@/app/_hooks/useFetch";
import { GetMedicationsResponse } from "@/app/_types/medication/medication";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PetMedicationFormData,
  petMedicationFormSchema,
} from "@/app/pets/_lib/petMedicationFormSchema";
import { useState } from "react";
import { FormButton } from "@/app/_components/FormButton";
import { WeekdaySelector } from "./WeekdaySelector";

export const PetMedicationForm: React.FC = () => {
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const { data, isLoading } = useFetch<GetMedicationsResponse>(
    `/api/medications?all=true`,
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<PetMedicationFormData>({
    resolver: zodResolver(petMedicationFormSchema),
    defaultValues: {
      medicationId: "",
      dayType: undefined,
      weekdays: [],
      times: [],
    },
  });
  const dayType = watch("dayType");
  const timeOptions = [];
  for (let i = 0; i < 24; i++) {
    // numberからstringに変換し、文字列が2文字になるまで、先頭を "0" で埋める
    const hour = i.toString().padStart(2, "0");
    timeOptions.push(`${hour}:00`);
    timeOptions.push(`${hour}:30`);
  }
  const times = watch("times");
  const removeTime = (timeToRemove: string) => {
    const newTime = times.filter((time) => {
      return time !== timeToRemove;
    });
    setValue("times", newTime);
  };
  const onSubmit = (data: PetMedicationFormData) => {
    console.log("データ", data);
  };
  return (
    <div className="bg-lightPink min-h-screen flex justify-center items-start py-10">
      <div className="w-full flex justify-center text-textMain">
        <div className="w-full max-w-[350px] sm:max-w-[390px] md:max-w-[400px] lg:max-w-[420px] bg-white rounded-[16px] px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-8 lg:py-10">
          <div className="my-[10px]">
            <h1 className="text-heading1 text-center font-bold mb-[44px]">
              薬スケジュールを追加
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="w-full mb-0.5">
                <label className="text-small">薬の名前</label>
                <select
                  {...register("medicationId")}
                  className={`w-full h-[44px] border ${errors.medicationId ? "border-red-500" : "border-textMain"} rounded-[8px] px-2.5 py-2 mt-[4px] bg-white`}
                >
                  <option value="">選択してください</option>
                  {data?.medications.map((medication) => {
                    return (
                      <option key={medication.id} value={medication.id}>
                        {medication.name}
                      </option>
                    );
                  })}
                </select>
                {errors.medicationId ? (
                  <p className="h-[18px] mt-1 text-[12px] text-red-600 leading-tight">
                    {errors.medicationId?.message}
                  </p>
                ) : (
                  <p className="h-[18px] mt-1 text-[12px] invisible leading-tight">
                    placeholder
                  </p>
                )}
              </div>
              <div className="w-full mb-0.5">
                <label className="text-small">頻度</label>
                <select
                  {...register("dayType")}
                  className={`w-full h-[44px] border ${errors.dayType ? "border-red-500" : "border-textMain"} rounded-[8px] px-2.5 py-2 mt-[4px] bg-white`}
                >
                  <option value="">選択してください</option>
                  <option value="DAILY">毎日</option>
                  <option value="WEEKLY">曜日指定</option>
                </select>
                {errors.dayType ? (
                  <p className="h-[18px] mt-1 text-[12px] text-red-600 leading-tight">
                    {errors.dayType?.message}
                  </p>
                ) : (
                  <p className="h-[18px] mt-1 text-[12px] invisible leading-tight">
                    placeholder
                  </p>
                )}
              </div>
              {/* dayTypeがWEEKLY(曜日指定)なら、曜日を表示 */}
              {dayType === "WEEKLY" && (
                <WeekdaySelector
                  value={watch("weekdays")}
                  onChange={(days) =>
                    setValue("weekdays", days, {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                  error={errors.weekdays?.message}
                />
              )}
              <div className="relative mb-0.5">
                <label className="text-small">時間</label>
                <button
                  type="button"
                  onClick={() => {
                    setIsTimeOpen(!isTimeOpen);
                  }}
                  className={`flex flex-wrap items-center gap-2 w-full min-h-[44px] border rounded-[8px] px-2.5 py-2 mt-[4px]
    ${errors.times ? "border-red-500" : "border-textMain"}`}
                >
                  {/* 選択した時間 */}
                  {/* timesは配列 */}
                  {times.length > 0
                    ? times.map((time) => {
                        return (
                          <span
                            key={time}
                            className="px-2 py-1 bg-gray-200 rounded-full"
                          >
                            {time}
                            <span
                              onClick={(e) => {
                                // ×をクリックしたイベントを親まで伝えない
                                e.stopPropagation();
                                removeTime(time);
                              }}
                            >
                              {" "}
                              ×
                            </span>
                          </span>
                        );
                      })
                    : "選択してください"}
                </button>
                {isTimeOpen && (
                  <div className="absolute w-full max-h-60 overflow-y-auto bg-white border border-textMain rounded-[8px]">
                    {/* 時間一覧 */}
                    {timeOptions.map((timeOption) => {
                      return (
                        <label
                          key={timeOption}
                          className="flex items-center gap-2 px-3 py-2"
                        >
                          <input
                            type="checkbox"
                            value={timeOption}
                            {...register("times")}
                          />
                          {timeOption}
                        </label>
                      );
                    })}
                  </div>
                )}
                {errors.times ? (
                  <p className="h-[18px] mt-1 text-[12px] text-red-600 leading-tight">
                    {errors.times.message}
                  </p>
                ) : (
                  <p className="h-[18px] mt-1 text-[12px] invisible leading-tight">
                    placeholder
                  </p>
                )}
              </div>
              <div className="mt-[26px] flex justify-center">
                <FormButton text="追加する" variant="secondary" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

"use client";

import { useFetch } from "@/app/_hooks/useFetch";
import { GetMedicationsResponse } from "@/app/_types/medication/medication";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PetMedicationFormData,
  petMedicationFormSchema,
} from "@/app/pets/_lib/petMedicationFormSchema";
import { FormButton } from "@/app/_components/FormButton";
import { WeekdaySelector } from "./WeekdaySelector";
import { TimeSelector } from "./TimeSelector";
import { FormSelect } from "./FormSelect";

type PetMedicationFormProps = {
  petId: number;
};

export const PetMedicationForm: React.FC<PetMedicationFormProps> = ({
  petId,
}) => {
  const { data, isLoading } = useFetch<GetMedicationsResponse>(
    `/api/medications?all=true`,
  );
  // GETした薬のデータを子が受け取れる形に変換
  const medicationOptions =
    data?.medications.map((medication) => {
      return { value: String(medication.id), label: medication.name };
    }) ?? [];
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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
  const onSubmit = async (data: PetMedicationFormData) => {
    try {
    } catch (error) {}
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
              <FormSelect
                label="薬の名前"
                options={medicationOptions}
                {...register("medicationId")}
                error={errors.medicationId?.message}
                disabled={isSubmitting || isLoading}
              />
              <FormSelect
                label="頻度"
                options={[
                  { value: "DAILY", label: "毎日" },
                  { value: "WEEKLY", label: "曜日指定" },
                ]}
                {...register("dayType")}
                error={errors.dayType?.message}
                disabled={isSubmitting}
              />

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
                  disabled={isSubmitting}
                  error={errors.weekdays?.message}
                />
              )}
              <TimeSelector
                value={watch("times")}
                onChange={(selectedTimes) =>
                  setValue("times", selectedTimes, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
                disabled={isSubmitting}
                error={errors.times?.message}
              />
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

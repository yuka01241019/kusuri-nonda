"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  medicationFormSchema,
  medicationFormData,
  Form,
} from "../_lib/medicationFormSchema";
import { FormInput } from "@/app/_components/FormInput";
import { useRouter } from "next/navigation";
import { MedicationShapeSelector } from "./MedicationShapeSelector";
import { FormButton } from "@/app/_components/FormButton";
import toast from "react-hot-toast";
import { useCreateMedication } from "../_hooks/useCreateMedication";
import { MedicationColorSelector } from "./MedicationColorSelector";

export const MedicationForm: React.FC = () => {
  const { createMedication } = useCreateMedication();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<medicationFormData>({
    resolver: zodResolver(medicationFormSchema),
    defaultValues: {
      name: "",
      form: undefined,
      color: undefined,
    },
  });
  const formValue = watch("form");
  const showColor = formValue === Form.TABLET || formValue === Form.ROUNDTABLET;
  //ROUNDTABLET なら"roundTablet" それ以外(TABLET時)は "TABLET"
  const mode: "tablet" | "roundTablet" =
    formValue === Form.ROUNDTABLET ? "roundTablet" : "tablet";
  const onSubmit = async (data: medicationFormData) => {
    const toastId = toast.loading("登録中です…");
    try {
      await createMedication(data);
      toast.success("薬を登録しました！", { id: toastId });
      router.push("/medications");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, { id: toastId });
      } else {
        toast.error("予期せぬエラーが発生しました", { id: toastId });
      }
    }
  };
  return (
    <div className="bg-lightPink min-h-screen flex justify-center items-start py-10">
      <div className="w-full flex justify-center text-textMain">
        <div className="w-full max-w-[350px] sm:max-w-[390px] md:max-w-[400px] lg:max-w-[420px] bg-white rounded-[16px] px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-8 lg:py-10">
          <div className="my-[10px]">
            <h1 className="text-heading1 text-center font-bold mb-[44px]">
              薬を登録
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="w-full max-w-[390px]">
                <FormInput
                  id="medicationName"
                  label="薬の名前"
                  {...register("name")}
                  className="w-full bg-white"
                  error={errors.name?.message}
                  disabled={isSubmitting}
                />
                <MedicationShapeSelector
                  label="薬の形"
                  value={watch("form")}
                  onChange={(val) => {
                    setValue("form", val, { shouldValidate: true });
                    //TABLET/ROUNDTABLET以外が選ばれたら色は不要なのでクリア
                    if (val !== Form.TABLET && val !== Form.ROUNDTABLET) {
                      setValue("color", undefined, { shouldValidate: true });
                    }
                  }}
                />
                {showColor && (
                  <MedicationColorSelector
                    mode={mode}
                    label="薬の色"
                    value={watch("color")}
                    onChange={(c) =>
                      setValue("color", c, { shouldValidate: true })
                    }
                    error={errors.color?.message}
                    disabled={isSubmitting}
                  />
                )}
                <div className="mt-[26px] flex justify-center">
                  <FormButton
                    text="登録"
                    variant="secondary"
                    showIcon={false}
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

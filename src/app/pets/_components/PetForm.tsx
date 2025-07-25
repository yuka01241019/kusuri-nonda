"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { petFormSchema, PetFormData } from "../_lib/petFormSchema";
import { FormInput } from "@/app/_components/FormInput";
import { FormButton } from "@/app/_components/FormButton";
import { PetFormSelect } from "../_components/PetFormSelect";
import { PetFormDateInput } from "./PetFormDateInput";
import { useCreatePet } from "../_hooks/useCreatePet";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { PetImageUpload } from "./PetImageUpload";

export const PetForm: React.FC = () => {
  const { createPet } = useCreatePet();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<PetFormData>({
    resolver: zodResolver(petFormSchema),
    defaultValues: {
      name: "",
      species: "",
      gender: null,
      birthday: null,
      adoptedAt: null,
      imagePath: "",
    },
  });
  const onSubmit = async (data: PetFormData) => {
    const toastId = toast.loading("登録中です…");
    try {
      await createPet({
        ...data,
        gender: data.gender === "" ? null : data.gender,
      });
      toast.success("ペットを登録しました！", { id: toastId });
      router.push("/dashboard");
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
        <div className="w-full max-w-[380px] sm:max-w-[420px] md:max-w-[430px] lg:max-w-[450px] bg-white rounded-[16px] px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-8 lg:py-10">
          <div className="my-[10px]">
            <h1 className="text-heading1 text-center font-bold mb-[44px]">
              ペットを登録
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="w-full max-w-[390px]">
                <PetImageUpload
                  imagePath={watch("imagePath")}
                  onChange={(key) => setValue("imagePath", key)}
                  error={errors.imagePath?.message}
                  disabled={isSubmitting}
                />
                <input type="hidden" {...register("imagePath")} />

                <FormInput
                  id="name"
                  label="名前"
                  {...register("name")}
                  error={errors.name?.message}
                  disabled={isSubmitting}
                />
                <PetFormSelect
                  label="ペットの種類"
                  options={["いぬ", "ねこ", "うさぎ", "ハムスター", "その他"]}
                  {...register("species")}
                  error={errors.species?.message}
                  disabled={isSubmitting}
                />
                <PetFormSelect
                  label="性別"
                  placeholder="設定なし"
                  options={["おとこのこ♂", "おんなのこ♀"]}
                  {...register("gender")}
                  error={errors.gender?.message}
                  disabled={isSubmitting}
                />
                <PetFormDateInput
                  label="誕生日"
                  value={watch("birthday")}
                  onChange={(val) => setValue("birthday", val)}
                  error={errors.birthday?.message}
                  disabled={isSubmitting}
                />
                <PetFormDateInput
                  label="お迎えした日"
                  value={watch("adoptedAt")}
                  onChange={(val) => setValue("adoptedAt", val)}
                  error={errors.adoptedAt?.message}
                  disabled={isSubmitting}
                />
              </div>
              <div className="mt-[26px] flex justify-center">
                <FormButton text="登録する" disabled={isSubmitting} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

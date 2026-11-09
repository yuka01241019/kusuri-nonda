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
import PowIcon from "@assets/icons/auth/pow.svg";
import { useState } from "react";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/utils/supabase";

export const PetForm: React.FC = () => {
  // 画像ファイルを管理
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { session } = useSupabaseSession();
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
      imagePath: null,
    },
  });
  const onSubmit = async (data: PetFormData) => {
    const toastId = toast.loading("登録中です…");
    // 最初は画像パスなし
    let imagePath: string | null = null;
    let isPetCreated = false;
    try {
      // 画像が選択されている場合だけアップロード処理
      if (selectedFile) {
        // userIDを取得
        const userId = session?.user.id;
        // userIdが存在しない場合はエラーを発生させる
        if (!userId) {
          throw new Error("ログイン情報を取得できませんでした");
        }
        // あればfilePathを作成して次の処理へ進む
        const filePath = `${userId}/${uuidv4()}`;
        const { error: uploadError } = await supabase.storage
          .from("pet-imageurl")
          .upload(filePath, selectedFile);
        if (uploadError) {
          console.error(uploadError);
          throw new Error("画像のアップロードに失敗しました");
        }
        imagePath = filePath;
      }
      await createPet({
        ...data,
        gender: data.gender === "" ? null : data.gender,
        imagePath: imagePath,
      });
      isPetCreated = true;
      toast.success("ペットを登録しました！", { id: toastId });
      router.push("/dashboard");
    } catch (error) {
      // 画像パスが存在していて、かつペット登録が成功していない場合Storageから削除する
      if (imagePath && !isPetCreated) {
        try {
          const { error: removeError } = await supabase.storage
            .from("pet-imageurl")
            .remove([imagePath]);
          if (removeError) {
            console.error("画像の削除に失敗しました:", removeError);
          }
        } catch (removeError) {
          console.error("画像の削除中に例外が発生しました:", removeError);
        }
      }
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
                  onChange={(file) => setSelectedFile(file)}
                  error={errors.imagePath?.message}
                  disabled={isSubmitting}
                  selectedFile={selectedFile}
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
                <FormButton
                  text="登録する"
                  variant="primary"
                  icon={<PowIcon />}
                  showIcon={true}
                  disabled={isSubmitting}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

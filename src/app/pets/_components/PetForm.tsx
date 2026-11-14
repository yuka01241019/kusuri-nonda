"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { petFormSchema, PetFormData } from "../_lib/petFormSchema";
import { FormInput } from "@/app/_components/FormInput";
import { FormButton } from "@/app/_components/FormButton";
import { PetFormSelect } from "../_components/PetFormSelect";
import { PetFormDateInput } from "./PetFormDateInput";
import { createPet } from "../_lib/createPet";
import { updatePet } from "../_lib/updatePet";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { PetImageUpload } from "./PetImageUpload";
import PowIcon from "@assets/icons/auth/pow.svg";
import TrashIcon from "@assets/icons/trash.svg";
import { useState } from "react";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/utils/supabase";
import { Pet } from "@/app/_types/pet/pet";
import { AlertDialog } from "radix-ui";

// 編集時にペット情報を渡す
type PetFormProps = { mode: "create" } | { mode: "edit"; pet: Pet };

export const PetForm: React.FC<PetFormProps> = (props) => {
  // 画像ファイルを管理
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // 画像を削除する意思を管理するstate (初期値はfalse:削除予定なし true:保存時に画像を削除予定)
  const [isImageRemoved, setIsImageRemoved] = useState(false);
  const { session } = useSupabaseSession();
  const router = useRouter();
  // modeによる出し分け
  const isEdit = props.mode === "edit";
  const title = isEdit ? "ペットを編集" : "ペットを登録";
  const buttonText = isEdit ? "変更を保存する" : "登録する";
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<PetFormData>({
    resolver: zodResolver(petFormSchema),
    defaultValues: {
      name: isEdit ? props.pet.name : "",
      species: isEdit ? props.pet.species : "",
      gender:
        isEdit &&
        (props.pet.gender === "おとこのこ♂" ||
          props.pet.gender === "おんなのこ♀")
          ? props.pet.gender
          : null,
      birthday: isEdit ? props.pet.birthday : null,
      adoptedAt: isEdit ? props.pet.adoptedAt : null,
      imagePath: isEdit ? props.pet.imagePath : null,
    },
  });
  // 画像削除用
  const handleImageRemove = () => {
    setIsImageRemoved(true);
    setSelectedFile(null);
  };
  // フォーム送信処理用
  const onSubmit = async (data: PetFormData) => {
    const toastId = toast.loading(isEdit ? "保存中です…" : "登録中です…");
    // 登録時と編集時の両方に対応
    let imagePath: string | null = isEdit ? props.pet.imagePath : null;
    // 画像が削除予定なら、DBに保存する画像パスを null にする
    if (isImageRemoved) {
      imagePath = null;
    }
    let isPetSaved = false;
    // 新しくアップロードした画像のパス（登録・編集失敗時の削除用）
    let uploadedImagePath: string | null = null;
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
        // DB保存用と失敗時の削除用に、新しい画像パスを保持する
        imagePath = filePath;
        uploadedImagePath = filePath;
      }
      // POST・PUTで共通して使用するリクエストデータを作成
      const requestData = {
        ...data,
        // 性別が空文字 "" なら null に変換する。それ以外なら、選択した性別をそのまま使う
        gender: data.gender === "" ? null : data.gender,
        imagePath,
      };
      if (isEdit) {
        await updatePet(props.pet.id, requestData);
        isPetSaved = true;
        try {
          // 「新しい画像を選択した、または削除予定である」かつ「古い画像が存在する」場合だけ削除する
          if ((selectedFile || isImageRemoved) && props.pet.imagePath) {
            const { error: removeError } = await supabase.storage
              .from("pet-imageurl")
              // removeは削除したいファイルのパスは配列で渡す
              .remove([props.pet.imagePath]);
            if (removeError) {
              console.error("古い画像の削除に失敗しました:", removeError);
            }
          }
        } catch (removeError) {
          console.error("古い画像の削除中にエラーが発生しました:", removeError);
        }
      } else {
        await createPet(requestData);
        isPetSaved = true;
      }
      toast.success(
        isEdit ? "ペットを編集しました！" : "ペットを登録しました",
        { id: toastId },
      );
      router.push(isEdit ? `/pets/${props.pet.id}` : "/dashboard");
    } catch (error) {
      // 保存に失敗した場合、新しくアップロードした画像だけをStorageから削除する
      if (uploadedImagePath && !isPetSaved) {
        try {
          const { error: removeError } = await supabase.storage
            .from("pet-imageurl")
            .remove([uploadedImagePath]);
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
              {title}
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="w-full max-w-[390px]">
                <PetImageUpload
                  imagePath={watch("imagePath")}
                  // 選択した画像を保持し、既存画像の削除予定を取り消す
                  onChange={(file) => {
                    setSelectedFile(file);
                    setIsImageRemoved(false);
                  }}
                  onRemove={handleImageRemove}
                  error={errors.imagePath?.message}
                  disabled={isSubmitting}
                  selectedFile={selectedFile}
                  isImageRemoved={isImageRemoved}
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
              <div className="mt-[26px] flex flex-col items-center gap-3">
                <FormButton
                  text={buttonText}
                  variant="primary"
                  icon={<PowIcon />}
                  showIcon={true}
                  disabled={isSubmitting}
                />
                {isEdit && (
                  <AlertDialog.Root>
                    <AlertDialog.Trigger asChild>
                      <FormButton
                        type="button"
                        text="ペットを削除する"
                        variant="dangerText"
                        icon={<TrashIcon className="text-red-500" />}
                        showIcon={true}
                        disabled={isSubmitting}
                      />
                    </AlertDialog.Trigger>
                    <AlertDialog.Portal>
                      <AlertDialog.Overlay className="fixed inset-0 z-[80] bg-black/20" />
                      <AlertDialog.Content className="text-small fixed left-1/2 top-1/2 z-[90] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-[16px] bg-white p-6 shadow-lg">
                        <AlertDialog.Title>
                          {props.pet.name}を削除しますか？
                        </AlertDialog.Title>
                        <div className="mt-6 flex justify-center gap-4">
                          <AlertDialog.Cancel className="rounded-lg bg-gray-200 px-4 py-2 hover:opacity-80">
                            キャンセル
                          </AlertDialog.Cancel>
                          <AlertDialog.Action
                            // onClick={handleDelete}
                            className="rounded-lg bg-red-400 px-4 py-2 text-white hover:opacity-80"
                          >
                            削除する
                          </AlertDialog.Action>
                        </div>
                      </AlertDialog.Content>
                    </AlertDialog.Portal>
                  </AlertDialog.Root>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

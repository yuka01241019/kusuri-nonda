"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  familyFormSchema,
  FamilyFormData,
} from "@/app/_schemas/family/familyFormSchema";
import { Family } from "@/app/_types/family/family";
import { FAMILY_COLORS } from "@/app/_constants/familyColors";
import { FormInput } from "@/app/_components/FormInput";

// 編集時に家族情報を渡す
type FamilyMemberFormProps =
  | { mode: "create"; onSuccess: () => void }
  | { mode: "edit"; family: Family; onSuccess: () => void };

export const FamilyMemberForm: React.FC<FamilyMemberFormProps> = (props) => {
  // modeによる出し分け
  const isEdit = props.mode === "edit";
  const buttonText = isEdit ? "変更を保存する" : "登録する";
  // 新規登録・編集時のカラーの初期値を検証する
  const colorResult = familyFormSchema.shape.color.safeParse(
    isEdit ? props.family.color : FAMILY_COLORS[0],
  );
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<FamilyFormData>({
    resolver: zodResolver(familyFormSchema),
    defaultValues: {
      name: isEdit ? props.family.name : "",
      // カラーの検証に失敗した場合はデフォルトのピンクを使用
      color: colorResult.success ? colorResult.data : FAMILY_COLORS[0],
    },
  });
  // const onSubmit = async (data: FamilyFormData) => {};
  return (
    <div>
      <FormInput
        id="name"
        label="名前"
        {...register("name")}
        error={errors.name?.message}
        disabled={isSubmitting}
      />
    </div>
  );
};

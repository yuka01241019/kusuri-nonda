import { z } from "zod";

//ペット（登録/編集）用バリデーション設定
export const petFormSchema = z.object({
  name: z.string().min(1, "名前は必須です"),
  species: z.string().min(1, "ペットの種類を選択してください"),
  gender: z.union([
    z.literal("おとこのこ♂"),
    z.literal("おんなのこ♀"),
    z.literal(""),
    z.null(),
  ]),
  birthday: z.union([
    z.literal(""),
    z.string().min(1, "日付を選択してください"),
    z.null(),
  ]),
  adoptedAt: z.union([
    z.literal(""),
    z.string().min(1, "日付を選択してください"),
    z.null(),
  ]),
// 画像なしを null で扱えるよう変更
  imagePath: z.string().nullable().optional(),
});

export type PetFormData = z.infer<typeof petFormSchema>;

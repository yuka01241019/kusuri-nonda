import { z } from "zod";

//ペット（登録/編集）用バリデーション設定
export const petFormSchema = z.object({
  name: z.string().min(1, "名前は必須です"),
  species: z.string().min(1, "ペットの種類を選択してください"),
  gender: z.union([
    z.literal("おとこのこ♂"),
    z.literal("おんなのこ♀"),
    z.literal(""),
  ]),
  birthday: z.union([
    z.literal(""),
    z.string().min(1, "日付を選択してください"),
  ]),
  adoptedAt: z.union([
    z.literal(""),
    z.string().min(1, "日付を選択してください"),
  ]),

  imageUrl: z.string().optional(),
});

export type PetFormData = z.infer<typeof petFormSchema>;

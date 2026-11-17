import { z } from "zod";
import { FAMILY_COLORS } from "@/app/_constants/familyColors";

export const familyFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "名前は必須です")
    .max(20, "名前は20文字以内で入力してください"),
  color: z.enum(FAMILY_COLORS, {
    errorMap: () => ({ message: "カラーを選択してください" }),
  }),
});

export type FamilyFormData = z.infer<typeof familyFormSchema>;

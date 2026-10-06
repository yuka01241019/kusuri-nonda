import { z } from "zod";

// ペット服薬スケジュール（登録/編集）用バリデーション設定
export const petMedicationFormSchema = z
  .object({
    medicationId: z.string().min(1, "薬を選択してください"),
    dayType: z.string().min(1, "頻度を選択してください"),
    weekdays: z.array(z.string()),
    times: z.array(z.string()).min(1, "時間を選択してください"),
  })
  // DAILYは曜日未選択でも可、WEEKLYの場合は曜日を1つ以上選択必須にする
  .refine(
    (data) => {
      return data.dayType !== "WEEKLY" || data.weekdays.length > 0;
    },
    { message: "曜日を選択してください", path: ["weekdays"] },
  );

export type PetMedicationFormData = z.infer<typeof petMedicationFormSchema>;

import { z } from "zod";
import { DayType, Weekday } from "@prisma/client";

// POSTとPUTで共通する4項目を定義する基本スキーマ
export const baseMedicationScheduleSchema = z.object({
  // 安全な整数の範囲内にある、0より大きい数値だけ許可する
  medicationId: z.number().int().safe().positive(),
  // enumの値であること
  dayType: z.nativeEnum(DayType),
  // 配列及び各要素が正しい曜日であること
  weekdays: z.array(z.nativeEnum(Weekday)),
  // 時間選択が配列であること、各要素が HH:mm 形式の文字列であること、配列に1件以上の時間があること
  times: z.array(z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/)).min(1),
});

// 服薬頻度に応じて、曜日の指定が正しいかチェックする共通関数
const validateMedicationScheduleDays = (
  data: z.infer<typeof baseMedicationScheduleSchema>,
) => {
  if (data.dayType === DayType.WEEKLY) {
    return data.weekdays.length > 0;
  }
  // 毎日服薬する場合、曜日が指定されていないこと
  if (data.dayType === DayType.DAILY) {
    return data.weekdays.length === 0;
  }
  // どちらの条件にも該当しない場合の戻り値
  return true;
};

// 基本スキーマに petId を追加した新規登録用スキーマ
export const createMedicationScheduleSchema = baseMedicationScheduleSchema
  .extend({
    // 安全な整数の範囲内にある、0より大きい数値だけ許可する
    petId: z.number().int().safe().positive(),
  })
  .refine(validateMedicationScheduleDays);

// 基本スキーマを利用した編集用スキーマ
export const updateMedicationScheduleSchema =
  baseMedicationScheduleSchema.refine(validateMedicationScheduleDays);

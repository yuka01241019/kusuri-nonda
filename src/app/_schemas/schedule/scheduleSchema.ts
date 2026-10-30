import { z } from "zod";
import { DayType, Weekday } from "@prisma/client";

export const createMedicationScheduleSchema = z
  .object({
    // 安全な整数の範囲内にある、0より大きい数値だけ許可する
    petId: z.number().int().safe().positive(),
    medicationId: z.number().int().safe().positive(),
    // enumの値であること
    dayType: z.nativeEnum(DayType),
    // 配列及び各要素が正しい曜日であること
    weekdays: z.array(z.nativeEnum(Weekday)),
    // 時間選択が配列であること、各要素が HH:mm 形式の文字列であること、配列に1件以上の時間があること
    times: z.array(z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/)).min(1),
  })
  .refine((data) => {
    // 曜日指定の場合、曜日が1つ以上選択されていること
    if (data.dayType === DayType.WEEKLY) {
      return data.weekdays.length > 0;
    }
    // 毎日服薬する場合、曜日が指定されていないこと
    if (data.dayType === DayType.DAILY) {
      return data.weekdays.length === 0;
    }
    // どちらの条件にも該当しない場合の戻り値
    return true;
  });

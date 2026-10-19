import { DayType, Weekday } from "@prisma/client";

// サーバーから返ってくるデータ（レスポンス）
export type MedicationSchedule = {
  id: number;
  petId: number;
  dayType: DayType;
  weekdays: Weekday[];
};

// POSTのレスポンス
export type PostMedicationScheduleResponse = {
  message: string;
  medicationSchedule: MedicationSchedule;
};

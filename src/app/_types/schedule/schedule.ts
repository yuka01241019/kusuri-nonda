import { Color, DayType, Form, Weekday } from "@prisma/client";
import { Medication } from "../medication/medication";

// サーバーから返ってくるデータ（レスポンス）
export type MedicationSchedule = {
  id: number;
  petId: number;
  dayType: DayType;
  weekdays: Weekday[];
};

// GET APIで取得する薬スケジュール1件分のデータ
export type MedicationScheduleWithDetails = {
  id: number;
  dayType: DayType;
  weekdays: Weekday[];
  medicationScheduleLinks: {
    medication: { name: string; form: Form; color: Color | null };
  }[];
  medicationScheduleTimes: { time: string }[];
};

// POSTのレスポンス
export type PostMedicationScheduleResponse = {
  message: string;
  medicationSchedule: MedicationSchedule;
};

// GET APIのレスポンス（ペット1匹の薬スケジュール一覧）
export type GetMedicationSchedulesResponse = {
  message: string;
  schedules: MedicationScheduleWithDetails[];
};

// PUTの服薬スケジュール情報
export type MedicationScheduleForEdit = {
  id: number;
  dayType: DayType;
  weekdays: Weekday[];
  medicationScheduleLinks: { medication: { id: number; name: string } }[];
  medicationScheduleTimes: { time: string }[];
};

// 個別GETのレスポンス（1件の薬スケジュール）
export type GetMedicationScheduleResponse = {
  message: string;
  schedule: MedicationScheduleForEdit;
};

// DELETEのレスポンス
export type DeleteMedicationScheduleResponse = {
  message: string;
};

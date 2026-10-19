import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma";
import { handleApiError } from "@/utils/handleApiError";
import { supabase } from "@/utils/supabase";
import { DayType, Weekday } from "@prisma/client";
import { PostMedicationScheduleResponse } from "@/app/_types/schedule/schedule";
import { createMedicationScheduleSchema } from "./scheduleSchema";

export type CreateMedicationScheduleRequest = {
  petId: number;
  medicationId: number;
  dayType: DayType;
  weekdays: Weekday[];
  times: string[];
};

// 薬スケジュール新規登録API
export const POST = async (request: NextRequest) => {
  const token = request.headers.get("Authorization") ?? "";
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data?.user) {
    return NextResponse.json(
      { message: "承認に失敗しました" },
      { status: 401 },
    );
  }
  try {
    const dbUser = await prisma.user.findUnique({
      where: { supabaseUserId: data.user.id },
    });
    if (!dbUser) {
      return NextResponse.json(
        { message: "ユーザーが見つかりません" },
        { status: 400 },
      );
    }
    const body = await request.json();
    const result = createMedicationScheduleSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { message: "入力内容が正しくありません" },
        { status: 400 },
      );
    }
    // Zodでバリデーション済みのデータを取り出す
    const { petId, medicationId, dayType, weekdays, times } = result.data;
    // 指定されたペットがログインユーザーのものか確認
    const pet = await prisma.pet.findFirst({
      where: { id: petId, userId: dbUser.id },
    });
    if (!pet) {
      return NextResponse.json(
        { message: "ペットが見つかりません" },
        { status: 400 },
      );
    }
    // 指定された薬がログインユーザーのものか確認
    const medication = await prisma.medication.findFirst({
      where: { id: medicationId, userId: dbUser.id },
    });
    if (!medication) {
      return NextResponse.json(
        { message: "薬が見つかりません" },
        { status: 400 },
      );
    }
    // timesをPrismaに渡せる形に変換
    const scheduleTimes = times.map((time) => {
      return { time };
    });
    const medicationSchedule = await prisma.medicationSchedule.create({
      data: {
        petId,
        dayType,
        weekdays,
        medicationScheduleTimes: { create: scheduleTimes },
        medicationScheduleLinks: { create: { medicationId } },
      },
      select: { id: true, petId: true, dayType: true, weekdays: true },
    });
    return NextResponse.json<PostMedicationScheduleResponse>(
      { message: "服薬スケジュールを登録しました", medicationSchedule },
      { status: 200 },
    );
  } catch (error) {
    return handleApiError(error);
  }
};

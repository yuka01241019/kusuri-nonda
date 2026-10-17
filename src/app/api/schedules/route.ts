import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma";
import { handleApiError } from "@/utils/handleApiError";
import { supabase } from "@/utils/supabase";
import { DayType, Weekday } from "@prisma/client";
import { PostMedicationScheduleResponse } from "@/app/_types/schedule/schedule";

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
    const {
      petId,
      medicationId,
      dayType,
      weekdays,
      times,
    }: CreateMedicationScheduleRequest = body;
    if (!Number.isSafeInteger(petId) || petId <= 0) {
      return NextResponse.json(
        { message: "ペットのIDが正しくありません" },
        { status: 400 },
      );
    }
    if (!Number.isSafeInteger(medicationId) || medicationId <= 0) {
      return NextResponse.json(
        { message: "薬のIDが正しくありません" },
        { status: 400 },
      );
    }
    if (dayType !== DayType.DAILY && dayType !== DayType.WEEKLY) {
      return NextResponse.json(
        { message: "服薬日の指定が正しくありません" },
        { status: 400 },
      );
    }
    // 曜日選択が配列かどうかチェック
    if (!Array.isArray(weekdays)) {
      return NextResponse.json(
        { message: "曜日の指定が正しくありません" },
        { status: 400 },
      );
    }
    // 曜日がすべてWeekdayのenumに含まれているか確認
    if (
      !weekdays.every((day) => {
        return Object.values(Weekday).includes(day);
      })
    ) {
      return NextResponse.json(
        { message: "正しい曜日を指定してください" },
        { status: 400 },
      );
    }
    // 時間選択が配列かどうかチェック
    if (!Array.isArray(times)) {
      return NextResponse.json(
        { message: "時間の指定が正しくありません" },
        { status: 400 },
      );
    }
    // 配列なら、要素が0件ではないか確認する
    if (times.length === 0) {
      return NextResponse.json(
        { message: "服薬時間を1つ以上指定してください" },
        { status: 400 },
      );
    }
    // すべての服薬時間が正しい形式（HH:mm）か正規表現で確認
    const timePattern = /^([01]\d|2[0-3]):[0-5]\d$/;
    if (
      !times.every((time) => {
        return typeof time === "string" && timePattern.test(time);
      })
    ) {
      return NextResponse.json(
        { message: "正しい時間を選択してください" },
        { status: 400 },
      );
    }
    // 曜日指定の場合、曜日が1つ以上選択されているか確認
    if (dayType === DayType.WEEKLY && weekdays.length === 0) {
      return NextResponse.json(
        { message: "服薬する曜日を1つ以上選択してください" },
        { status: 400 },
      );
    }
    // 毎日服薬する場合、曜日が指定されていないか確認
    if (dayType === DayType.DAILY && weekdays.length > 0) {
      return NextResponse.json(
        { message: "毎日服薬する場合は曜日を指定できません" },
        { status: 400 },
      );
    }
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

import { prisma } from "@/app/_lib/prisma";
import { DeleteMedicationScheduleResponse } from "@/app/_types/schedule/schedule";
import { handleApiError } from "@/utils/handleApiError";
import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

// 薬服用スケジュール個別削除API
export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string; scheduleId: string } },
) => {
  const { id, scheduleId: scheduleIdParam } = params;
  const token = request.headers.get("Authorization") ?? "";
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data?.user) {
    return NextResponse.json(
      { message: "認証に失敗しました" },
      { status: 401 },
    );
  }
  try {
    const dbUser = await prisma.user.findUnique({
      where: { supabaseUserId: data.user.id },
    });
    if (!dbUser) {
      return NextResponse.json(
        {
          message: "ユーザーが見つかりません",
        },
        { status: 400 },
      );
    }
    const petId = Number(id);
    const scheduleId = Number(scheduleIdParam);
    if (!Number.isSafeInteger(petId) || petId <= 0) {
      return NextResponse.json(
        { message: "ペットIDが正しくありません" },
        { status: 400 },
      );
    }
    if (!Number.isSafeInteger(scheduleId) || scheduleId <= 0) {
      return NextResponse.json(
        { message: "スケジュールIDが正しくありません" },
        { status: 400 },
      );
    }
    const result = await prisma.medicationSchedule.findFirst({
      where: { id: scheduleId, petId: petId, pet: { userId: dbUser.id } },
    });
    if (!result) {
      return NextResponse.json(
        { message: "スケジュールが見つかりません" },
        { status: 404 },
      );
    }
    await prisma.medicationSchedule.delete({
      where: { id: scheduleId, petId: petId, pet: { userId: dbUser.id } },
    });
    return NextResponse.json<DeleteMedicationScheduleResponse>(
      { message: "スケジュールを削除しました" },
      { status: 200 },
    );
  } catch (error) {
    return handleApiError(error);
  }
};

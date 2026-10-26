import { prisma } from "@/app/_lib/prisma";
import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";
import { handleApiError } from "@/utils/handleApiError";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } },
) => {
  const { id } = params;
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
        { message: "ユーザーが見つかりません" },
        { status: 400 },
      );
    }
    const petId = Number(id);
    if (!Number.isSafeInteger(petId) || petId <= 0) {
      return NextResponse.json(
        { message: "ペットIDが正しくありません" },
        { status: 400 },
      );
    }
    const pet = await prisma.pet.findFirst({
      where: { id: petId, userId: dbUser.id },
    });
    if (!pet) {
      return NextResponse.json(
        { message: "ペットが見つかりません" },
        { status: 404 },
      );
    }
    const schedules = await prisma.medicationSchedule.findMany({
      where: { petId },
      select: {
        id: true,
        dayType: true,
        weekdays: true,
        medicationScheduleLinks: {
          select: {
            medication: { select: { name: true, form: true, color: true } },
          },
        },
        medicationScheduleTimes: { select: { time: true } },
      },
    });
    return NextResponse.json(
      { message: "スケジュールを取得しました", schedules },
      { status: 200 },
    );
  } catch (error) {
    return handleApiError(error);
  }
};

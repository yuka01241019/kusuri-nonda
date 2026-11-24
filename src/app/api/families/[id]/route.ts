import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma";
import { handleApiError } from "@/utils/handleApiError";
import { supabase } from "@/utils/supabase";
import { familyFormSchema } from "@/app/_schemas/family/familyFormSchema";
import {
  PutFamilyResponse,
  DeleteFamilyResponse,
} from "@/app/_types/family/family";

// 家族編集API
export const PUT = async (
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
    const familyId = Number(id);
    if (!Number.isSafeInteger(familyId) || familyId <= 0) {
      return NextResponse.json(
        { message: "家族のIDが正しくありません" },
        { status: 400 },
      );
    }
    // 家族がログインユーザーのものか確認（PUT APIにリクエスト時）
    const existingFamily = await prisma.family.findFirst({
      where: { id: familyId, userId: dbUser.id },
    });
    if (!existingFamily) {
      return NextResponse.json(
        { message: "家族が見つかりません" },
        { status: 404 },
      );
    }
    // 家族の存在確認後にリクエストボディを取得
    const body = await request.json();
    const result = familyFormSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { message: "入力内容が正しくありません" },
        { status: 400 },
      );
    }
    const { name, color } = result.data;
    const family = await prisma.family.update({
      where: { id: familyId, userId: dbUser.id },
      data: { name, color },
      select: { id: true, name: true, color: true },
    });
    return NextResponse.json<PutFamilyResponse>(
      { message: "家族を編集しました", family },
      { status: 200 },
    );
  } catch (error) {
    return handleApiError(error);
  }
};

// 家族削除API
export const DELETE = async (
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
    const familyId = Number(id);
    if (!Number.isSafeInteger(familyId) || familyId <= 0) {
      return NextResponse.json(
        { message: "家族のIDが正しくありません" },
        { status: 400 },
      );
    }
    const family = await prisma.family.findFirst({
      where: { id: familyId, userId: dbUser.id },
    });
    if (!family) {
      return NextResponse.json(
        { message: "家族が見つかりません" },
        { status: 404 },
      );
    }
    await prisma.family.delete({ where: { id: familyId, userId: dbUser.id } });
    return NextResponse.json<DeleteFamilyResponse>(
      { message: "家族情報を削除しました" },
      { status: 200 },
    );
  } catch (error) {
    return handleApiError(error);
  }
};

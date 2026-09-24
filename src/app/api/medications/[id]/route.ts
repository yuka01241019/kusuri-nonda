import { prisma } from "@/app/_lib/prisma";
import { handleApiError } from "@/utils/handleApiError";
import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

//薬削除API
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
        {
          message: "ユーザーが見つかりません",
        },
        { status: 400 },
      );
    }
    //  薬のIDを数値に変換し、正しいIDか確認する
    const medicationId = Number(id);
    if (!Number.isSafeInteger(medicationId) || medicationId <= 0) {
      return NextResponse.json(
        { message: "薬のIDが正しくありません" },
        { status: 400 },
      );
    }
    // ログイン中のユーザーが登録した薬を削除する
    const result = await prisma.medication.deleteMany({
      where: { id: medicationId, userId: dbUser.id },
    });
    // 削除件数が0件だったらエラーを返す
    if (result.count === 0) {
      return NextResponse.json(
        { message: "薬が見つかりません" },
        { status: 404 },
      );
    }
    return NextResponse.json({ message: "薬を削除しました" });
  } catch (error) {
    return handleApiError(error);
  }
};

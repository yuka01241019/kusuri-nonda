import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma";
import { handleApiError } from "@/utils/handleApiError";
import { supabase } from "@/utils/supabase";
import { familyFormSchema } from "@/app/_schemas/family/familySchema";
import { PostFamilyResponse } from "@/app/_types/family/family";

// 家族新規登録API
export const POST = async (request: NextRequest) => {
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
    const body = await request.json();
    const result = familyFormSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { message: "入力内容が正しくありません" },
        { status: 400 },
      );
    }
    const { name, color } = result.data;
    const family = await prisma.family.create({
      data: { userId: dbUser.id, name, color },
      select: { id: true, name: true, color: true },
    });
    return NextResponse.json<PostFamilyResponse>(
      { message: "家族を登録しました", family },
      { status: 200 },
    );
  } catch (error) {
    return handleApiError(error);
  }
};

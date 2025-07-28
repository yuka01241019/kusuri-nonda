import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma";
import { CreateUserRequest } from "@/app/_types/user/CreateUser";
import { handleApiError } from "@/utils/handleApiError ";
import { supabase } from "@/utils/supabase";

//ユーザー新規作成API
export const POST = async (request: NextRequest) => {
  const token = request.headers.get("Authorization") ?? "";
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data?.user) {
    return NextResponse.json(
      { message: error?.message || "認証に失敗しました" },
      { status: 400 }
    );
  }
  try {
    const { supabaseUserId }: CreateUserRequest = await request.json();
    //すでに存在するか確認（重複登録防止）
    const existingUser = await prisma.user.findUnique({
      where: { supabaseUserId },
    });
    if (existingUser) {
      return NextResponse.json(
        { message: "すでに登録されています" },
        { status: 200 }
      );
    }
    const user = await prisma.user.create({
      data: { supabaseUserId },
    });
    return NextResponse.json(
      { message: "新規作成しました", user },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error);
  }
};

//登録ユーザー取得API
export const GET = async (request: NextRequest) => {
  const token = request.headers.get("Authorization") ?? "";
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data?.user) {
    return NextResponse.json(
      { message: error?.message || "認証に失敗しました" },
      { status: 400 }
    );
  }
  try {
    const dbUser = await prisma.user.findUnique({
      where: { supabaseUserId: data.user.id },
    });
    if (!dbUser) {
      return NextResponse.json(
        { message: "ユーザーが見つかりません" },
        { status: 400 }
      );
    }
    return NextResponse.json({ user: dbUser }, { status: 200 });
  } catch (error) {
    return handleApiError(error);
  }
};

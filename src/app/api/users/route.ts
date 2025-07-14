import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma";
import { CreateUserRequest } from "@/app/_types/user/CreateUser";
import { handleApiError } from "@/utils/handleApiError ";

//ユーザー新規作成API
export const POST = async (request: NextRequest) => {
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
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    return handleApiError(error);
  }
};

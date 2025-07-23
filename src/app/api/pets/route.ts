import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma";
import { handleApiError } from "@/utils/handleApiError ";
import { supabase } from "@/utils/supabase";

//クライアント→APIに送られてくるデータ（リクエスト）
export type CreatePetRequest = {
  name: string;
  species: string;
  gender: "おとこのこ♂" | "おんなのこ♀" | null;
  birthday: string | null;
  adoptedAt: string | null;
  imagePath?: string;
};

//ペット登録API
export const POST = async (request: NextRequest) => {
  const token = request.headers.get("Authorization") ?? "";
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data?.user) {
    return NextResponse.json({ status: error?.message }, { status: 400 });
  }
  try {
    //SupabaseUserIdからユーザーを取得
    const dbUser = await prisma.user.findUnique({
      where: { supabaseUserId: data.user.id },
    });
    if (!dbUser) {
      return NextResponse.json(
        { message: "ユーザーが見つかりません" },
        { status: 400 }
      );
    }
    const body = await request.json();
    const {
      name,
      species,
      gender,
      birthday,
      adoptedAt,
      imagePath,
    }: CreatePetRequest = body;
    const pet = await prisma.pet.create({
      data: {
        userId: dbUser.id,
        name,
        species,
        gender,
        birthday: birthday ? new Date(birthday) : null,
        adoptedAt: adoptedAt ? new Date(adoptedAt) : null,
        imagePath,
      },
    });
    return NextResponse.json(
      { message: "ペットを登録しました", pet },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error);
  }
};

//ペット一覧取得API
export const GET = async (request: NextRequest) => {
  const token = request.headers.get("Authorization") ?? "";
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data?.user) {
    return NextResponse.json({ status: error?.message }, { status: 400 });
  }
  try {
    const pets = await prisma.pet.findMany({
      where: {
        user: {
          supabaseUserId: data.user.id,
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ pets }, { status: 200 });
  } catch (error) {
    return handleApiError(error);
  }
};

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma";
import { handleApiError } from "@/utils/handleApiError";
import { supabase } from "@/utils/supabase";
import { PostPetResponse, GetPetsResponse } from "@/app/_types/pet/pet";

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
        { status: 400 },
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
      select: {
        id: true,
        name: true,
        species: true,
        gender: true,
        birthday: true,
        adoptedAt: true,
        imagePath: true,
      },
    });
    // 日付をAPIレスポンス用の文字列に変換(Dateをstringに変換)
    const responsePet = {
      ...pet,
      birthday: pet.birthday?.toISOString() ?? null,
      adoptedAt: pet.adoptedAt?.toISOString() ?? null,
    };
    return NextResponse.json<PostPetResponse>(
      { message: "ペットを登録しました", pet: responsePet },
      { status: 200 },
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
      select: {
        id: true,
        name: true,
        species: true,
        gender: true,
        birthday: true,
        adoptedAt: true,
        imagePath: true,
      },
      orderBy: { createdAt: "desc" },
    });
    // 各ペットの日付を文字列に変換して、APIレスポンス用の新しい配列を作成
    const responsePets = pets.map((pet) => {
      return {
        ...pet,
        birthday: pet.birthday?.toISOString() ?? null,
        adoptedAt: pet.adoptedAt?.toISOString() ?? null,
      };
    });
    return NextResponse.json<GetPetsResponse>(
      { pets: responsePets },
      { status: 200 },
    );
  } catch (error) {
    return handleApiError(error);
  }
};

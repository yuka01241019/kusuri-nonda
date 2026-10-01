import { prisma } from "@/app/_lib/prisma";
import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";
import { handleApiError } from "@/utils/handleApiError";
import { GetPetResponse } from "@/app/_types/pet/pet";

// ペット個別取得API
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
        { message: "ペットのIDが正しくありません" },
        { status: 400 },
      );
    }
    const pet = await prisma.pet.findUnique({
      where: { id: petId, userId: dbUser.id },
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
    if (!pet) {
      return NextResponse.json(
        { message: "ペット情報が見つかりません" },
        { status: 404 },
      );
    }
    const responsePet = {
      ...pet,
      birthday: pet.birthday?.toISOString() ?? null,
      adoptedAt: pet.adoptedAt?.toISOString() ?? null,
    };
    return NextResponse.json<GetPetResponse>(
      { message: "ペット情報を取得しました", pet: responsePet },
      { status: 200 },
    );
  } catch (error) {
    return handleApiError(error);
  }
};

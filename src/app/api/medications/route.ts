import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma";
import { handleApiError } from "@/utils/handleApiError ";
import { supabase } from "@/utils/supabase";
import { Color } from "@/app/(main)/medications/_lib/medicationFormSchema";
import { Form } from "@/app/(main)/medications/_lib/medicationFormSchema";

export type CreateMedicationRequest = {
  name: string;
  form?: Form;
  color?: Color;
};

//薬新規登録API
export const POST = async (request: NextRequest) => {
  const token = request.headers.get("Authorization") ?? "";
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data?.user) {
    return NextResponse.json({ status: error?.message }, { status: 400 });
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
    const { name, form, color }: CreateMedicationRequest = body;
    if (!form) {
      return NextResponse.json(
        { message: "薬の形状が選択されていません" },
        { status: 400 },
      );
    }

    const medication = await prisma.medication.create({
      data: { userId: dbUser.id, name, form, color },
    });
    return NextResponse.json(
      { message: "薬を登録しました", medication },
      { status: 200 },
    );
  } catch (error) {
    return handleApiError(error);
  }
};

//薬一覧取得API
export const GET = async (request: NextRequest) => {
  const token = request.headers.get("Authorization") ?? "";
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data?.user) {
    return NextResponse.json({ status: error?.message }, { status: 400 });
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
    //URLからpageを取得
    //指定されていなければ1ページ目にする
    const page = parseInt(request.nextUrl.searchParams.get("page") ?? "1");
    //1ページあたりの件数
    const pageSize = 10;
    // 最初の何件を飛ばすか定義
    const skip = (page - 1) * pageSize;
    //薬一覧と薬の総件数を同時に取得
    const [medications, totalCount] = await Promise.all([
      prisma.medication.findMany({
        where: { userId: dbUser.id },
        orderBy: { createdAt: "desc" },
        skip,
        take: pageSize,
      }),
      prisma.medication.count({
        where: { userId: dbUser.id },
      }),
    ]);
    //全部で何ページあるか
    const totalPages = Math.ceil(totalCount / pageSize);
    return NextResponse.json(
      { medications, pagination: { page, pageSize, totalCount, totalPages } },
      { status: 200 },
    );
  } catch (error) {
    return handleApiError(error);
  }
};

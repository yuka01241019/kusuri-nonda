import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma";
import { handleApiError } from "@/utils/handleApiError ";
import { supabase } from "@/utils/supabase";
import { Color } from "@/app/medications/_lib/medicationFormSchema";
import { Form } from "@/app/medications/_lib/medicationFormSchema";

export type CreateMedicationRequest = {
  name: string;
  form: Form;
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
        { status: 400 }
      );
    }
    const body = await request.json();
    const { name, form, color }: CreateMedicationRequest = body;
    const medication = await prisma.medication.create({
      data: { userId: dbUser.id, name, form, color },
    });
    return NextResponse.json(
      { message: "薬を登録しました", medication },
      { status: 200 }
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
        { status: 400 }
      );
    }
    const medications = await prisma.medication.findMany({
      where: { userId: dbUser.id },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ medications }, { status: 200 });
  } catch (error) {
    return handleApiError(error);
  }
};

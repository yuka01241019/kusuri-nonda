import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma";
import { handleApiError } from "@/utils/handleApiError ";
import { supabase } from "@/utils/supabase";

export type CreateMedicationRequest = {
  name: string;
  form: "TABLET" | "ROUNDTABLET" | "EYEDROP" | "POWDER";
  color: string;
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
  } catch (error) {
    return handleApiError(error);
  }
};

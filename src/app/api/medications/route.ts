import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma";
import { handleApiError } from "@/utils/handleApiError ";
import { supabase } from "@/utils/supabase";

export type CreateMedicationRequest = {
  name: string;
  form: "TABLET" | "ROUNDTABLET" | "EYEDROP" | "POWDER";
  color: string;
};

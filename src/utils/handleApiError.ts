import { NextResponse } from "next/server";

export const handleApiError = (error: unknown) => {
  if (error instanceof Error) {
    console.error("API Error", error.message);
    return NextResponse.json(
      { message: error.message || "通信に失敗しました" },
      { status: 400 }
    );
  }
};

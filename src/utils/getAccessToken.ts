import { supabase } from "@/utils/supabase";

export const getAccessToken = async (): Promise<string> => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error || !session?.access_token) {
    throw new Error("ログイン情報が見つかりません");
  }
  return session.access_token;
};

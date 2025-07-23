"use client";

import { useSupabaseSession } from "@/app/_hooks/useSupabaseSettion";
import { supabase } from "@/utils/supabase";
import Link from "next/link";
import { useEffect, useState } from "react"; // ←追加

const AdminCheckPage: React.FC = () => {
  const { session, isLoading } = useSupabaseSession();
  const [accessToken, setAccessToken] = useState<string | null>(null); // ←追加

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };
  // アクセストークンを取得する処理
  useEffect(() => {
    const fetchToken = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("トークン取得エラー:", error.message);
        return;
      }
      const token = data.session?.access_token ?? null;
      setAccessToken(token);
    };
    if (session) fetchToken();
  }, [session]);
  return (
    <div className="p-4 text-center">
      <h1>認証チェックページ</h1>
      {isLoading && <p>セッション確認中</p>}
      {!isLoading &&
        (session ? (
          <>
            <p>ログイン済みです</p>

            {/* アクセストークン表示 */}
            {accessToken && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 break-all">
                  <strong>アクセストークン:</strong>
                  <br />
                  {accessToken}
                </p>
              </div>
            )}

            <button
              onClick={handleLogout}
              className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              ログアウト
            </button>
          </>
        ) : (
          <>
            <p>ログインしていません</p>
            <Link
              href="/login"
              className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              ログイン
            </Link>
          </>
        ))}
    </div>
  );
};

export default AdminCheckPage;

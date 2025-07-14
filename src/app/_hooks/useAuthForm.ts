"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";
import { AuthFormData, authSchema } from "../_lib/authSchema";
import { CreateUserRequest } from "../_types/user/CreateUser";
import toast from "react-hot-toast";

type Mode = "signup" | "login";

//認証関連のロジック（useForm,onSubmit,バリデーション）
export const useAuthForm = (mode: Mode) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    mode: "onSubmit",
  });
  const router = useRouter();
  const redirectUrl = process.env.NEXT_PUBLIC_REDIRECT_URL;
  const onSubmit = async (data: AuthFormData) => {
    const { email, password } = data;
    let error = null;
    //送信中トースト表示
    const toastId = toast.loading(
      mode === "signup" ? "登録中です..." : "ログイン中です..."
    );
    if (mode === "signup") {
      const res = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${redirectUrl}/login`,
        },
      });
      const { data: signUpData } = res;
      //ユーザーが正常に作成されたらUserテーブルにも登録
      if (signUpData?.user) {
        const body: CreateUserRequest = {
          supabaseUserId: signUpData.user.id,
        };
        try {
          await fetch("/api/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });
        } catch (error) {
          if (error instanceof Error) {
            console.error(
              "自作Userテーブルへの登録に失敗しました",
              error.message
            );
            toast.error(`ユーザー情報の登録に失敗しました:${error.message}`);
          } else {
            console.error("予期せぬエラーが発生しました", error);
            toast.error("予期せぬエラーが発生しました");
          }
        }
      }
    } else if (mode === "login") {
      const res = await supabase.auth.signInWithPassword({ email, password });
      error = res.error;
    }
    if (error) {
      toast.error(
        mode === "signup" ? "登録に失敗しました" : "ログインに失敗しました",
        { id: toastId }
      );
      return;
    }
    if (mode === "signup") {
      toast.success("登録が完了しました！メールを確認してください！", {
        id: toastId,
      });
      router.push("/login");
    } else {
      toast.success("ログインに成功しました！", { id: toastId });
      //ログイン後のペットチェック
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError || !user) {
          throw new Error("ユーザー情報の取得に失敗しました");
        }
        const sessionRes = await supabase.auth.getSession();
        const token = sessionRes.data.session?.access_token;
        //GETリクエスト
        const petRes = await fetch("/api/pets", {
          headers: {
            Authorization: token ?? "",
          },
        });
        const petData = await petRes.json();
        if (petRes.ok) {
          const petCount = petData.pets?.length || 0;
          router.replace(petCount === 0 ? "/pets/new" : "/dashboard");
        } else {
          throw new Error(petData.message || "ペット情報の取得に失敗しました");
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("予期せぬエラーが発生しました");
        }
      }
    }
  };
  return { register, handleSubmit, errors, isSubmitting, onSubmit };
};

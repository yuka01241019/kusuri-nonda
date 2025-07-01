"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";
import { AuthFormData, authSchema } from "../_lib/authSchema";

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
  const onSubmit = async (data: AuthFormData) => {
    const { email, password } = data;
    let error = null;
    if (mode === "signup") {
      const res = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: "http://localhost:3000/login",
        },
      });
      error = res.error;
    } else if (mode === "login") {
      const res = await supabase.auth.signInWithPassword({ email, password });
      error = res.error;
    }
    if (error) {
      alert(
        mode === "signup" ? "登録に失敗しました" : "ログインに失敗しました"
      );
      return;
    }
    if (mode === "signup") {
      alert("登録が完了しました！メールを確認してください！");
      router.push("/login");
    } else {
      alert("ログインに成功しました！");
      router.replace("/");
    }
  };
  return { register, handleSubmit, errors, isSubmitting, onSubmit };
};

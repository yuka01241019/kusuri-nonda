"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthFormData } from "../_lib/authSchema";
import MailIcon from "@assets/icons/auth/mail.svg";
import LockIcon from "@assets/icons/auth/lock.svg";
import { FormInput } from "../_components/FormInput";
import { FormButton } from "../_components/FormButton";

type Mode = "signup" | "login";

type AuthFormProps = {
  mode: Mode;
  onSubmit: (data: AuthFormData) => void;
  register: any;
  handleSubmit: (
    onValid: (data: AuthFormData) => void
  ) => (e: React.FormEvent) => void;
  errors: any;
  isSubmitting: boolean;
};

export const AuthForm: React.FC<AuthFormProps> = ({
  mode,
  onSubmit,
  register,
  handleSubmit,
  errors,
  isSubmitting,
}) => {
  //パスワード表示/非表示切り替え
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  //modeによる出し分け
  const isSignup = mode === "signup";
  const title = isSignup ? "ユーザー登録" : "ログイン";
  const buttonText = isSignup ? "登録" : "ログイン";
  const linkText = isSignup
    ? "すでにアカウントをお持ちですか？"
    : "アカウントをお持ちでない方はこちら";
  const linkHref = isSignup ? "/login" : "/signup";
  const isLinkSeparate = isSignup;
  const linkLabel = isSignup ? "ログイン" : "";
  return (
    <div className="bg-lightPink min-h-screen flex justify-center items-start py-10">
      <div className="max-w-[450px] text-textMain ">
        {/*タイトル～ボタンまで */}
        <div className=" w-[428px] bg-white rounded-[16px] px-6 py-8  ">
          <div className="my-[60px]">
            <h1 className="text-heading1 text-center font-bold mb-[44px]">
              {title}
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="w-full max-w-[390px] ">
                <FormInput
                  id="email"
                  type="email"
                  label="メールアドレス"
                  Icon={MailIcon}
                  placeholder="mail@example.com"
                  error={errors.email?.message}
                  register={register}
                  disabled={isSubmitting}
                />
                <FormInput
                  id="password"
                  type="password"
                  label="パスワード"
                  Icon={LockIcon}
                  placeholder="パスワード(6文字以上)"
                  error={errors.password?.message}
                  register={register}
                  disabled={isSubmitting}
                  showToggleIcon
                  showPassword={showPassword}
                  onTogglePassword={() => setShowPassword(!showPassword)}
                />
              </div>
              <div className="mt-[26px] flex justify-center">
                <FormButton text={buttonText} disabled={isSubmitting} />
              </div>
            </form>
            {/* 下部リンク出し分け */}
            <div className="mt-[26px] text-base text-center">
              {isLinkSeparate ? (
                <>
                  <p>{linkText}</p>
                  <p className="mt-2">
                    <span
                      onClick={() => router.push(linkHref || "")}
                      className="underline font-bold cursor-pointer"
                    >
                      {linkLabel}
                    </span>
                  </p>
                </>
              ) : (
                <p
                  onClick={() => router.push(linkHref || "")}
                  className="underline font-bold cursor-pointer"
                >
                  {linkText}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

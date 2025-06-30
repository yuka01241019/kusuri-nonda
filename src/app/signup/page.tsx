"use client";

import { AuthForm } from "../_components/AuthForm";
import { useFormLogic } from "../_hooks/useFormLogic";

const SignUpPage: React.FC = () => {
  const { register, handleSubmit, errors, isSubmitting, onSubmit } =
    useFormLogic("signup");
  return (
    <AuthForm
      title="ユーザー登録"
      buttonText="登録"
      onSubmit={onSubmit}
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
      linkText="すでにアカウントをお持ちですか？"
      linkLabel="ログイン"
      linkHref="/login"
      isSubmitting={isSubmitting}
      isLinkSeparate={true}
    />
  );
};

export default SignUpPage;

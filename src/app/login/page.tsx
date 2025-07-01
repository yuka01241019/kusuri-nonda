"use client";

import { AuthForm } from "../_components/AuthForm";
import { useAuthForm } from "../_hooks/useAuthForm";

const LoginPage: React.FC = () => {
  const { register, handleSubmit, errors, isSubmitting, onSubmit } =
    useAuthForm("login");
  return (
    <AuthForm
      title="ログイン"
      buttonText="ログイン"
      onSubmit={onSubmit}
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
      linkText="アカウントをお持ちでない方はこちら"
      linkHref="/signup"
      isSubmitting={isSubmitting}
      isLinkSeparate={false}
    />
  );
};

export default LoginPage;

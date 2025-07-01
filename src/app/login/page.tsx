"use client";

import { AuthForm } from "../_components/AuthForm";
import { useAuthForm } from "../_hooks/useAuthForm";

const LoginPage: React.FC = () => {
  const { register, handleSubmit, errors, isSubmitting, onSubmit } =
    useAuthForm("login");
  return (
    <AuthForm
      mode="login"
      onSubmit={onSubmit}
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
      isSubmitting={isSubmitting}
    />
  );
};

export default LoginPage;

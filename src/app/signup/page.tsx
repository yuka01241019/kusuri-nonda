"use client";

import { AuthForm } from "../_components/AuthForm";
import { useAuthForm } from "../_hooks/useAuthForm";

const SignUpPage: React.FC = () => {
  const { register, handleSubmit, errors, isSubmitting, onSubmit } =
    useAuthForm("signup");
  return (
    <AuthForm
      mode="signup"
      onSubmit={onSubmit}
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
      isSubmitting={isSubmitting}
    />
  );
};

export default SignUpPage;

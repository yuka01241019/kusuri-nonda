"use client";

import PowIcon from "@assets/icons/auth/pow.svg";

type FormButtonProps = {
  text: string;
  disabled?: boolean;
};

export const FormButton: React.FC<FormButtonProps> = ({
  text,
  disabled = false,
}) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="w-[200px] h-[44px] bg-darkPink text-white border border-textMain font-bold rounded-[8px] flex items-center justify-center gap-1 "
    >
      <PowIcon />
      {text}
    </button>
  );
};

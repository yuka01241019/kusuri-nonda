"use client";

import { forwardRef } from "react";

type FormButtonProps = {
  text: string;
  disabled?: boolean;
  icon?: React.ReactNode; //任意のアイコンを渡す
  showIcon?: boolean; //アイコンを表示するかどうか
  variant?: "primary" | "secondary" | "outline" | "dangerText";
  onClick?: () => void;
  type?: "submit" | "button";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const FormButton = forwardRef<HTMLButtonElement, FormButtonProps>(
  (props, ref) => {
    const {
      text,
      disabled = false,
      icon,
      showIcon = true,
      variant = "primary",
      onClick,
      type = "submit",
      className,
      ...rest
    } = props;
    const baseClass =
      "w-[200px] h-[44px] font-bold rounded-[8px] flex items-center justify-center gap-1 ";
    const variantClass = {
      primary: "bg-darkPink text-white border border-textMain",
      secondary: "bg-submitBtn text-white border border-transparent",
      outline: "bg-white text-textMain border-textMain",
      dangerText: "bg-transparent text-red-500 border border-textMain",
    }[variant];
    return (
      <button
        {...rest}
        ref={ref}
        onClick={onClick}
        type={type}
        disabled={disabled}
        className={`${baseClass}${variantClass} ${className ?? ""}`}
      >
        {showIcon && icon}
        {text}
      </button>
    );
  },
);

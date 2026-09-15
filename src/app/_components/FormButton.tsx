"use client";

type FormButtonProps = {
  text: string;
  disabled?: boolean;
  icon?: React.ReactNode; //任意のアイコンを渡す
  showIcon?: boolean; //アイコンを表示するかどうか
  variant?: "primary" | "secondary" | "outline";
  onClick?: () => void;
  type?: "submit" | "button";
};

export const FormButton: React.FC<FormButtonProps> = ({
  text,
  disabled = false,
  icon,
  showIcon = true,
  variant = "primary",
  onClick,
  type = "submit",
}) => {
  const baseClass =
    "w-[200px] h-[44px] font-bold rounded-[8px] flex items-center justify-center gap-1 ";
  const variantClass = {
    primary: "bg-darkPink text-white border border-textMain",
    secondary: "bg-submitBtn text-white border border-transparent",
    outline: "bg-white text-textMain border-textMain",
  }[variant];
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`${baseClass}${variantClass}`}
    >
      {showIcon && icon}
      {text}
    </button>
  );
};

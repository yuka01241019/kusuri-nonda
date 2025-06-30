"use client";

import EyeIcon from "@assets/icons/auth/eye.svg";
import EyeOffIcon from "@assets/icons/auth/eyeOff.svg";

type FormInputProps = {
  id: string;
  type?: string;
  label: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  placeholder: string;
  error?: string;
  register: any;
  disabled?: boolean;
  showToggleIcon?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
};

export const FormInput: React.FC<FormInputProps> = ({
  id,
  type = "text",
  label,
  Icon,
  placeholder,
  error,
  register,
  disabled = false,
  showToggleIcon = false,
  showPassword = false,
  onTogglePassword,
}) => {
  return (
    <div className="w-full mb-2">
      <label htmlFor={id} className="flex items-center gap-[1px] text-small">
        <Icon />
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={showToggleIcon ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full h-[44px] border ${
            error ? "border-red-500" : "border-textMain"
          } text-base rounded-[8px] px-2.5 ${
            showToggleIcon ? "pr-10" : ""
          } py-2 bg-lightPink mt-[4px]`}
          {...register(id)}
        />
        {showToggleIcon && onTogglePassword && (
          <span
            onClick={onTogglePassword}
            className="absolute right-3 top-0 h-full flex items-center cursor-pointer text-gray-500"
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </span>
        )}
      </div>
      {error ? (
        <p className="h-[18px] mt-1 text-[12px] text-red-600 leading-tight">
          {error}
        </p>
      ) : (
        <p className="h-[18px] mt-1 text-[12px] invisible leading-tight">
          placeholder
        </p>
      )}
    </div>
  );
};

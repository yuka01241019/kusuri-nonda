"use client";

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import "react-datepicker/dist/react-datepicker.css";

type PetFormDateInputProps = {
  label: string;
  value?: string | null;
  onChange: (date: string) => void;
  error?: string;
  disabled?: boolean;
};

export const PetFormDateInput: React.FC<PetFormDateInputProps> = ({
  label,
  value,
  onChange,
  error,
  disabled,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? dayjs(value).toDate() : null
  );

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const mobileRegex = /Android|iPhone|iPad|iPod/i;
    setIsMobile(mobileRegex.test(userAgent));
  }, []);

  const handleChange = (date: Date | null) => {
    setSelectedDate(date);
    onChange(date ? dayjs(date).format("YYYY-MM-DD") : "");
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setSelectedDate(newVal ? new Date(newVal) : null);
    onChange(newVal);
  };
  return (
    <div className="w-full mb-0.5">
      <label className="flex items-center gap-[1px] text-small">{label}</label>
      <div className="relative">
        {isMobile ? (
          <>
            <input
              type="date"
              value={value ?? ""}
              onChange={handleMobileChange}
              disabled={disabled}
              className={`w-full h-[44px] border ${
                error ? "border-red-500" : "border-textMain"
              } text-base rounded-[8px] px-2.5 py-2 bg-lightPink mt-[4px] pr-10`} //← 右スペース確保
            />
            {/* スマホ用に×ボタンを追加して空欄（未設定）に戻せるよう実装 */}
            {value && !disabled && (
              <button
                type="button"
                onClick={() => {
                  setSelectedDate(null);
                  onChange("");
                }}
                className="absolute right-2 top-[14px] text-gray-400 text-xl leading-none"
                aria-label="クリア"
              >
                ×
              </button>
            )}
          </>
        ) : (
          <DatePicker
            selected={selectedDate}
            onChange={handleChange}
            dateFormat="yyyy-MM-dd"
            disabled={disabled}
            placeholderText="設定なし"
            customInput={
              <input
                className={`w-full h-[44px] border ${
                  error ? "border-red-500" : "border-textMain"
                } text-base rounded-[8px] px-2.5 py-2 bg-lightPink mt-[4px]`}
              />
            }
          />
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

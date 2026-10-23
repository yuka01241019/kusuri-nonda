"use client";

import { useState } from "react";
import TriangleIcon from "@assets/icons/pet/triangle.svg";

type TimeSelectorProps = {
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
  disabled?: boolean;
};

export const TimeSelector: React.FC<TimeSelectorProps> = ({
  value,
  onChange,
  error,
  disabled,
}) => {
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const timeOptions = [];
  for (let i = 0; i < 24; i++) {
    // numberからstringに変換し、文字列が2文字になるまで、先頭を "0" で埋める
    const hour = i.toString().padStart(2, "0");
    timeOptions.push(`${hour}:00`);
    timeOptions.push(`${hour}:30`);
  }
  const handleChange = (time: string) => {
    if (value.includes(time)) {
      const newTime = value.filter((selectedTime) => {
        return selectedTime !== time;
      });
      onChange(newTime);
    } else {
      const newTimes = [...value, time];
      onChange(newTimes);
    }
  };
  return (
    <div className="relative mb-0.5">
      <label className="text-small">時間</label>
      <div
        className={`relative flex flex-wrap items-center gap-2 w-full min-h-[44px] border rounded-[8px] px-2.5 py-2 mt-[4px]
    ${error ? "border-red-500" : "border-textMain"}`}
      >
        {/* 時間一覧を開くボタン */}
        <button
          type="button"
          disabled={disabled}
          aria-label="時間の選択肢を開閉"
          aria-expanded={isTimeOpen}
          onClick={() => setIsTimeOpen(!isTimeOpen)}
          className="absolute inset-0 w-full h-full"
        />

        {/* 選択した時間 */}
        {value.length > 0 ? (
          value.map((time) => {
            return (
              <span
                key={time}
                className="relative z-10 px-2 py-1 bg-gray-200 rounded-full"
              >
                {time}
                <button
                  type="button"
                  disabled={disabled}
                  onClick={() => handleChange(time)}
                  aria-label={`${time}を削除`}
                  className="ml-1"
                >
                  ×
                </button>
              </span>
            );
          })
        ) : (
          <span className="pointer-events-none">時間を選択してください</span>
        )}
        <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
          <TriangleIcon />
        </div>
      </div>
      {isTimeOpen && (
        <div className="absolute w-full max-h-60 overflow-y-auto bg-white border border-textMain rounded-[8px]">
          {/* 時間一覧 */}
          {timeOptions.map((timeOption) => {
            return (
              <label
                key={timeOption}
                className="flex items-center gap-2 px-3 py-2"
              >
                <input
                  type="checkbox"
                  value={timeOption}
                  checked={value.includes(timeOption)}
                  onChange={() => handleChange(timeOption)}
                  disabled={disabled}
                />
                {timeOption}
              </label>
            );
          })}
        </div>
      )}
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

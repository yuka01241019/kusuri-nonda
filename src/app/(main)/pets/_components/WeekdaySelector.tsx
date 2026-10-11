"use client";

import { Weekday } from "@prisma/client";

type WeekdaySelectorProps = {
  value: Weekday[];
  onChange: (value: Weekday[]) => void;
  error?: string;
  disabled?: boolean;
};

export const WeekdaySelector: React.FC<WeekdaySelectorProps> = ({
  value,
  onChange,
  error,
  disabled,
}) => {
  const handleChange = (day: Weekday) => {
    // すでに選択されている場合
    if (value.includes(day)) {
      const newDays = value.filter((selectedDay) => {
        //  クリックした曜日以外を残す
        return selectedDay !== day;
      });
      // 新しい配列を親に渡す
      onChange(newDays);
    } else {
      // 選択されていない場合
      // 元の配列の要素をコピーして、新しい配列を作る
      const newDays = [...value, day];
      onChange(newDays);
    }
  };
  return (
    <div className="text-small mb-0.5">
      <p>曜日</p>
      <div className="flex gap-2 justify-center mt-[4px]">
        <label>
          <input
            type="checkbox"
            value={Weekday.MON}
            checked={value.includes(Weekday.MON)}
            onChange={() => handleChange(Weekday.MON)}
            className="sr-only peer"
          />
          <span className="flex items-center justify-center w-9 h-9 rounded-full bg-lightPink cursor-pointer transition-colors peer-checked:bg-darkPink peer-checked:text-white">
            月
          </span>
        </label>
        <label>
          <input
            type="checkbox"
            value={Weekday.TUE}
            checked={value.includes(Weekday.TUE)}
            onChange={() => handleChange(Weekday.TUE)}
            className="sr-only peer"
          />
          <span className="flex items-center justify-center w-9 h-9 rounded-full bg-lightPink cursor-pointer transition-colors peer-checked:bg-darkPink peer-checked:text-white">
            火
          </span>
        </label>
        <label>
          <input
            type="checkbox"
            value={Weekday.WED}
            checked={value.includes(Weekday.WED)}
            onChange={() => handleChange(Weekday.WED)}
            className="sr-only peer"
          />
          <span className="flex items-center justify-center w-9 h-9 rounded-full bg-lightPink cursor-pointer transition-colors peer-checked:bg-darkPink peer-checked:text-white">
            水
          </span>
        </label>
        <label>
          <input
            type="checkbox"
            value={Weekday.THU}
            checked={value.includes(Weekday.THU)}
            onChange={() => handleChange(Weekday.THU)}
            className="sr-only peer"
          />
          <span className="flex items-center justify-center w-9 h-9 rounded-full bg-lightPink cursor-pointer transition-colors peer-checked:bg-darkPink peer-checked:text-white">
            木
          </span>
        </label>
        <label>
          <input
            type="checkbox"
            value={Weekday.FRI}
            checked={value.includes(Weekday.FRI)}
            onChange={() => handleChange(Weekday.FRI)}
            className="sr-only peer"
          />
          <span className="flex items-center justify-center w-9 h-9 rounded-full bg-lightPink cursor-pointer transition-colors peer-checked:bg-darkPink peer-checked:text-white">
            金
          </span>
        </label>
        <label>
          <input
            type="checkbox"
            value={Weekday.SAT}
            checked={value.includes(Weekday.SAT)}
            onChange={() => handleChange(Weekday.SAT)}
            className="sr-only peer"
          />
          <span className="flex items-center justify-center w-9 h-9 rounded-full bg-lightPink cursor-pointer transition-colors peer-checked:bg-darkPink peer-checked:text-white">
            土
          </span>
        </label>
        <label>
          <input
            type="checkbox"
            value={Weekday.SUN}
            checked={value.includes(Weekday.SUN)}
            onChange={() => handleChange(Weekday.SUN)}
            className="sr-only peer"
          />
          <span className="flex items-center justify-center w-9 h-9 rounded-full bg-lightPink cursor-pointer transition-colors peer-checked:bg-darkPink peer-checked:text-white">
            日
          </span>
        </label>
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

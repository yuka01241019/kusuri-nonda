"use client";

import { Family } from "@/app/_types/family/family";
import EditIcon from "@assets/icons/edit.svg";
import TrashIcon from "@assets/icons/trash.svg";

type FamilyMemberItemProps = {
  family: Family;
  isLast: boolean;
};

export const FamilyMemberItem: React.FC<FamilyMemberItemProps> = ({
  family,
  isLast,
}) => {
  return (
    <div
      className={`pb-5 pt-2 ${isLast ? "" : "border-b-[1.25px] border-gray-300 "}`}
    >
      <div className="flex items-center gap-2.5">
        <div
          className="rounded-full w-9 h-9 shrink-0"
          style={{ backgroundColor: family.color }}
        />
        {family.name}
        <div className="ml-auto gap-1 flex items-center">
          <button
            type="button"
            aria-label={`${family.name}を編集する`}
            className="rounded-full p-2 hover:bg-lightPink"
          >
            <EditIcon className="w-6 h-6" />
          </button>
          <button
            type="button"
            aria-label={`${family.name}を削除する`}
            className="rounded-full p-2 hover:bg-lightPink"
          >
            <TrashIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

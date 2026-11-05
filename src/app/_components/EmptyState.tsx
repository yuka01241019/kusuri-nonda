"use client";

import Link from "next/link";
import AddIcon from "@assets/icons/add.svg";

type EmptyStateProps = {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  buttonText: string;
  href: string;
};

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  buttonText,
  href,
}) => {
  return (
    <div className="flex flex-1 flex-col items-center gap-3 justify-center bg-lightPink p-6 text-center text-small text-textMain">
      {icon && (
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white">
          {icon}
        </div>
      )}
      <p className="font-bold">{title}</p>
      {description && <p>{description}</p>}
      <Link
        className="flex h-[44px] w-[200px] items-center justify-center gap-1 rounded-[8px] border border-transparent bg-submitBtn font-bold text-white"
        href={href}
      >
        <AddIcon />
        {buttonText}
      </Link>
    </div>
  );
};

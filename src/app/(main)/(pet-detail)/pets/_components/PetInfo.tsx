"use client";

import Image from "next/image";
import dayjs from "dayjs";
import Link from "next/link";
import EditIcon from "@assets/icons/edit.svg";
import NoImageIcon from "@assets/icons/no-image.svg";
import { useStorageImage } from "@/app/_hooks/useStorageImage";

type PetInfoProps = {
  name: string;
  gender: string | null;
  birthday: string | null;
  adoptedAt: string | null;
  imagePath: string | null;
};

export const PetInfo: React.FC<PetInfoProps> = ({
  name,
  gender,
  birthday,
  adoptedAt,
  imagePath,
}) => {
  const imageUrl = useStorageImage("pet-imageurl", imagePath);
  return (
    <div className="bg-lightPink text-textMain text-small pt-10">
      <div className="relative w-full max-w-[350px] sm:max-w-[390px] md:max-w-[400px] lg:max-w-[420px] mx-auto flex items-start gap-4">
        <div className="absolute top-1 right-0">
          {/* 仮アドレス */}
          <Link href="/" aria-label="ペット情報を編集">
            <EditIcon />
          </Link>
        </div>
        <div>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={`${name}の写真`}
              width={85}
              height={85}
              // Blob URLはNext.jsの画像最適化を行わず、そのまま表示する
              unoptimized
              className="w-[85px] h-[85px] object-cover rounded-full"
            />
          ) : (
            <NoImageIcon className="w-[85px] h-[85px]" />
          )}
        </div>
        <div>
          <div className="text-heading1">{name}</div>
          <div>
            生年月日:
            {birthday ? dayjs(birthday).format("YYYY年MM月DD日") : "未登録"}
            {gender ? (gender === "おとこのこ♂" ? "♂" : "♀") : "未登録"}
          </div>
          <div>
            お迎えした日:
            {adoptedAt ? dayjs(adoptedAt).format("YYYY年MM月DD日") : "未登録"}
          </div>
        </div>
      </div>
    </div>
  );
};

"use client";

import Image from "next/image";
import dayjs from "dayjs";
import Link from "next/link";
import EditIcon from "@assets/icons/edit.svg";
import NoImageIcon from "@assets/icons/no-image.svg";
import { useStorageImage } from "@/app/_hooks/useStorageImage";
import { useFetch } from "@/app/_hooks/useFetch";
import { GetPetResponse } from "@/app/_types/pet/pet";
import { LoadingSpinner } from "@/app/_components/LoadingSpinner";

type PetInfoProps = {
  id: string;
};

export const PetInfo: React.FC<PetInfoProps> = ({ id }) => {
  const { data, isLoading, error } = useFetch<GetPetResponse>(
    `/api/pets/${id}`,
  );
  const imageUrl = useStorageImage("pet-imageurl", data?.pet.imagePath ?? null);
  if (isLoading) {
  return (
    <div className="pt-10">
      <LoadingSpinner />
    </div>
  );
}if (error) {
    return <p>ペット情報の取得に失敗しました。</p>;
  }
  if (!data) {
    return <p>ペット情報が見つかりません。</p>;
  }
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
              alt={`${data.pet.name}の写真`}
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
          <div className="text-heading1">{data.pet.name}</div>
          <div>
            生年月日:
            {data.pet.birthday
              ? dayjs(data.pet.birthday).format("YYYY年MM月DD日")
              : "未登録"}
            {data.pet.gender
              ? data.pet.gender === "おとこのこ♂"
                ? "♂"
                : "♀"
              : "未登録"}
          </div>
          <div>
            お迎えした日:
            {data.pet.adoptedAt
              ? dayjs(data.pet.adoptedAt).format("YYYY年MM月DD日")
              : "未登録"}
          </div>
        </div>
      </div>
    </div>
  );
};

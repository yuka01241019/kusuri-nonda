"use client";
import { supabase } from "@/utils/supabase";
import Image from "next/image";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

type PetInfoProps = {
  name: string;
  gender: string | null;
  birthday: string | null;
  adoptedAt: string | null;
  imagePath: string | null;
};

export const PetInfo = ({
  name,
  gender,
  birthday,
  adoptedAt,
  imagePath,
}: PetInfoProps) => {
  const [publicUrl, setPublicUrl] = useState<string | null>(null);
  useEffect(() => {
    if (!imagePath) return;
    const fetchImageUrl = async () => {
      const {
        data: { publicUrl },
      } = supabase.storage.from("pet-imageurl").getPublicUrl(imagePath);

      // 取得した画像URLをstateに保存
      setPublicUrl(publicUrl);
    };
    fetchImageUrl();
  }, [imagePath]);
  return (
    <div className="bg-lightPink text-textMain text-small p-4">
      <div className="flex items-start gap-4">
        <div>
          {publicUrl && (
            <Image
              src={publicUrl}
              alt={`${name}の写真`}
              width={80}
              height={80}
              className="w-[80px] h-[80px] object-cover rounded-full"
            />
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

"use client";

import { supabase } from "@/utils/supabase";
import { useState, useEffect } from "react";
import Image from "next/image";
import NoImageIcon from "@assets/icons/no-image.svg";

type PetSwitcherIconProps = {
  id: number;
  name: string;
  imagePath: string | null;
};

export const PetSwitcherIcon: React.FC<PetSwitcherIconProps> = ({
  id,
  name,
  imagePath,
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  useEffect(() => {
    if (!imagePath) {
      // 写真が登録されていない場合、画像を消して処理を終了
      setImageUrl(null);
      return;
    }
    // 写真が登録されている場合、新しい画像を取得する前に古い画像を消す
    setImageUrl(null);
    let objectUrl: string | null = null;
    let cancelled = false;
    const fetchImage = async () => {
      const { data, error } = await supabase.storage
        .from("pet-imageurl")
        .download(imagePath);
      if (cancelled) {
        return;
      }
      if (error) {
        console.error("画像のダウンロードに失敗しました:", error);
        setImageUrl(null);
        return;
      }
      objectUrl = URL.createObjectURL(data);
      setImageUrl(objectUrl);
    };
    // 画像をダウンロードする関数を実行
    fetchImage();
    return () => {
      cancelled = true;
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [imagePath]);
  return (
    <div>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={`${name}の写真`}
          width={70}
          height={70}
          unoptimized
          className="w-[70px] h-[70px] object-cover rounded-full"
        />
      ) : (
        <NoImageIcon className="w-[70px] h-[70px]"/>
      )}
    </div>
  );
};

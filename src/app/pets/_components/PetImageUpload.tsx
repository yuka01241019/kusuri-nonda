"use client";

import { supabase } from "@/utils/supabase";
import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import toast from "react-hot-toast";
import CameraIcon from "@assets/icons/pet/camera.svg";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";

type PetImageUploadProps = {
  imagePath: string | null | undefined;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
};

export const PetImageUpload: React.FC<PetImageUploadProps> = ({
  imagePath,
  onChange,
  error,
  disabled,
}) => {
  const { session } = useSupabaseSession();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  //初期表示 or imagePathが変わった時にURLを再取得
  useEffect(() => {
    if (!imagePath) {
      setImageUrl(null);
      return;
    }
    setImageUrl(null);

    let objectUrl: string | null = null;
    let cancelled = false;
    const fetchImageUrl = async () => {
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
      return;
    };
    fetchImageUrl();
    return () => {
      cancelled = true;
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [imagePath]);
  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    // userIDを取得
    const userId = session?.user.id;
    // userIdが存在しない場合はreturn
    if (!userId) {
      return;
    }
    // あればfilePathを作成して次の処理へ進む
    const filePath = `${userId}/${uuidv4()}`;
    const toastId = toast.loading("画像をアップロード中…");
    setUploading(true);

    const { error: uploadError } = await supabase.storage
      .from("pet-imageurl")
      .upload(filePath, file);
    setUploading(false);

    if (uploadError) {
      toast.error("画像のアップロードに失敗しました", { id: toastId });
      console.error(uploadError);
      return;
    }
    // アップロード成功 → 親に画像の保存先を渡す
    onChange(filePath); //imagePathを親に返す
    // 成功メッセージを表示
    toast.success("画像をアップロードしました！", { id: toastId });
  };
  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-[110px] h-[110px] mb-2">
        <div
          className="w-full h-full rounded-full bg-[#E0E0E0] overflow-hidden border border-gray-500 cursor-pointer relative"
          onClick={handleClick}
        >
          {imageUrl && (
            <Image
              src={imageUrl}
              alt="pet image"
              fill
              unoptimized
              className="object-cover rounded-full"
            />
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />
        <div
          onClick={handleClick}
          className="absolute bottom-0 right-0 p-1 cursor-pointer "
        >
          <CameraIcon />
        </div>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

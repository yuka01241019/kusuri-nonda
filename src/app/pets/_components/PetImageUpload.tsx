"use client";

import { supabase } from "@/utils/supabase";
import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import toast from "react-hot-toast";
import CameraIcon from "@assets/icons/pet/camera.svg";

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
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [publicUrl, setPublicUrl] = useState<string | null>(null);
  //初期表示 or imagePathが変わった時にURLを再取得
  useEffect(() => {
    if (!imagePath) return;
    const fetchImageUrl = async () => {
      const {
        data: { publicUrl },
      } = supabase.storage.from("pet-imageurl").getPublicUrl(imagePath);
      setPublicUrl(publicUrl);
    };
    fetchImageUrl();
  }, [imagePath]);
  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    const filePath = `private/${uuidv4()}`;
    setUploading(true);

    const { error } = await supabase.storage
      .from("pet-imageurl")
      .upload(filePath, file);
    setUploading(false);

    if (error) {
      toast.error("画像のアップロードに失敗しました");
      console.error(error);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("pet-imageurl").getPublicUrl(filePath);
    setPublicUrl(publicUrl);
    onChange(filePath); //imagePathを親に返す
  };
  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-[110px] h-[110px] mb-2">
        <div
          className="w-full h-full rounded-full bg-[#E0E0E0] overflow-hidden border border-gray-500 cursor-pointer relative"
          onClick={handleClick}
        >
          {publicUrl && (
            <Image
              src={publicUrl}
              alt="pet image"
              fill
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

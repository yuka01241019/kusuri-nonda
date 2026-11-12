"use client";

import { supabase } from "@/utils/supabase";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import CameraIcon from "@assets/icons/pet/camera.svg";

type PetImageUploadProps = {
  imagePath: string | null | undefined;
  // 選択した画像ファイル、または画像削除時のnullを親に渡す
  onChange: (value: File | null) => void;
  // 画像の削除操作を親コンポーネントに通知する
  onRemove: () => void;
  error?: string;
  disabled?: boolean;
  selectedFile: File | null;
};

export const PetImageUpload: React.FC<PetImageUploadProps> = ({
  imagePath,
  onChange,
  onRemove,
  error,
  disabled,
  selectedFile,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  // ストレージから取得した登録済みの画像
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  // 新しく選択した画像の一時URL
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
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

  // プレビュー用
  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }
    // 選択した画像ファイルから一時URLを作成し、解放処理でも使えるよう変数に保存する
    const objectUrl = URL.createObjectURL(selectedFile);
    // 作成した一時URLをstateに保存して、プレビュー表示に使う
    setPreviewUrl(objectUrl);
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedFile]);
  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    onChange(file); //親コンポーネントに画像ファイルを渡す
  };
  // Imageのsrcはnullを受け取れないため、表示用URLをまとめて管理する
  const displayUrl = previewUrl || imageUrl;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-[110px] h-[110px] mb-2">
        <div
          className="w-full h-full rounded-full bg-[#E0E0E0] overflow-hidden border border-gray-500 cursor-pointer relative"
          onClick={handleClick}
        >
          {displayUrl && (
            <Image
              src={displayUrl}
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

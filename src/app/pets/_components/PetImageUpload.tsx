"use client";

import { supabase } from "@/utils/supabase";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import CameraIcon from "@assets/icons/pet/camera.svg";
import { DropdownMenu } from "radix-ui";

type PetImageUploadProps = {
  imagePath: string | null | undefined;
  // 選択した画像ファイル、または画像削除時のnullを親に渡す
  onChange: (value: File | null) => void;
  // 画像の削除操作を親コンポーネントに通知する
  onRemove: () => void;
  error?: string;
  disabled?: boolean;
  selectedFile: File | null;
  // 画像が削除予定かどうか
  isImageRemoved: boolean;
};

export const PetImageUpload: React.FC<PetImageUploadProps> = ({
  imagePath,
  onChange,
  onRemove,
  error,
  disabled,
  selectedFile,
  isImageRemoved,
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
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    onChange(file); //親コンポーネントに画像ファイルを渡す
  };
  // 削除予定の場合は非表示にし、それ以外は新しい画像を優先して表示する
  const displayUrl = isImageRemoved ? null : previewUrl || imageUrl;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-[110px] h-[110px] mb-2">
        <div className="w-full h-full rounded-full bg-[#E0E0E0] overflow-hidden border border-gray-500 cursor-pointer relative">
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
        <div className="absolute bottom-0 right-0">
          {displayUrl ? (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button type="button" disabled={disabled}>
                  <CameraIcon />
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  sideOffset={5}
                  align="end"
                  className="text-small text-textMain z-[70] w-[180px] space-y-2 rounded-[16px] bg-white p-1 shadow-lg"
                >
                  <DropdownMenu.Item
                    onSelect={() => fileInputRef.current?.click()}
                    className="cursor-pointer rounded-lg px-4 py-3 outline-none hover:bg-gray-100 focus:bg-gray-100"
                  >
                    画像を選択する
                  </DropdownMenu.Item>
                  <DropdownMenu.Separator className="my-1 h-px bg-gray-200" />
                  <DropdownMenu.Item
                    onSelect={onRemove}
                    className="cursor-pointer rounded-lg px-4 py-3 text-red-500 outline-none hover:bg-red-50 focus:bg-red-50"
                  >
                    画像を削除する
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          ) : (
            <button
              type="button"
              disabled={disabled}
              onClick={() => fileInputRef.current?.click()}
            >
              <CameraIcon />
            </button>
          )}
        </div>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

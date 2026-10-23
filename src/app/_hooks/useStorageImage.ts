import { supabase } from "@/utils/supabase";
import { useState, useEffect } from "react";

export const useStorageImage = (
  bucketName: string,
  imagePath: string | null,
) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  useEffect(() => {
    if (!imagePath) {
    // 写真が登録されていない場合、画像を消して処理を終了
      setImageUrl(null);
      return;
    }
    // 写真が登録されている場合、新しい画像を取得する前に古い画像を消す
    setImageUrl(null);
    // ブラウザ内で作った画像URLを覚えておくための変数
    let objectUrl: string | null = null;
    // 画像の取得が終わる前に、ページを離れたり別のペットに切り替えたりしたかを判断するための変数
    let cancelled = false;
    const fetchImageUrl = async () => {
      const { data, error } = await supabase.storage
        .from(bucketName)
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
      // 取得した画像URLをstateに保存
      setImageUrl(objectUrl);
    };
    // 画像をダウンロードする関数を実行
    fetchImageUrl();
    return () => {
      cancelled = true;
      // 不要になったURLを解放
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [bucketName, imagePath]);
  // 取得した画像URLを呼び出し元のコンポーネントに返す
  return imageUrl;
};

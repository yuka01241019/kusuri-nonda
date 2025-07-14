import { CreatePetRequest } from "@/app/_types/pet/CreatePet";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSettion";

export const useCreatePet = () => {
  const { token } = useSupabaseSession();
  const createPet = async (data: CreatePetRequest) => {
    try {
      if (!token) {
        throw new Error("ログイン情報が見つかりません");
      }
      const res = await fetch("/api/pets", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const errorData = await res.json();
        console.error("APIエラー内容:", errorData); 
        throw new Error(errorData.message || "登録に失敗しました");
      }
      return await res.json();
    } catch (error) {
      if (error instanceof Error) {
        console.error("ペットの登録に失敗しました", error.message);
        throw new Error(error.message || "エラーが発生しました");
      } else {
        console.error("予期せぬエラーが発生しました", error);
        throw new Error("エラーが発生しました");
      }
    }
  };
  return { createPet };
};

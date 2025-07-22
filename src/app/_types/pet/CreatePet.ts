//クライアント→APIに送られてくるデータ（リクエスト）
export type CreatePetRequest = {
  name: string;
  species: string;
  gender: "おとこのこ♂" | "おんなのこ♀" | null;
  birthday: string | null;
  adoptedAt: string | null;
  imagePath?: string;
};

//サーバーから返ってくるデータ（レスポンス）
export type Pet = {
  id: number;
  userId: number;
  name: string;
  species: string;
  gender: string | null;
  birthday: string | null;
  adoptedAt: string | null;
  imagePath: string | null;
  createdAt: string;
  updatedAt: string;
};

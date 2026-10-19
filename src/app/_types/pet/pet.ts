//サーバーから返ってくるデータ（レスポンス）
export type Pet = {
  id: number;
  name: string;
  species: string;
  gender: string | null;
  birthday: string | null;
  adoptedAt: string | null;
  imagePath: string | null;
};

// POSTのレスポンス
export type PostPetResponse = {
  message: string;
  pet: Pet;
};

// GET全体のレスポンス
export type GetPetsResponse = {
  pets: Pet[];
};

// GET個別のレスポンス
export type GetPetResponse = {
  message: string;
  pet: Pet;
};

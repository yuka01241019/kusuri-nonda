// サーバーから帰ってくるデータ（レスポンス）
export type Family = {
  id: number;
  name: string;
  color: string;
};

// POSTのレスポンス
export type PostFamilyResponse = {
  message: string;
  family: Family;
};

// GET全体のレスポンス
export type GetFamiliesResponse = {
  message: string;
  families: Family[];
};

// PUTのレスポンス
export type PutFamilyResponse = {
  message: string;
  family: Family;
};

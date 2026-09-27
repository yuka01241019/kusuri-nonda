import {
  Form,
  Color,
} from "@/app/(main)/medications/_lib/medicationFormSchema";

//サーバーから帰ってくるデータ（レスポンス）
export type Medication = {
  id: number;
  userId: number;
  name: string;
  form: Form;
  color: Color | null;
  createdAt: string;
  updatedAt: string;
};

//ページ情報の型
export type Pagination = {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
};

//GET全体のレスポンス
export type GetMedicationsResponse = {
  medications: Medication[];
  pagination: Pagination;
};

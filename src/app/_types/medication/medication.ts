import { Form, Color } from "@prisma/client";

// サーバーから帰ってくるデータ（レスポンス）
export type Medication = {
  id: number;
  name: string;
  form: Form;
  color: Color | null;
};

// ページ情報の型
export type Pagination = {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
};

// GET全体のレスポンス
export type GetMedicationsResponse = {
  medications: Medication[];
  pagination: Pagination;
};

// GET個別のレスポンス
export type GetMedicationResponse = {
  message: string;
  medication: Medication;
};

// DELETEのレスポンス
export type DeleteMedicationResponse = {
  message: string;
};

// PUTのレスポンス
export type PutMedicationResponse = {
  message: string;
  medication: Medication;
};

import { Form, Color } from "@/app/medications/_lib/medicationFormSchema";

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

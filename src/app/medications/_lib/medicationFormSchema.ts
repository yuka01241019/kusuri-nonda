import { z } from "zod";

//薬形状
export enum Form {
  TABLET = "TABLET",
  ROUNDTABLET = "ROUNDTABLET",
  EYEDROP = "EYEDROP",
  POWDER = "POWDER",
}
//薬の色(TABLET・ROUNDTABLET選択時のみ)
export enum Color {
  WHITE = "WHITE",
  RED = "RED",
  YELLOW = "YELLOW",
  GRAY = "GRAY",
  ORANGE = "ORANGE",
}

export const medicationFormSchema = z
  .object({
    name: z.string().min(1, "薬の名前は必須です"),
    form: z.nativeEnum(Form, {
      errorMap: () => ({ message: "薬の形状を選択してください" }),
    }),
    color: z.nativeEnum(Color).optional(),
  })
  .refine(
    (data) =>
      //TABLET or ROUNDTABLETのときcolorが必須
      [Form.TABLET, Form.ROUNDTABLET].includes(data.form) ? !!data.color : true,
    { message: "薬の色を選択してください", path: ["color"] } //colorフィールドにエラーを紐づける
  );

export type medicationFormData = z.infer<typeof medicationFormSchema>;

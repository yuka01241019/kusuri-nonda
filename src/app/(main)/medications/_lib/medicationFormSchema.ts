import { z } from "zod";
import { Form, Color } from "@prisma/client";

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
      data.form === Form.TABLET || data.form === Form.ROUNDTABLET
        ? !!data.color
        : true,
    { message: "薬の色を選択してください", path: ["color"] }, //colorフィールドにエラーを紐づける
  );

export type medicationFormData = z.infer<typeof medicationFormSchema>;

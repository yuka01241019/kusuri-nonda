import { z } from "zod";

//認証（登録/ログイン）用バリデーション設定
export const authSchema = z.object({
  email: z
    .string()
    .nonempty("メールアドレスは必須です")
    .email("正しいメールアドレスを入力してください"),
  password: z
    .string()
    .nonempty("パスワードは必須です")
    .min(6, "パスワードは6文字以上で入力してください"),
});

export type AuthFormData = z.infer<typeof authSchema>;

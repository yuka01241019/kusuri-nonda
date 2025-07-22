import { useSupabaseSession } from "@/app/_hooks/useSupabaseSettion";

//HTTPメソッドの型
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

//fetch用の共通関数
const baseFetch = async <TResponse, TRequest = undefined>(
  method: HttpMethod,
  url: string,
  body?: TRequest
): Promise<TResponse> => {
  const { token } = useSupabaseSession();
  if (!token) {
    throw new Error("ログイン情報が見つかりません");
  }
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: token,
  };
  try {
    const res = await fetch(url, {
      method,
      headers,
      ...(body && { body: JSON.stringify(body) }),
    });
    if (!res.ok) {
      const errorData = await res.json();
      console.error("APIエラー内容:", errorData);
      throw new Error(errorData.message || "APIリクエストに失敗しました");
    }
    const data = await res.json();
    return data as TResponse;
  } catch (error) {
    if (error instanceof Error) {
      console.error("APIの呼び出しに失敗しました", error.message);
      throw error;
    } else {
      console.error("予期せぬエラーが発生しました", error);
      throw new Error("エラーが発生しました");
    }
  }
};

//共通化したAPI関数
export const api = {
  get: <TResponse>(url: string) => baseFetch<TResponse>("GET", url),
  post: <TResponse, TRequest>(url: string, body: TRequest) =>
    baseFetch<TResponse, TRequest>("POST", url, body),
  put: <TResponse, TRequest>(url: string, body: TRequest) =>
    baseFetch<TResponse, TRequest>("PUT", url, body),
  delete: <TResponse>(url: string) => baseFetch<TResponse>("DELETE", url),
};

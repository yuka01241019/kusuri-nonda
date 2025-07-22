//HTTPメソッドの型
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

//fetch用の共通関数
const baseFetch = async <TResponse, TRequest = undefined>(
  method: HttpMethod,
  url: string,
  body?: TRequest,
  token?:string
): Promise<TResponse> => {
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
  get: <TResponse>(url: string, token: string) =>
    baseFetch<TResponse>("GET", url, undefined, token),
  post: <TResponse, TRequest>(url: string, body: TRequest, token: string) =>
    baseFetch<TResponse, TRequest>("POST", url, body, token),
  put: <TResponse, TRequest>(url: string, body: TRequest, token: string) =>
    baseFetch<TResponse, TRequest>("PUT", url, body, token),
  delete: <TResponse>(url: string, token: string) =>
    baseFetch<TResponse>("DELETE", url,undefined,token),
};

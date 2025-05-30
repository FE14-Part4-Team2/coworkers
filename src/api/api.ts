const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetcher<T>(
  path: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  body?: unknown,
  options?: RequestInit,
): Promise<T> {
  const url = `${BASE_URL}${path}`;
  let contentType: string | null = "application/json";

  const config: RequestInit = {
    method,
    credentials: "include",
    ...options,
  };

  if (body) {
    if (body instanceof FormData) {
      config.body = body;
      contentType = null;
    } else {
      config.body = JSON.stringify(body);
    }
  }

  config.headers = (() => {
    const headers: Record<string, string> = {
      ...(options?.headers as Record<string, string>),
    };
    if (contentType) {
      headers["Content-Type"] = contentType;
    }
    return headers;
  })();

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: response.statusText }));

      if (response.status === 401) {
        // 토큰 만료 시 로직 추가
        throw new Error(errorData.message || "Unauthorized");
      }

      throw new Error(errorData.message || "Error!");
    }

    return (await response.json()) as T;
  } catch (error) {
    throw error;
  }
}

export const api = {
  get: <T>(path: string, options?: RequestInit) =>
    fetcher<T>(path, "GET", undefined, options),
  post: <T>(path: string, body: unknown, options?: RequestInit) =>
    fetcher<T>(path, "POST", body, options),
  patch: <T>(path: string, body: unknown, options?: RequestInit) =>
    fetcher<T>(path, "PATCH", body, options),
  delete: <T>(path: string, options?: RequestInit) =>
    fetcher<T>(path, "DELETE", undefined, options),
};

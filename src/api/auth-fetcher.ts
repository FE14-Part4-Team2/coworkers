async function authFetcher<T>(
  path: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  body?: unknown,
  options?: RequestInit,
): Promise<T> {
  const url = `/api/auth${path}`;
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

  const response = await fetch(url, config);

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: response.statusText }));
    throw new Error(errorData.message || "Error!");
  }

  return (await response.json()) as T;
}

export const authApi = {
  post: <T>(path: string, body: unknown, options?: RequestInit) =>
    authFetcher<T>(path, "POST", body, options),
  delete: <T>(path: string, options?: RequestInit) =>
    authFetcher<T>(path, "DELETE", undefined, options),
};

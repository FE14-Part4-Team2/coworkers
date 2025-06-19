"use client";

const BASE_URL = "/api/proxy";

type FetcherOptions = RequestInit & {
  params?: Record<string, string | number | boolean>;
};

const isBrowser = typeof window !== "undefined";

async function fetcher<T>(
  path: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  body?: unknown,
  options?: FetcherOptions,
  isRetry = false,
): Promise<T> {
  if (!isBrowser) {
    throw new Error("fetcher는 클라이언트 환경에서만 사용 가능합니다.");
  }

  const url = new URL(`${BASE_URL}${path}`, window.location.origin);

  if (options?.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

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

    if (response.status === 204) {
      return null as unknown as T;
    }

    if (!response.ok) {
      const text = await response.text();
      let errorData;
      try {
        errorData = text ? JSON.parse(text) : { message: response.statusText };
      } catch {
        errorData = { message: response.statusText };
      }

      if (response.status === 401 && !isRetry) {
        const refreshRes = await fetch("/api/auth/refresh", {
          method: "POST",
          credentials: "include",
        });

        if (refreshRes.ok) {
          return fetcher<T>(path, method, body, options, true);
        }
      }

      throw new Error(errorData.message || "Error!");
    }

    return (await response.json()) as T;
  } catch (error) {
    throw error;
  }
}

export const api = {
  get: <T>(path: string, options?: FetcherOptions) =>
    fetcher<T>(path, "GET", undefined, options),
  post: <T>(path: string, body: unknown, options?: FetcherOptions) =>
    fetcher<T>(path, "POST", body, options),
  patch: <T>(path: string, body: unknown, options?: FetcherOptions) =>
    fetcher<T>(path, "PATCH", body, options),
  delete: <T>(path: string, options?: FetcherOptions) =>
    fetcher<T>(path, "DELETE", undefined, options),
};

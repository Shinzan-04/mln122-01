import type { ApiResponse } from "../types/api";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.trim() || "https://mln-e03x.onrender.com/api";

async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Request timeout")), ms);
    promise.then(r => { clearTimeout(timer); resolve(r); })
           .catch(e => { clearTimeout(timer); reject(e); });
  });
}

function getAuthToken(): string | null {
  return localStorage.getItem("mln_auth_token");
}

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

export async function requestApi<T>(
  endpoint: string,
  init?: RequestInit,
  timeoutMs = 35000,
  retries = 3
): Promise<T> {
  const token = getAuthToken();
  const hasBody = !!init?.body;

  const headers: Record<string, string> = {
    ...(hasBody ? { "Content-Type": "application/json" } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(init?.headers as Record<string, string> ?? {})
  };

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await withTimeout(
        fetch(`${API_BASE_URL}${endpoint}`, { ...init, headers }),
        timeoutMs
      );

      if (!response.ok) {
        let message = "";
        try {
          const errBody = (await response.json()) as { message?: string; success?: boolean };
          message = errBody.message ?? "";
        } catch { /* ignore parse error */ }
        if (!message) {
          if (response.status === 401) message = "Tên đăng nhập hoặc mật khẩu không đúng.";
          else if (response.status === 403) message = "Bạn không có quyền thực hiện thao tác này.";
          else if (response.status === 404) message = "Không tìm thấy dữ liệu.";
          else if (response.status >= 500) message = "Lỗi máy chủ, vui lòng thử lại sau.";
          else message = `Lỗi ${response.status}: ${response.statusText}`;
        }
        throw new Error(message);
      }

      const payload = (await response.json()) as ApiResponse<T>;
      if (!payload.success) {
        throw new Error(payload.message || "Request failed");
      }

      return payload.data;
    } catch (err) {
      const isNetwork = err instanceof TypeError && err.message === "Failed to fetch";
      if (isNetwork && attempt < retries) {
        await sleep(attempt * 4000);
        continue;
      }
      throw err;
    }
  }

  throw new Error("Request failed after retries");
}
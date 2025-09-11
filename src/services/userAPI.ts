// src/services/userAPI.ts
import { Cookies } from "react-cookie";

const cookies = new Cookies();
// const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8030";
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8030";

/**
 * login - POST /login
 * expects backend route to accept { email, password } and return { token }
 */
export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const message = err?.message || `Login failed: ${res.status}`;
    throw new Error(message);
  }

  const data = await res.json();
  const token = data?.token ?? data?.accessToken ?? null;

  if (!token) throw new Error("No token returned from server");

  // store token in a cookie
  cookies.set("token", token, {
    path: "/", // available across the whole app
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: "lax",
    secure: window.location.protocol === "https:",
  });

  return token;
}

/** get token from cookie */
export function getToken(): string | undefined {
  return cookies.get("token");
}

/** remove token */
export function logout() {
  cookies.remove("token", { path: "/" });
}

/** helper to call protected endpoints with token from cookie */
export async function authFetch(path: string, opts: RequestInit = {}) {
  const token = getToken();
  const headers = new Headers(opts.headers || {});
  headers.set("Content-Type", headers.get("Content-Type") || "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_BASE}${path}`, {
    ...opts,
    headers,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const message = body?.message || `Request failed: ${res.status}`;
    const err: any = new Error(message);
    err.status = res.status;
    err.body = body;
    throw err;
  }

  return res.json().catch(() => null);
}

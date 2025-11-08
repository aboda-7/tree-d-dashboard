import { auth } from "../firebase";

export async function authFetch(url, options = {}) {
  const token = await auth.currentUser?.getIdToken();
  const headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  return fetch(url, { ...options, headers });
}

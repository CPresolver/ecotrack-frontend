import { apiFetch } from "./api";

export async function signIn(email, password) {
  const response = await apiFetch("auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (typeof window !== "undefined") {
    localStorage.setItem("token", response.token);
  }

  return response;
}

export async function signUp(name, email, password) {
  return apiFetch("auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
}

export function signOut() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
}

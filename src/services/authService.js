const API_URL = "https://anastaciopaulino007.pythonanywhere.com/api";

export async function signIn(username, password) {
  const res = await fetch(`${API_URL}/token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) throw new Error("Falha ao autenticar");

  const data = await res.json();
  localStorage.setItem("accessToken", data.access);
  localStorage.setItem("refreshToken", data.refresh);

  const userId = await fetchUserId(data.access, username);
  localStorage.setItem("userId", userId); 

  return data;
}


export async function signUp(username, email, password) {
  const res = await fetch(`${API_URL}/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });

  if (!res.ok) throw new Error("Erro ao registrar usuário");

  const data = await res.json();

  const user = await fetchUserProfile(data.access);

  localStorage.setItem("accessToken", data.access);
  localStorage.setItem("refreshToken", data.refresh);
  localStorage.setItem("userId", user.id);

  return { ...data, user };
}

export async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) throw new Error("Sem refresh token");

  const res = await fetch(`${API_URL}/token/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  if (!res.ok) throw new Error("Falha ao renovar token");

  const data = await res.json();
  localStorage.setItem("accessToken", data.access);
  return data.access;
}

export function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userId"); 
}

async function fetchUserId(token, username) {
  const res = await fetch(`${API_URL}/users/`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error("Falha ao obter lista de usuários");

  const users = await res.json();
  const user = users.find(user => user.username === username);

  if (!user) throw new Error("Usuário não encontrado");
  console.log(user.id)
  return user.id;
}

export async function fetchUserProfile() {
  const token = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");

  if (!token || !userId) throw new Error("Usuário não autenticado");

  const res = await fetch(`${API_URL}/users/${userId}/`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(`Falha ao buscar perfil do usuário: ${res.status} - ${errorMessage}`);
  }

  return res.json();
}

const API_URL = "https://anastaciopaulino007.pythonanywhere.com/api/actions";

async function fetchWithAuth(url, options = {}) {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("Usuário não autenticado. Faça login novamente.");

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Erro na requisição");
  }

  return res.status === 204 ? null : await res.json();
}

export async function createAction(data) {
  return fetchWithAuth(`${API_URL}/`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getActions() {
  return fetchWithAuth(`${API_URL}/`);
}

export async function getActionById(id) {
  return fetchWithAuth(`${API_URL}/${id}/`);
}

export async function updateAction(id, data) {
  return fetchWithAuth(`${API_URL}/${id}/`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteAction(id) {
  return fetchWithAuth(`${API_URL}/${id}/`, {
    method: "DELETE",
  });
}

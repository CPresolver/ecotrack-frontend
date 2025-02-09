const API_URL = "https://anastaciopaulino007.pythonanywhere.com/api/actions";

export async function createAction(data) {
  const res = await fetch(`${API_URL}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Erro ao criar ação");

  const action = await res.json();
  return action;
}

export async function getActions() {
  const res = await fetch(`${API_URL}/`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  if (!res.ok) throw new Error("Erro ao obter ações");

  const actions = await res.json();
  return actions;
}

export async function getActionById(id) {
  const res = await fetch(`${API_URL}/${id}/`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  if (!res.ok) throw new Error("Erro ao obter ação");

  const action = await res.json();
  return action;
}

export async function updateAction(id, data) {
  const res = await fetch(`${API_URL}/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Erro ao atualizar ação");

  const action = await res.json();
  return action;
}

export async function deleteAction(id) {
  const res = await fetch(`${API_URL}/${id}/`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  if (!res.ok) throw new Error("Erro ao deletar ação");

  return res.status === 204;
}

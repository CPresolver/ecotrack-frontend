import { apiFetch } from "./api";

// Listar todas as ações
export async function getActions() {
  return apiFetch("actions", { method: "GET" });
}

// Obter uma ação por ID
export async function getActionById(id) {
  return apiFetch(`actions/${id}`, { method: "GET" });
}

// Criar uma nova ação
export async function createAction(actionData) {
  return apiFetch("actions", {
    method: "POST",
    body: JSON.stringify(actionData),
  });
}

// Atualizar uma ação existente
export async function updateAction(id, actionData) {
  return apiFetch(`actions/${id}`, {
    method: "PUT",
    body: JSON.stringify(actionData),
  });
}

// Excluir uma ação
export async function deleteAction(id) {
  return apiFetch(`actions/${id}`, { method: "DELETE" });
}

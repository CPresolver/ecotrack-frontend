import { createContext, useContext, useState, useEffect } from "react";
import { getActions, createAction, updateAction, deleteAction } from "../services/actionService";

const ActionContext = createContext();

export function ActionProvider({ children }) {
  const [actions, setActions] = useState([]);

  useEffect(() => {
    fetchActions();
  }, []);

  async function fetchActions() {
    try {
      const data = await getActions();
      setActions(data);
    } catch (error) {
      console.error("Erro ao buscar ações:", error);
    }
  }

  async function addAction(actionData) {
    try {
      const newAction = await createAction(actionData);
      setActions([...actions, newAction]);
    } catch (error) {
      console.error("Erro ao criar ação:", error);
    }
  }

  async function editAction(id, actionData) {
    try {
      const updatedAction = await updateAction(id, actionData);
      setActions(actions.map((action) => (action.id === id ? updatedAction : action)));
    } catch (error) {
      console.error("Erro ao atualizar ação:", error);
    }
  }

  async function removeAction(id) {
    try {
      await deleteAction(id);
      setActions(actions.filter((action) => action.id !== id));
    } catch (error) {
      console.error("Erro ao excluir ação:", error);
    }
  }

  return (
    <ActionContext.Provider value={{ actions, addAction, editAction, removeAction, fetchActions }}>
      {children}
    </ActionContext.Provider>
  );
}

export function useActions() {
  return useContext(ActionContext);
}

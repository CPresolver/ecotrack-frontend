"use client"

import { createContext, useContext, useState, useEffect } from "react";
import { getActions, createAction, updateAction, deleteAction } from "@/services/actionService";

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
      console.error("Erro ao buscar ações:", error.message);
    }
  }

  async function addAction(data) {
    try {
      const newAction = await createAction(data);
      setActions((prevActions) => [...prevActions, newAction]);
    } catch (error) {
      console.error("Erro ao adicionar ação:", error.message);
    }
  }

  async function editAction(id, data) {
    try {
      const updatedAction = await updateAction(id, data);
      setActions((prevActions) =>
        prevActions.map((action) =>
          action.id === id ? updatedAction : action
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar ação:", error.message);
    }
  }

  async function removeAction(id) {
    try {
      await deleteAction(id);
      setActions((prevActions) => prevActions.filter((action) => action.id !== id));
    } catch (error) {
      console.error("Erro ao deletar ação:", error.message);
    }
  }

  return (
    <ActionContext.Provider value={{ actions, addAction, editAction, removeAction }}>
      {children}
    </ActionContext.Provider>
  );
}

export function useActions() {
  return useContext(ActionContext);
}

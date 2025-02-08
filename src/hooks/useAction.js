import { useContext } from "react";
import { ActionContext } from "../context/ActionContext";

export function useActions() {
  return useContext(ActionContext);
}

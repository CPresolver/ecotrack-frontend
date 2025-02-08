"use client"

import React from "react";
import FormLayout from "@/app/form";
import { useActions } from "@/context/ActionContext";

const CreateAction = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [points, setPoints] = React.useState("");
  
  const { addAction } = useActions();

  async function handleSubmit(event) {
    event.preventDefault();
    const userId = localStorage.getItem("userId"); 
    if (!userId) {
      console.error("Erro: ID do usuário não encontrado.");
      return;
    }
    await addAction({ title, description, category, points, user: userId });
  }
  

  return (
    <>
      <FormLayout>
      <div>
        <h2 className="uppercase font-bold text-xl">Criar uma nova acção</h2>

        <div className="mt-10">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={title}
              placeholder="Título:"
              className="border p-2 w-full mb-3"
              onChange={({target}) => setTitle(target.value)}
            />
            <textarea
              value={description}
              name="description"
              placeholder="Descrição:"
              className="border p-2 w-full mb-3"
              onChange={({target}) => setDescription(target.value)}
            ></textarea>

            <div className="flex justify-between">
              <div className="w-1/2 mr-2">
                <select value={category} className="border p-2 w-full mb-3"  onChange={({ target }) => setCategory(target.value)} >
                  <option disabled>
                    Categoria
                  </option>
                  <option value="Reciclagem">Reciclagem</option>
                  <option value="Energia">Energia</option>
                  <option value="Água">Água</option>
                  <option value="Mobilidade">Mobilidade</option>
                </select>
              </div>

              <div className="w-1/2">
                <input
                  type="number"
                  value={points}
                  placeholder="Pontos:"
                  className="border p-2 w-full mb-3"
                  onChange={({target}) => setPoints(target.value)}
                />
              </div>
            </div>

            <button type="submit" className="p-2 bg-blue-500 text-white font-bold text-sm uppercase">
              Criar
            </button>
          </form>
        </div>
      </div>
    </FormLayout>
    </>
  );
};

export default CreateAction;

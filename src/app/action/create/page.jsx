"use client";

import React, { useState } from "react";
import FormLayout from "@/app/form";
import { useActions } from "@/context/ActionContext";

const CreateAction = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [points, setPoints] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { addAction } = useActions();

  const username = localStorage.getItem("username")

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);

    if (!title || !description || !category || !points) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    const username = localStorage.getItem("username");
    if (!username) {
      setError("Erro: ID do usuário não encontrado.");
      return;
    }

    setLoading(true);
    try {
      await addAction({ title, description, category, points, user: username });
      setTitle("");
      setDescription("");
      setCategory("");
      setPoints("");
      setError("Criado com sucesso")
    } catch (err) {
      setError(err.message || "Erro ao criar ação.");
    } finally {
      setLoading(false);
    }
  }

  if(!username) return <p>Erro! Usuário não autenticado</p>;

  return (
    <FormLayout>
      <div>
        <h2 className="uppercase font-bold text-xl">Criar uma nova ação</h2>

        <div className="mt-10">
          {error && <div className="bg-blue-300 mb-2 p-2"><p className="text-blue-500">{error}</p></div>}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={title}
              placeholder="Título:"
              className="border p-2 w-full mb-3"
              onChange={({ target }) => setTitle(target.value)}
            />
            <textarea
              value={description}
              placeholder="Descrição:"
              className="border p-2 w-full mb-3"
              onChange={({ target }) => setDescription(target.value)}
            ></textarea>

            <div className="flex justify-between">
              <div className="w-1/2 mr-2">
                <select
                  value={category}
                  className="border p-2 w-full mb-3"
                  onChange={({ target }) => setCategory(target.value)}
                >
                  <option value="" disabled>
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
                  onChange={({ target }) => setPoints(target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className={`p-2 w-full text-white font-bold text-sm uppercase ${loading ? "bg-gray-400" : "bg-blue-500"}`}
              disabled={loading}
            >
              {loading ? "Criando..." : "Criar"}
            </button>
          </form>
        </div>
      </div>
    </FormLayout>
  );
};

export default CreateAction;

"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import FormLayout from "@/app/form";
import { getActionById, updateAction } from "@/services/actionService";

const EditAction = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [points, setPoints] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const { id } = params;
  const router = useRouter();

  const username = localStorage.getItem("username")

  useEffect(() => {
    async function fetchAction() {
      try {
        const action = await getActionById(id);
        
        setTitle(action.title);
        setDescription(action.description);
        setCategory(action.category);
        setPoints(action.points);
        setLoading(false);
      } catch (err) {
        setError("Erro ao carregar a ação");
        setLoading(false);
      }
    }

    fetchAction();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedAction = {
      title,
      description,
      category,
      points,
    };

    try {
      await updateAction(id, updatedAction);
      router.push("/home"); 
    } catch (err) {
      setError("Erro ao atualizar a ação");
    }
  };
  
  if(!username) return <p>Erro! Usuário não autenticado</p>;


  if (loading) {
    return <p>Carregando...</p>;
  }


  return (
    <FormLayout>
      <div>
        <h2 className="uppercase font-bold text-xl">Editar ação de id {id}</h2>

        {error && <p className="text-red-500">{error}</p>}

        <div className="mt-10">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título:"
              className="border p-2 w-full mb-3"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição:"
              className="border p-2 w-full mb-3"
            ></textarea>

            <div className="flex justify-between">
              <div className="w-1/2 mr-2">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="border p-2 w-full mb-3"
                >
                  <option disabled>
                    Selecione a categoria
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
                  onChange={(e) => setPoints(e.target.value)}
                  placeholder="Pontos:"
                  className="border p-2 w-full mb-3"
                />
              </div>
            </div>

            <button
              type="submit"
              className="p-2 bg-blue-500 text-white font-bold text-sm uppercase"
            >
              Editar
            </button>
          </form>
        </div>
      </div>
    </FormLayout>
  );
};

export default EditAction;

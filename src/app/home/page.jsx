"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { getActions, deleteAction } from "@/services/actionService";
import PrivateRoute from "@/hooks/privateRoute";
import { fetchUserProfile } from "@/services/authService";

const HomePage = () => {
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);



  const { username } = fetchUserProfile()

  useEffect(() => {
    async function fetchActions() {
      try {
        const data = await getActions();
        setActions(data);
      } catch (error) {
        console.error("Erro ao buscar ações:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchActions();
  }, []);

  const handleDelete = async (id) => {
    try {
      const isDeleted = await deleteAction(id);
      if (isDeleted) {
        setActions((prevActions) =>
          prevActions.filter((action) => action.id !== id)
        );
      }
    } catch (error) {
      console.error("Erro ao excluir ação:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId"); 
    window.location.reload();
  };
  

  if (loading) return <p>Carregando...</p>;

  return (
    <PrivateRoute>
      <div className="flex justify-center mt-24">
        <div className="w-2/3 p-4 shadow-md">
          <div>
            <div className="py-5">
              <h1 className="text-2xl font-bold uppercase">
                Usuário: {username}
              </h1>
            </div>

            <h2 className="text-xl font-semibold uppercase">
              Ações sustentáveis
            </h2>

            <div className="flex justify-end">
              <button className="p-2 bg-blue-500 text-white font-bold text-sm uppercase">
                <Link href="/action/create">Criar ação</Link>
              </button>
            </div>

            <div>
              <table className="table-auto mt-4 w-full border-collapse border-2 border-gray-200">
                <thead>
                  <tr>
                    <th className="py-4 border-r border-gray-200">Título</th>
                    <th className="border-r border-gray-200">Descrição</th>
                    <th className="border-r border-gray-200">Categoria</th>
                    <th className="border-r border-gray-200">Pontos</th>
                    <th className="border-r border-gray-200">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {actions.map((action) => (
                    <tr key={action.id} className="border border-gray-200">
                      <td className="py-4 border-r border-gray-200 pl-4">
                        {action.title}
                      </td>
                      <td className="py-4 border-r border-gray-200 pl-4">
                        {action.description}
                      </td>
                      <td className="py-4 border-r border-gray-200 pl-4">
                        {action.category}
                      </td>
                      <td className="pl-4 py-4 border-r border-gray-200">
                        {action.points}
                      </td>
                      <td className="pl-4">
                        <button
                          className="bg-red-600 text-white p-2 mr-2"
                          onClick={() => handleDelete(action.id)}
                        >
                          <FaTrash />
                        </button>
                        <button className="bg-yellow-400 text-white p-2">
                          <Link href={`/action/${action.id}`}>
                            <MdEdit />
                          </Link>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-5">
              <button
                onClick={handleLogout}
                className="p-2 bg-blue-500 text-white font-bold text-sm uppercase"
              >
                Terminar sessão
              </button>
            </div>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default HomePage;

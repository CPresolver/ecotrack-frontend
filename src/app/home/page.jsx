"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { getActions, deleteAction } from "@/services/actionService";
import { logout } from "@/services/authService";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("")
  const router = useRouter()

  const username = localStorage.getItem("username")

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

      router.push("/home")
    } catch (error) {
      setError("Erro ao excluir ação:", error)
    }
  };

  const handleLogout = () => {
    logout()
    router.push("/login")
  }
  

  if (loading) return <p>Carregando...</p>;

  if(!username) return <p>Erro! Usuário não autenticado</p>;

  return (
      <div className="flex justify-center mt-24">
        <div className="w-2/3 p-4 shadow-md">
          <div>
            <div className="py-5">
              <h1 className="text-2xl font-bold uppercase">
                Usuário: {username}
              </h1>
            </div>

            {error && (
              <div className="bg-red-400">
                <p className="text-black text-center mb-4">{error}</p>
              </div>
            )}

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
  );
};

export default HomePage;

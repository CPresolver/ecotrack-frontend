"use client"

import React from "react";
import FormLayout from "@/app/form";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const Login = () => {
  const [username, setUserName] = React.useState("")
  const [password, setPassword] = React.useState("")

  const { login } = useAuth();
  const router = useRouter();

  const [message, setMessage] = React.useState("")

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await login(username, password);
      router.push("/home"); 
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setMessage("Erro ao fazer login:", error)
    }
  }


  return (
    <FormLayout>
      <div>
        <h2 className="text-xl font-bold uppercase text-center">Login</h2>
        <div className="mt-4">
          {message && (
            <p className="text-red-600 text-center mb-4">{message}</p>
          )}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={username}
              placeholder="Username:"
              className="border p-2 w-full mb-5"
              onChange={({target}) => setUserName(target.value)}
            />

            <input
              type="password"
              name=""
              placeholder="Senha:"
              className="border p-2 w-full mb-5"
              onChange={({target}) => setPassword(target.value)}
            />

            <button
              type="submit"
              className="p-2 bg-blue-500 text-white font-bold text-sm uppercase hover:bg-blue-600"
            >
              Entrar
            </button>
          </form>

          <p className="mt-5 text-sm">
            Não tem uma conta? <span className="text-blue-700 font-medium underline"><Link href="/register">Criar</Link></span>
          </p>
        </div>
      </div>
    </FormLayout>
  );
};

export default Login;

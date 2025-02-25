"use client"

import React from "react";
import FormLayout from "@/app/form";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const RegisterPage = () => {
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const { register } = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await register(name, email, password);
      router.push("/login"); 
    } catch (error) {
      console.error("Erro ao registrar:", error);
    }
  }

  return (
    <FormLayout>
      <div>
        <h2 className="text-xl font-bold uppercase text-center">Register</h2>
        <div className="mt-4">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={name}
              placeholder="Nome:"
              className="border p-2 w-full mb-5"
              onChange={({ target }) => setName(target.value)}
            />

            <input
              type="email"
              value={email}
              placeholder="Email:"
              className="border p-2 w-full mb-5"
              onChange={({ target }) => setEmail(target.value)}
            />

            <input
              type="password"
              value={password}
              placeholder="Senha:"
              className="border p-2 w-full mb-5"
              onChange={({ target }) => setPassword(target.value)}
            />

            <button
              type="submit"
              className="p-2 bg-blue-500 text-white font-bold text-sm uppercase hover:bg-blue-600"
            >
              Criar conta
            </button>
          </form>

          <p className="mt-5 text-sm">
            Já tem uma conta? <span className="text-blue-700 font-medium underline"><Link href="/login">Entrar</Link></span>
          </p>
        </div>
      </div>
    </FormLayout>
  );
};

export default RegisterPage;

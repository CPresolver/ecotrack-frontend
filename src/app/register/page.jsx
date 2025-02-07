import React from "react";
import FormLayout from "@/form";
import Link from "next/link";

const Register = () => {
  return (
    <FormLayout>
      <div>
        <h2 className="text-xl font-bold uppercase text-center">Register</h2>
        <div className="mt-4">
          <form action="">
            <input
              type="text"
              name=""
              placeholder="Nome:"
              className="border p-2 w-full mb-5"
            />

            <input
              type="email"
              name=""
              placeholder="Email:"
              className="border p-2 w-full mb-5"
            />

            <input
              type="password"
              name=""
              placeholder="Senha:"
              className="border p-2 w-full mb-5"
            />

            <button
              type="button"
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

export default Register;

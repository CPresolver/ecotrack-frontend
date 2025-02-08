"use client";

import { useParams } from "next/navigation";
import React from "react";
import FormLayout from "@/app/form";

const EditAction = () => {
  const params = useParams();
  const { id } = params;

  return (
    <FormLayout>
      <div>
        <h2 className="uppercase font-bold text-xl">
          Editar a acção de id {id}
        </h2>

        <div className="mt-10">
          <form action="">
            <input
              type="text"
              name=""
              placeholder="Título:"
              className="border p-2 w-full mb-3"
            />
            <textarea
              name="description"
              placeholder="Descrição:"
              className="border p-2 w-full mb-3"
            ></textarea>

            <div className="flex justify-between">
              <div className="w-1/2 mr-2">
                <select name="category" className="border p-2 w-full mb-3">
                  <option value="" disabled>
                    Descrição
                  </option>
                  <option value="">lalla</option>
                  <option value="">lalla</option>
                </select>
              </div>

              <div className="w-1/2">
                <input
                  type="number"
                  name="points"
                  placeholder="Pontos:"
                  className="border p-2 w-full mb-3"
                />
              </div>
            </div>

            <button className="p-2 bg-blue-500 text-white font-bold text-sm uppercase">
              Editar
            </button>
          </form>
        </div>
      </div>
    </FormLayout>
  );
};

export default EditAction;

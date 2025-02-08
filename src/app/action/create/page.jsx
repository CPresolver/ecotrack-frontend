import React from "react";
import FormLayout from "@/app/form";

const CreateAction = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [points, setPoints] = useState("");
  
  const { addAction } = useActions();

  async function handleSubmit(event) {
    event.preventDefault();
    await addAction({ title, description, category, points });
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
              name=""
              placeholder="Título:"
              className="border p-2 w-full mb-3"
              onChange={({target}) => setTitle(target.value)}
            />
            <textarea
              name="description"
              placeholder="Descrição:"
              className="border p-2 w-full mb-3"
              onChange={({target}) => setDescription(target.value)}
            ></textarea>

            <div className="flex justify-between">
              <div className="w-1/2 mr-2">
                <select name="category" className="border p-2 w-full mb-3">
                  <option value="" disabled>
                    Categoria
                  </option>
                  <option value="">Reciclagem</option>
                  <option value="">Energia</option>
                  <option value="">Água</option>
                  <option value="">Mobilidade</option>
                </select>
              </div>

              <div className="w-1/2">
                <input
                  type="number"
                  name="points"
                  placeholder="Pontos:"
                  className="border p-2 w-full mb-3"
                  onChange={({target}) => setPoints(target.value)}
                />
              </div>
            </div>

            <button className="p-2 bg-blue-500 text-white font-bold text-sm uppercase">
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

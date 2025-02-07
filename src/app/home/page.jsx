import Link from "next/link";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

export default function HomePage() {
  return (
    <div className="flex justify-center mt-24">
      <div className="w-2/3 p-4 shadow-md rounded-lg">
        <div>
          <h2 className="text-2xl font-bold uppercase">Acção sustentável</h2>

          <div className="flex justify-end">
            <button className="p-2 bg-blue-500 text-white font-bold text-sm uppercase">
              <Link href="/action/create">Criar acção</Link>
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
                </tr>
              </thead>
              <tbody>
                <tr className="border border-gray-200">
                  <td className="py-4 border-r border-gray-200 pl-4">
                    The Sliding
                  </td>
                  <td className="py-4 border-r border-gray-200 pl-4">
                    Malcolm Lockyer
                  </td>
                  <td className="py-4 border-r border-gray-200 pl-4">
                    Malcolm Lockyer
                  </td>
                  <td className="py-4 border-r border-gray-200 pl-4">1961</td>
                  <td className="pl-4">
                    <button className="bg-red-600 text-white p-2 mr-2">
                      <FaTrash />
                    </button>
                    <button className="bg-yellow-400 text-white p-2">
                      <Link href={`action/${1}`}>
                        <MdEdit />
                      </Link>
                    </button>
                  </td>
                </tr>

                <tr className="border border-gray-200">
                  <td className="py-4 border-r border-gray-200 pl-4">
                    Witchy Woman
                  </td>
                  <td className="py-4 border-r border-gray-200 pl-4">
                    The Eagles
                  </td>
                  <td className="py-4 border-r border-gray-200 pl-4">
                    Malcolm Lockyer
                  </td>
                  <td className="pl-4 py-4 border-r border-gray-200">1972</td>
                  <td className="pl-4">
                    <button className="bg-red-600 text-white p-2 mr-2">
                      <FaTrash />
                    </button>
                    <button className="bg-yellow-400 text-white p-2">
                      <Link href={`action/${1}`}>
                        <MdEdit />
                      </Link>
                    </button>
                  </td>
                </tr>

                <tr className="border border-gray-200">
                  <td className="py-4 border-r border-gray-200 pl-4">
                    Shining Star
                  </td>
                  <td className="py-4 border-r border-gray-200 pl-4">
                    Earth, Wind
                  </td>
                  <td className="py-4 border-r border-gray-200 pl-4">
                    Malcolm Lockyer
                  </td>
                  <td className="pl-4 py-4 border-r border-gray-200">1975</td>
                  <td className="pl-4">
                    <button className="bg-red-600 text-white p-2 mr-2">
                      <FaTrash />
                    </button>
                    <button className="bg-yellow-400 text-white p-2">
                      <Link href={`action/${1}`}>
                        <MdEdit />
                      </Link>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-5">
            <button className="p-2 bg-blue-500 text-white font-bold text-sm uppercase">
              <Link href="/action/create">Terminar sessão</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

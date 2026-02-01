export const dynamic = "force-dynamic";
import { getGastoPorUsuario } from "@/app/actions/reports";
import Link from "next/link";

export default async function Reporte4Page(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const cliente = (searchParams.cliente as string) || "";
  const page = Number(searchParams.page) || 1;

  const data = await getGastoPorUsuario({ cliente, page });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Link
        href="/"
        className="text-blue-500 hover:underline mb-4 inline-block"
      >
        ← Volver al Dashboard
      </Link>

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Gasto Acumulado por Cliente (CTE)
        </h1>
        <p className="text-gray-600 mt-2">
          Análisis financiero detallado utilizando Expresiones de Tabla Comunes
          (CTE).
        </p>
      </header>

      <form
        action="/reports/4"
        method="GET"
        className="mb-6 flex gap-2 text-black"
      >
        <input
          type="text"
          name="cliente"
          placeholder="Buscar por nombre..."
          defaultValue={cliente}
          className="border border-gray-300 p-2 rounded-lg w-full md:w-64 text-black bg-white"
        />
        <input type="hidden" name="page" value="1" />{" "}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Buscar
        </button>
      </form>

      <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider">
                Cant. Órdenes
              </th>
              <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider">
                Total Acumulado
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.length > 0 ? (
              data.map((row, index) => (
                <tr
                  key={index}
                  className="hover:bg-indigo-50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {row.cliente}
                  </td>
                  <td className="px-6 py-4 text-center text-gray-600">
                    {row.cantidad_ordenes}
                  </td>
                  <td className="px-6 py-4 text-right text-indigo-700 font-bold">
                    ${Number(row.total_acumulado).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-10 text-center text-gray-400"
                >
                  No se encontraron resultados para "{cliente}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-between items-center bg-white p-4 rounded-lg border">
        <Link
          href={`/reports/4?page=${page > 1 ? page - 1 : 1}&cliente=${cliente}`}
          className={`px-4 py-2 rounded border ${page <= 1 ? "bg-gray-100 text-gray-400 pointer-events-none" : "hover:bg-gray-50"}`}
        >
          Anterior
        </Link>
        <span className="text-sm font-medium">Página {page}</span>
        <Link
          href={`/reports/4?page=${page + 1}&cliente=${cliente}`}
          className={`px-4 py-2 rounded border ${data.length < 5 ? "bg-gray-100 text-gray-400 pointer-events-none" : "hover:bg-gray-50"}`}
        >
          Siguiente
        </Link>
      </div>
    </div>
  );
}

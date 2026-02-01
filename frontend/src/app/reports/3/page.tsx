export const dynamic = "force-dynamic";
import { getTopProductosPaginados } from "@/app/actions/reports";
import Link from "next/link";

export default async function Reporte3Page({
  searchParams,
}: {
  searchParams: any;
}) {
  const currentPage = Number(searchParams.page) || 1;
  const data = await getTopProductosPaginados(currentPage);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Link
        href="/"
        className="text-blue-500 hover:underline mb-4 inline-block"
      >
        ← Volver al Dashboard
      </Link>

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 italic underline">
          Top Productos Estrella
        </h1>
        <p className="text-gray-600 mt-2">
          Listado de productos con más de 5 ventas registradas.
          <span className="block text-sm font-semibold text-blue-600">
            * Paginación y Validación Zod aplicadas.
          </span>
        </p>
      </header>

      <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase">
                Producto
              </th>
              <th className="px-6 py-4 text-center text-xs font-bold uppercase">
                Ventas Realizadas
              </th>
              <th className="px-6 py-4 text-right text-xs font-bold uppercase">
                Monto Total
              </th>
              <th className="px-6 py-4 text-right text-xs font-bold uppercase">
                Precio Promedio
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.length > 0 ? (
              data.map((row, index) => (
                <tr key={index} className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {row.producto}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-sm font-bold">
                      {row.cantidad_ventas}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-green-700 font-bold">
                    ${Number(row.total_ventas).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right text-gray-500 italic">
                    ${Number(row.precio_promedio_venta).toFixed(2)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-10 text-center text-gray-400"
                >
                  No hay más productos que mostrar en esta página.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex justify-between items-center bg-gray-50 p-4 rounded-lg border">
        <Link
          href={`/reports/3?page=${currentPage > 1 ? currentPage - 1 : 1}`}
          className={`px-6 py-2 rounded-lg font-bold transition-all ${
            currentPage <= 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
        >
          Anterior
        </Link>

        <span className="text-gray-700 font-medium">
          Página{" "}
          <span className="bg-blue-600 text-white px-3 py-1 rounded-md">
            {currentPage}
          </span>
        </span>

        <Link
          href={`/reports/3?page=${currentPage + 1}`}
          className={`px-6 py-2 rounded-lg font-bold transition-all ${
            data.length < 5
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
        >
          Siguiente
        </Link>
      </div>
    </div>
  );
}

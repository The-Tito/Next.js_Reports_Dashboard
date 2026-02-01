export const dynamic = "force-dynamic";
import { getUsuariosGastoMayor1500 } from "@/app/actions/reports";
import Link from "next/link";

export default async function Reporte1Page() {
  const data = await getUsuariosGastoMayor1500();

  const usuarioTop = data.length > 0 ? data[0] : null;

  const gastoAcumulado = data.reduce(
    (acc, curr) => acc + Number(curr.gasto_total),
    0,
  );

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
          Gastos realizados por usuarios
        </h1>
        <p className="text-gray-600 mt-2">
          Este reporte analiza el gasto realizado por usuarios y su
          clasificación (Premium o Regular) basado en un umbral mayor a $1,500.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h3 className="text-sm font-semibold text-blue-600 uppercase">
            Usuario con mayor gasto
          </h3>
          <p className="text-3xl font-bold text-blue-900">
            {usuarioTop ? usuarioTop.usuario : "N/A"}
          </p>
          <p className="text-sm text-blue-700 mt-1">
            Total: $
            {usuarioTop ? Number(usuarioTop.gasto_total).toLocaleString() : "0"}
          </p>
        </div>

        {/* KPI: Gasto Acumulado del Segmento */}
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <h3 className="text-sm font-semibold text-green-600 uppercase">
            Gasto Total del Segmento
          </h3>
          <p className="text-3xl font-bold text-green-900">
            ${gastoAcumulado.toLocaleString()}
          </p>
          <p className="text-sm text-green-700 mt-1">
            Usuarios analizados: {data.length}
          </p>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Usuario
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                Ordenes
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Gasto Total
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Promedio
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                Categoría
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                  {row.usuario}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-gray-600">
                  {row.total_ordenes}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-green-600 font-semibold">
                  ${Number(row.gasto_total).toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-gray-600">
                  ${Number(row.gasto_promedio).toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-bold ${
                      row.categoria_cliente === "Premium"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {row.categoria_cliente}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

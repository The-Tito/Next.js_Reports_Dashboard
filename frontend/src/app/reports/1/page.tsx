export const dynamic = "force-dynamic";
import { getVentasPorCategoria } from "@/app/actions/reports";
import Link from "next/link";

export default async function Reporte1Page() {
  const data = await getVentasPorCategoria();

  // Cálculo de KPI
  const ingresoTotalGlobal = data.reduce(
    (acc, curr) => acc + Number(curr.ingresos_totales),
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
          Desempeño de Ventas por Categoría
        </h1>
        <p className="text-gray-600 mt-2">
          Este reporte analiza el volumen de productos vendidos y el ingreso
          generado, segmentado por las categorías principales del sistema.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h3 className="text-sm font-semibold text-blue-600 uppercase">
            Ingresos Totales (Global)
          </h3>
          <p className="text-3xl font-bold text-blue-900">
            ${ingresoTotalGlobal.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Categoría
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                Unidades
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Ingresos Totales
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Ticket Promedio
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                  {row.categoria}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-gray-600">
                  {row.total_unidades_vendidas}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-green-600 font-semibold">
                  ${Number(row.ingresos_totales).toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-gray-600">
                  ${Number(row.ticket_promedio_orden).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

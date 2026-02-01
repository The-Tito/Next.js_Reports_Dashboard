export const dynamic = "force-dynamic";
import { getRankingProductos } from "@/app/actions/reports";
import Link from "next/link";

export default async function Reporte5Page() {
  const data = await getRankingProductos();

  const categoriasAgrupadas = data.reduce((acc: any, item: any) => {
    if (!acc[item.categoria]) acc[item.categoria] = [];
    acc[item.categoria].push(item);
    return acc;
  }, {});

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
          Ranking Interno por Categoría
        </h1>
        <p className="text-gray-600 mt-2">
          Análisis avanzado utilizando{" "}
          <span className="font-mono bg-gray-100 px-1">DENSE_RANK()</span> y
          <span className="font-mono bg-gray-100 px-1 text-xs">
            {" "}
            Window Functions{" "}
          </span>
          para medir el impacto de cada producto en su sección.
        </p>
      </header>

      {Object.keys(categoriasAgrupadas).map((catNombre) => (
        <section key={catNombre} className="mb-12">
          <h2 className="text-xl font-bold text-blue-700 mb-4 border-b-2 border-blue-100 pb-2">
            Categoría: {catNombre}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoriasAgrupadas[catNombre].map((prod: any, idx: number) => (
              <div
                key={idx}
                className={`p-5 rounded-xl border-2 transition-all ${
                  prod.ranking_en_categoria === 1
                    ? "border-yellow-400 bg-yellow-50 shadow-md"
                    : "border-gray-100 bg-white"
                }`}
              >
                <div className="flex justify-between items-start">
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-full ${
                      prod.ranking_en_categoria === 1
                        ? "bg-yellow-400 text-yellow-900"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    #{prod.ranking_en_categoria}
                  </span>
                  <span className="text-xs font-semibold text-gray-400">
                    {prod.porcentaje_contribucion_categoria}% del total
                  </span>
                </div>

                <h3 className="mt-3 font-bold text-lg text-gray-800">
                  {prod.producto}
                </h3>
                <p className="text-2xl font-black text-blue-600 mt-2">
                  ${Number(prod.ingresos_producto).toLocaleString()}
                </p>

                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-4">
                  <div
                    className="bg-blue-500 h-1.5 rounded-full"
                    style={{
                      width: `${prod.porcentaje_contribucion_categoria}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

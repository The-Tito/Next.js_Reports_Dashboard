import Link from "next/link";

export default function Home() {
  const reportes = [
    {
      id: 1,
      nombre: "Ventas por Categoría",
      desc: "Ingresos y tickets promedio por categoría.",
    },
    {
      id: 2,
      nombre: "Usuarios Premium",
      desc: "Listado de clientes con compras mayores a 1500.",
    },
    {
      id: 3,
      nombre: "Top Productos",
      desc: "Productos con más de 5 ventas realizadas.",
    },
    {
      id: 4,
      nombre: "Gasto por Usuario (CTE)",
      desc: "Resumen financiero individual por cliente.",
    },
    {
      id: 5,
      nombre: "Ranking Categorías",
      desc: "Ranking de productos más vendidos usando Window Functions.",
    },
  ];

  return (
    <main className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
        Dashboard de Reportes
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportes.map((rep) => (
          <Link key={rep.id} href={`/reports/${rep.id}`}>
            <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition-all border border-gray-100 cursor-pointer group">
              <h2 className="text-xl font-bold text-blue-600 group-hover:text-blue-800">
                Reporte {rep.id}
              </h2>
              <h3 className="text-lg font-semibold mt-1">{rep.nombre}</h3>
              <p className="text-gray-500 mt-2 text-sm">{rep.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

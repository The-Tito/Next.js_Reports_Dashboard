"use server";
import sql from "@/lib/db";
import { z } from "zod";

export async function getVentasPorCategoria() {
  try {
    const data = await sql`
      SELECT 
        categoria, 
        total_unidades_vendidas, 
        ingresos_totales, 
        ticket_promedio_orden 
      FROM view_ventas_por_categoria
    `;
    return data;
  } catch (error) {
    console.error("Error al obtener el reporte 1:", error);
    throw new Error("Error interno al cargar los datos.");
  }
}

export async function getUsuariosGastoMayor1500() {
  try {
    const data = await sql`
      SELECT 
        usuario, 
        total_ordenes, 
        gasto_total, 
        categoria_cliente,
        gasto_promedio 
      FROM view_usuarios_gasto_mayor_1500
    `;
    return data;
  } catch (error) {
    console.error("Error al obtener el reporte 2:", error);
    throw new Error("Error interno al cargar los datos.");
  }
}

const PaginacionSchema = z.object({
  page: z.coerce.number().min(1).default(1),
});

export async function getTopProductosPaginados(pageParam: number) {
  const validated = PaginacionSchema.parse({ page: pageParam });

  const limit = 5; // Cuántos productos mostrar por página
  const offset = (validated.page - 1) * limit;

  try {
    const data = await sql`
      SELECT * FROM view_top_productos_vendidos_mayor_5
      ORDER BY cantidad_ventas DESC
      LIMIT ${limit}
      OFFSET ${offset}
    `;
    return data;
  } catch (error) {
    console.error("Error al obtener top productos:", error);
    return [];
  }
}

const GastoUsuarioSchema = z.object({
  cliente: z.string().max(50).optional().default(""),
  page: z.coerce.number().min(1).default(1),
});

export async function getGastoPorUsuario(params: {
  cliente?: string;
  page?: number;
}) {
  const { cliente, page } = GastoUsuarioSchema.parse(params);

  const limit = 5;
  const offset = (page - 1) * limit;

  try {
    const data = await sql`
      SELECT * FROM view_gasto_total_por_usuario_cte
      WHERE cliente ILIKE ${"%" + cliente + "%"}
      ORDER BY total_acumulado DESC
      LIMIT ${limit}
      OFFSET ${offset}
    `;
    return data;
  } catch (error) {
    console.error("Error al obtener gasto por usuario:", error);
    return [];
  }
}

export async function getRankingProductos() {
  try {
    const data = await sql`
      SELECT * FROM view_ranking_productos_por_categoria
      ORDER BY categoria ASC, ranking_en_categoria ASC
    `;
    return data;
  } catch (error) {
    console.error("Error en Reporte 5:", error);
    return [];
  }
}

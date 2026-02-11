# 📊 Sistema de Reportes Avanzados - Lab Next.js & PostgreSQL

Este proyecto es una aplicación web full-stack diseñada para la visualización de reportes analíticos de una base de datos de comercio electrónico. Utiliza una arquitectura moderna basada en contenedores, garantizando seguridad y escalabilidad.

## 🚀 Tecnologías Utilizadas

- **Frontend:** [Next.js 15](https://nextjs.org/) (App Router, Server Components).
- **Base de Datos:** [PostgreSQL 16](https://www.postgresql.org/).
- **Contenedores:** [Docker](https://www.docker.com/) & Docker Compose.

## 🛠️ Requisitos e Instalación

### Requisitos Previos

- Docker y Docker Compose instalados.
- Node.js 20+ (solo si se desea desarrollo local fuera de Docker).

### 🚀 Instrucciones de Inicio Rápido (One-Step Setup)

```bash
# 1. Crear el archivo .env
# Se agrega un .env de ejemplo, se debera adaptar al cada caso.
# 2. Levantar la infraestructura
docker compose up --build -d
```

Una vez finalizado, podrás acceder a:

🌐 Frontend: http://localhost:3000

## 📈 Reportes Implementados

El sistema cuenta con 5 reportes estratégicos consumidos exclusivamente a través de **Vistas (Views)**:

1.  **Gasto de Usuarios:** Clasificación dinámica entre usuarios _Premium_ y _Regular_ usando sentencias `CASE`.
2.  **Ventas por Categoría:** Resumen de ingresos y unidades vendidas por departamento.
3.  **Top Productos:** Productos con más de 5 ventas. Implementa **Paginación Server-side** y filtros validados con **Zod**.
4.  **Análisis Financiero (CTE):** Uso de _Common Table Expressions_ para calcular el gasto acumulado histórico por cliente. Incluye buscador por nombre parametrizado.
5.  **Ranking de Categorías:** Uso de **Window Functions** (`DENSE_RANK`) para clasificar productos por éxito de ventas dentro de su propia categoría.

---

## 🛡️ Seguridad y Buenas Prácticas

- **Principio de Menor Privilegio:** La aplicación Next.js se conecta a la base de datos mediante un rol creado, el cual solo tiene permisos de `SELECT` sobre las vistas, protegiendo las tablas base.
- **Server Actions:** Toda la lógica de base de datos se ejecuta en el servidor. No se exponen credenciales ni cadenas de conexión al cliente.
- **Validación de Capas:** Se utiliza **Zod** para interceptar parámetros de URL malformados antes de que lleguen a la capa de persistencia.
- **Renderizado Dinámico:** Se forzó el uso de `force-dynamic` en rutas de reportes para garantizar datos frescos y evitar errores de conexión durante el build de Docker.

---

## 👨‍💻 Autor

- **Luis Antonio Selvas De Leon**
- Fecha: Enero 2026

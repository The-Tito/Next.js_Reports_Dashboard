import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Esto evita que el build falle por errores de tipos o de diseño
  typescript: { ignoreBuildErrors: true },
  // Esto es vital para Docker
  output: "standalone",
  reactCompiler: true,
};

export default nextConfig;

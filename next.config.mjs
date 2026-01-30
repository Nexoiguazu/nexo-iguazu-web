/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },

  // IMPORTANTE para GitHub Pages en /nexo-iguazu-web/
  basePath: "/nexo-iguazu-web",
  assetPrefix: "/nexo-iguazu-web/",
  trailingSlash: true,
}

export default nextConfig

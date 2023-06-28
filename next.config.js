
/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig
// next.config.js
module.exports = {
    async rewrites() {
      return [
        {
          source: '/app/registro',
          destination: 'https://ssf-17-github-io.vercel.app/registro', // Reemplaza con la URL de tu servidor
        },
      ];
    },
  };

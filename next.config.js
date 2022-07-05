const isProduction = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // The path at which the assets and other files (such as html, css, ...)
  // will be served when executing in production environment (GitHub pages)
  basePath: isProduction ? '/3D-Cellular-Automata' : '',
  assetPrefix: isProduction ? '/3D-Cellular-Automata' : '',
};

module.exports = nextConfig;

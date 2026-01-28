/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/line-reach-dashboard',
  assetPrefix: '/line-reach-dashboard',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig

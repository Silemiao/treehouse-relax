/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/treehouse-relax',
  assetPrefix: '/treehouse-relax/',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
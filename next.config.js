/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/treehouse-relax',
  // assetPrefix: '/treehouse-relax/', // Rely on basePath for asset prefixing
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
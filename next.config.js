/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // 启用静态导出
  basePath: '/treehouse-relax',  // 设置基础路径
  images: {
    unoptimized: true,  // GitHub Pages 不支持图片优化
  },
} 
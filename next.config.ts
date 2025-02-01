import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Jika menggunakan gambar bawaan Next.js
  },
};

export default nextConfig;

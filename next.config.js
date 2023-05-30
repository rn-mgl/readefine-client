/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    NEXTAUTH_SECRET: "Zq4t7w!z%C*F-JaNdRgUjXn2r5u8x/A?",
    NEXTAUTH_URL: "http://localhost:3000",
  },
  reactStrictMode: false,
  optimizeFonts: false,
};

module.exports = nextConfig;

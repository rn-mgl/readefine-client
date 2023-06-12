/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    ENC_SECRET: "2oR/qngblDZSxWzUntrLs9CHg8hFf/6jSZLCN5m4ACgRYETVY+HSKZrGk6ctaaug",
    NEXTAUTH_SECRET: "Zq4t7w!z%C*F-JaNdRgUjXn2r5u8x/A?",
    NEXTAUTH_URL: "http://localhost:3000",
  },
  reactStrictMode: false,
  optimizeFonts: false,
};

module.exports = nextConfig;

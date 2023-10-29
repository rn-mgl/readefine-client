/** @type {import('next').NextConfig} */

const local = "http://localhost:3000";
const prod = "https://readefine.vercel.app";

const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "res.cloudinary.com" }],
  },
  env: {
    NEXTAUTH_SECRET: "Zq4t7w!z%C*F-JaNdRgUjXn2r5u8x/A?",
    NEXTAUTH_URL: prod,
  },
  reactStrictMode: true,
};

const mp3Config = {
  webpack(config, options) {
    const { isServer } = options;
    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
      exclude: config.exclude,
      use: [
        {
          loader: require.resolve("url-loader"),
          options: {
            limit: config.inlineImageLimit,
            fallback: require.resolve("file-loader"),
            publicPath: `${config.assetPrefix}/_next/static/images/`,
            outputPath: `${isServer ? "../" : ""}static/images/`,
            name: "[name]-[hash].[ext]",
            esModule: config.esModule || false,
          },
        },
      ],
    });

    return config;
  },
};

module.exports = { ...nextConfig, ...mp3Config };

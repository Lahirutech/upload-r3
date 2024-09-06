/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-b53202eb4b434961a589daddb8a6bac9.r2.dev",
      },
    ],
  },
};

export default nextConfig;

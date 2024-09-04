/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_API: "http://localhost:2024/",
  },
};

export default nextConfig;

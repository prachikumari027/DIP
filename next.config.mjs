/** @type {import('next').NextConfig} */
const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

const nextConfig = {
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;

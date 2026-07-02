import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/for-professionals",
        destination: "/professionals",
        permanent: true,
      },
      {
        source: "/for-practices",
        destination: "/practices",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

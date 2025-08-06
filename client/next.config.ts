import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["http://localhost:3000", "http://192.168.84.165:3000"],
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.118.165",
      },
    ],
  },
};

export default nextConfig;

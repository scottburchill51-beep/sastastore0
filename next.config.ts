
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: false,
        missing: [
          {
            type: "cookie",
            key: "ss_access",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

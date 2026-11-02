import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      { source: "/impressum", destination: "/imprint", permanent: true },
      { source: "/datenschutzerklaerung", destination: "/datenschutz", permanent: true },
    ];
  },
};

export default nextConfig;

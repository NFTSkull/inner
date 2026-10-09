import type { NextConfig } from "next";
import { REDIRECTS_LEGACY } from "./lib/data/rutas";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return REDIRECTS_LEGACY.map(({ source, destination }) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "apewlcxfwtbhledtiobs.supabase.co",
        pathname: "/storage/v1/object/public/profile.pictures/**",
      },
    ],
  },
};

export default nextConfig;

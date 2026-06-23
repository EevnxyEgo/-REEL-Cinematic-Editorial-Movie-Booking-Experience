import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // TMDB serves poster/backdrop art from this CDN without an API key.
    // Real imagery only renders when a key supplies live "now playing" data;
    // the bundled demo uses art-directed typographic posters instead.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**",
      },
    ],
  },
};

export default nextConfig;

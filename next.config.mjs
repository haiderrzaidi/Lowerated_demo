// next.config.mjs
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
        port: "", // Leave empty unless the images are served from a specific port
        pathname: "/**", // Allows all paths under img.clerk.com
      },
    ],
  },
};

export default nextConfig;

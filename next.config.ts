import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow hot reload (HMR) when accessing the dev server via LAN IP,
  // not just localhost (e.g. from a phone/another device on the network).
  allowedDevOrigins: ["192.168.100.84"],
};

export default nextConfig;

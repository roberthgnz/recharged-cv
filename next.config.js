/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["avatar.vercel.sh", "avatars.githubusercontent.com"],
  },
}

module.exports = nextConfig

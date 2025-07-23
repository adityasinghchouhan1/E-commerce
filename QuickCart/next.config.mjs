/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '**',
      },
      {
        protocol: 'http', // 👈 Add this for local development
        hostname: 'localhost',
        port: '8008', // 👈 Your backend port
        pathname: '**',
      },
    ],
  },
}

export default nextConfig

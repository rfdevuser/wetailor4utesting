/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      domains: [
          'www.onatiglobal.com', // Your first domain
          'firebasestorage.googleapis.com', // Your second domain
      ],
  },
};

export default nextConfig;

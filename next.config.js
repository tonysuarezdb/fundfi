/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Uncomment when connecting to the real API to allow its image domains
  // images: {
  //   domains: ['api.fundfi.com'],
  // },

  // Security headers — enable in production
  // async headers() {
  //   return [
  //     {
  //       source: '/(.*)',
  //       headers: [
  //         { key: 'X-Frame-Options', value: 'DENY' },
  //         { key: 'X-Content-Type-Options', value: 'nosniff' },
  //         { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  //       ],
  //     },
  //   ];
  // },
};

module.exports = nextConfig;

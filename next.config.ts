import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allowed dev origins - hanya aktif di development
  ...(process.env.NODE_ENV === 'development' && {
    allowedDevOrigins: ['localhost', '127.0.0.1', '[::1]'],
  }),

  // Optimisasi untuk Vercel/production
  compress: true,

  // Headers keamanan
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

export default nextConfig;

/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  swcMinify: false,
  eslint: {
    dirs: ['.'],
  },
  images: {
    remotePatterns: [{protocol : "https", hostname: "**"}],
    // remotePatterns: ['res.cloudinary.com', 'loremflickr.com' ,'countryflagsapi.com'],
  },
  poweredByHeader: false,
  trailingSlash: false,
  basePath: '',
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // The starter code load resources from `public` folder with `router.basePath` in React components.
  // So, the source code is "basePath-ready".
  // You can remove `basePath` if you don't need it.
  reactStrictMode: false,
});

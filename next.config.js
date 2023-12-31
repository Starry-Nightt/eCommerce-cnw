module.exports = {
  reactStrictMode: true,
  env: {
    API: process.env.API,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

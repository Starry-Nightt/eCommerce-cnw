module.exports = {
  reactStrictMode: true,
};
module.exports = {
  // Cấu hình khác...
  async rewrites() {
    return [
      {
        source: '/profile/:userId',
        destination: '/[userId]',
      },
    ];
  },
};


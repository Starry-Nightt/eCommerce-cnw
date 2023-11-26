module.exports = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/book",
        permanent: true,
      },
    ];
  },
};

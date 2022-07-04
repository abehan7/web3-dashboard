/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "gateway.pinata.cloud",
      "zumbalabstest123123.mypinata.cloud",
      "ipfs.io",
    ],
  },
};

module.exports = nextConfig;

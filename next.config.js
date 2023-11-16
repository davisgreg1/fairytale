/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["stars-test.s3.amazonaws.com", "lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;

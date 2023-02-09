const withPWA = require('next-pwa');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
    swSrc: "service-worker.js",
  },
  env: {
    wordpressUrl: `https://learn.codethedream.org/wp-json/wp/v2/pages/`,
  },
};

module.exports = withPWA(nextConfig)
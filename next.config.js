const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV !== "production",
  swSrc: "service-worker.js",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    wordpressUrl: `https://learn.codethedream.org/wp-json/wp/v2/pages/`,
    wordpressParentId: `https://learn.codethedream.org/wp-json/wp/v2/pages?parent=378`,
  },
};

module.exports = withPWA(nextConfig);

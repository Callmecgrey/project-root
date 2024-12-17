// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // ...other configurations
  
    images: {
      domains: ['storage.eliteresidences.cloud'], // Add any other domains you use
    },
  };
  
  module.exports = nextConfig;
  
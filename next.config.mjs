/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "m.media-amazon.com",
      "images-na.ssl-images-amazon.com",
      "download.schneider-electric.com",
      "i.ebayimg.com",
      "www.tsisolutions.us",
      "drive.google.com",
      "localhost",
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // Increase body size limit to 10 MB
    },
  },
};

export default nextConfig;

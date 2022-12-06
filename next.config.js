/** @type {import('next').NextConfig} */

const env = {
  "APP_LOCALE": "en",
  "APP_APPLE_TOUCH_ICON": "/favicon128.png",
  "APP_FAVICON_16x16": "/favicon32.png",
  "APP_FAVICON_32x32": "/favicon16.png",

  "APP_TITLE": "Vortex - User and Event Management",
  "APP_DESCRIPTION": "Vortex is a User and Event management platform.",
  "APP_TYPE": "website",
  "APP_URL": "https://vortex.vercel.app",
  "APP_IMAGE": "https://vortex.vercel.app/og-image.png",
  "APP_IMAGE_TYPE": "image/png",
  "APP_IMAGE_WIDTH": "1200",
  "APP_IMAGE_HEIGHT": "630",
  "APP_SITE_NAME": "Vortex",
  "API_URL": "https://vortex.vercel.app/api"
};

const nextConfig = {
  env,
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig

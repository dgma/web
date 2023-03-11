const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  sentry: {
    hideSourceMaps: true,
  }
}

module.exports = withSentryConfig(
  nextConfig,
  { silent: true },
);

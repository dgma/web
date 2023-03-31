const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  sentry: {
    hideSourceMaps: true,
    disableServerWebpackPlugin: !process.env.SENTRY_DSN,
    disableClientWebpackPlugin: !process.env.NEXT_PUBLIC_SENTRY_DSN,
  },
  env: {
    networkName: process?.env?.NETWORK_NAME || 'rabbit.dev',
    chainId: process?.env?.CHAIN_ID_HEX || '0x658d8',
    rpc: process?.env?.RPC || 'https://dev.dgma.dev:8441',
  }
}

module.exports = withSentryConfig(
  nextConfig,
  { silent: true },
);

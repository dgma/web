/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  env: {
    deploymentNetwork: process.env.DEPLOYMENT_NETWORK_NAME,
    chainId: process.env.CHAIN_ID_HEX,
    rpc: process.env.RPC,
    suspendMsg: process.env.SUSPEND_WEBSITE_MSG,
    web3ModalProjectId: process.env.NEXT_PUBLIC_WEB3_MODAL_PROJECT_ID,
  },
};

module.exports = nextConfig;

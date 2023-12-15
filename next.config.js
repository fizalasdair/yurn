/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  images: {
    domains: ["ipfscdn.io","gateway.ipfscdn.io","26079c98898e768e9280557a2911ed05.ipfscdn.io","bafybeic57pzswj4e3sbxhhla2sjpsil37yywpt7g4o34j2whc3l2hhepqq.ipfs.cf-ipfs.com"],
  },
};

module.exports = nextConfig;

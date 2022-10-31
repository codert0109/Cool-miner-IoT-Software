export const publicConfig = {
  isProd: process.env.PROD,
  infuraId: process.env.INFURA_ID || '9aa3d95b3bc440fa88ea12eaa4456161',
  APIURL: process.env.APIURL,
  DEVICE_URL : 'http://localhost:4321',
  // BACKEND_URL : 'http://localhost:3334'
  BACKEND_URL : 'https://miner.elumicate.com',
  // BACKEND_URL : 'https://miner.elumicate.com',
  TOKEN_UNIT : BigInt(Math.pow(10, 18)),
};
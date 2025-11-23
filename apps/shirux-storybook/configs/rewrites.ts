import envVariable from './env';

const apiRewrites =
  process.env.NODE_ENV === 'development'
    ? [
        {
          source: `/api/:path*`,
          destination: `${envVariable.API_URL}/api/:path*`,
        },
      ]
    : [];

/** @type {import('next').NextConfig['rewrites']} */
const nextRewrites = async () => {
  return [...apiRewrites];
};

export default nextRewrites;

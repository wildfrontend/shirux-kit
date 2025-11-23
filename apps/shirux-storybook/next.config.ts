import type { NextConfig } from 'next';

import envVariable from './configs/env';
import nextRewrites from './configs/rewrites';
import nextWebpack from './configs/webpack';

const nextConfig: NextConfig = {
  transpilePackages: ['@shirux/rux-ui'],
  env: envVariable,
  rewrites: nextRewrites,
  webpack: nextWebpack,
  turbopack: {
    rules: {
      '*.svg': {
        loaders: [
          {
            loader: '@svgr/webpack',
            options: {
              svgoConfig: {
                plugins: [
                  {
                    name: 'preset-default',
                    params: {
                      overrides: {
                        removeViewBox: false,
                      },
                    },
                  },
                ],
              },
            },
          },
        ],
        as: '*.js',
      },
    },
  },
};

export default nextConfig;

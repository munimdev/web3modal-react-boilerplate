const webpack = require('webpack');
module.exports = function override(config, env) {
  //do stuff with the webpack config...

  config.resolve.fallback = {
    url: require.resolve('url'),
    assert: require.resolve('assert'),
    crypto: require.resolve('crypto-browserify'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    os: require.resolve('os-browserify/browser'),
    buffer: require.resolve('buffer'),
    stream: require.resolve('stream-browserify')
  };
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  );

  return {
    ...config,
    // This is needed to not show the warning about this modules don't have src files, only on dist (build)
    ignoreWarnings: [
      {
        module: /node_modules\/@walletconnect/,
      },
      {
        module: /node_modules\/eth-rpc-errors/,
      },
      {
        module: /node_modules\/json-rpc-engine/,
      },
      {
        module: /node_modules\/@metamask/,
      },
      {
        module: /node_modules\/@gnosis.pm/,
      },
      {
        module: /node_modules\/@web3-react/,
      },
      {
        module: /node_modules\/web3/,
      },
      {
        module: /node_modules\/@ethersproject/,
      },
      {
        module: /node_modules\/@ethersproject\/abi/,
      },
      {
        module: /node_modules\/ethereumjs-util/,
      },
      {
        module: /node_modules\/ethereumjs-abi/,
      },
      {
        module: /node_modules\/xhr2-cookies/,
      }
    ],
  };
};
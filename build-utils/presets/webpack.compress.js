/* eslint-disable @typescript-eslint/no-var-requires */
const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = () => ({
  plugins: [new CompressionWebpackPlugin()],
});

/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');

const modeConfig = (mode) => require(`./build-utils/webpack.${mode}`)(mode);

module.exports = ({ mode, presets } = { mode: 'production', presets: [] }) => {
  return merge(
    {
      mode,
      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
      module: {
        rules: [
          {
            test: /\.ts$/i,
            exclude: /node_modules/,
            loader: 'ts-loader',
          },
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
          },
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
          },
          {
            test: /\.hbs$/i,
            loader: 'handlebars-loader',
          },
        ],
      },
      plugins: [new HtmlWebpackPlugin()],
    },
    modeConfig(mode)
  );
};
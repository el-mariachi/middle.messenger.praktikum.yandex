/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('webpack-merge');

const applyPresets = (env = { presets: [] }) => {
  const presets = env.presets || []; // presets is undefined if not supplied via cli resulting in an error when mapping
  /** @type {string[]} */

  const mergedPresets = [].concat(...[presets]); // flatten input into a single array of strings

  const mergedConfigs = mergedPresets.map(
    (presetName) => require(`./presets/webpack.${presetName}`)(env) // call the preset and pass env also
  );
  return merge({}, ...mergedConfigs);
};

module.exports = applyPresets;

const path = require('path');
const rootPathSrc = path.resolve(__dirname, '../src');
const rootPath = path.resolve(__dirname, '..');

module.exports = ({ config }) => {
  config.module.rules.push(
    {
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: 'babel-loader'
        },
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            appendTsSuffixTo: [/\.vue$/]
          }
        }
      ]
    },
    {
      test: /\.scss$/,
      use: [
        'vue-style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[name]__[local]'
            }
          }
        },
        'postcss-loader',
        {
          loader: 'sass-loader',
          options: {
            prependData: `
						@import "@/assets/scss/mixins.scss";
						@import "@/assets/scss/variables.scss";
					`
          }
        }
      ]
    }
  );
  config.resolve.extensions.push('.ts', '.tsx');
  config.resolve.alias['@'] = rootPathSrc;
  config.resolve.alias['~'] = rootPath;

  return config;
};

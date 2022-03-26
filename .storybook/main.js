const path = require('path');


module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  output: {
    publicPath: process.env.STORYBOOK_BASE_URL || '/',
  },

  webpackFinal: async config => {
    config.resolve.alias = {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, "../src")
    }
    config.output.publicPath = process.env.STORYBOOK_BASE_URL || '/'

    config.module.rules.push({

        test: /\.scss$/,
        oneOf: [
          {
            resourceQuery: /module/,
            use: [
              'vue-style-loader',
              {
                loader: 'css-loader', //not absolute path, so uses root css-loader in package.json
                options: { modules: { localIdentName: '[name]-[hash]' } }
              },
              'sass-loader'
            ]
          },
          { use: [ 'vue-style-loader', 'css-loader', 'sass-loader' ] }
        ]

    });

    let rule = config.module.rules.find(r =>
        // it can be another rule with file loader
        // we should get only svg related
        r.test && r.test.toString().includes('svg') &&
        // file-loader might be resolved to js file path so "endsWith" is not reliable enough
        r.loader && r.loader.includes('file-loader')
    );
    rule.test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/;


    config.module.rules.push({
      test: /\.svg$/,
      use: [
        'babel-loader',
        'vue-svg-loader',
      ],
    })

    return config;
  }
};

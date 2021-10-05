// import {RuleSetRule} from 'webpack';

module.exports = {
  rules: [{
    // test: /(\.jpe?g|\.webp|\.png|\.ico)$/,
    test: /\.(png|jpe?g|gif)$/i,
    use: [
      {
        loader: 'file-loader',
        // options: {
        //   name: '[name].[ext]',
        //   outputPath: 'images/',
        // },
      },
    ],
  }]
};
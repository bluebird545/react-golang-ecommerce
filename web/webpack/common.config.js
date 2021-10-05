const webpack = require('webpack');
const alias = require('./alias.js');
// const rules = require('./rules.js');

module.exports = () => {
  return {
    resolve: {
      ...alias,
      ...rules,
      extenions: ['.js', '.ts', '.tsx']
    }
  }
};
const path = require('path');

const root = path.resolve(__dirname, '../');
module.exports = {
  alias: {
    '@components': path.resolve(root, 'src/components'),
    '@assets': path.resolve(root, 'src/assets')
  }
};
const path = require('path');
const withImages = require('next-images');

module.exports = withImages({
  fileExtensions: ['jpg', 'jpeg', 'png', 'svg'],
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  webpack (config) {
    config.resolve.alias['@'] = path.join(__dirname, 'src');
    return config;
  },
});

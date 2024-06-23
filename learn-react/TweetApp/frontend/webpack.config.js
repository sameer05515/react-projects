const path = require('path');

module.exports = {
  // ... other webpack configuration ...
  resolve: {
    fallback: {
      "buffer": require.resolve("buffer/")
    }
  }
};
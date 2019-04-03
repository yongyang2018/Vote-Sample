/* eslint-disable no-alert, no-console */

module.exports = {
    css: {
      loaderOptions: {
        sass: {
          data: `
            @import "src/assets/css/_variables.scss";
          `
        }
      }
    }
};
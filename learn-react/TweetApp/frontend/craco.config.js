module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.module.rules.forEach((rule) => {
        if (!rule.oneOf) return;

        rule.oneOf.forEach((oneOfRule) => {
          if (oneOfRule.test && oneOfRule.test.toString().includes("mjs")) {
            oneOfRule.resolve = {
              ...(oneOfRule.resolve || {}),
              fullySpecified: false,
            };
          }
        });
      });

      return webpackConfig;
    },
  },
};

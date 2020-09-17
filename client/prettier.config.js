module.exports = {
    singleQuote: true,
    trailingComma: 'all',
    overrides: [
      {
        files: 'script/**/*.js',
        options: {
          trailingComma: 'es5',
        },
      },
    ],
  };

const airbnb = require("@neutrinojs/airbnb");
const react = require("@neutrinojs/react");
const mocha = require("@neutrinojs/mocha");

module.exports = {
  options: {
    root: __dirname,
  },
  use: [
    airbnb({
      eslint: {
        rules: {
          "jsx-a11y/media-has-caption": "off",
          "no-console": "off",
          "no-shadow": "off",
          "react/prop-types": "off",
          "import/prefer-default-export": "off",
          "import/no-extraneous-dependencies": "off",
        },
      },
    }),
    react({
      html: {
        title: "vinto",
      },
    }),
    mocha(),
  ],
};

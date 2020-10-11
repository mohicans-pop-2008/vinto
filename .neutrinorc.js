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

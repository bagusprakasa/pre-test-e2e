const { defineConfig } = require("cypress");
const browserify = require("@cypress/browserify-preprocessor");
const dotenv = require("dotenv");
// import dotenv from "dotenv";
dotenv.config();

module.exports = defineConfig({
  viewportWidth: 1000,
  viewportHeight: 660,
  video: false,
  chromeWebSecurity: false,
  defaultCommandTimeout: 10000,
  env: {
    baseUrl: process.env.BASE_URL
  },
  reporter: "cypress-mochawesome-reporter",
  screenshotOnRunFailure: true,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require("cypress-mochawesome-reporter/plugin")(on);
      let options = browserify.defaultOptions;
      options.browserifyOptions.transform[1][1].plugins.push([
        "module-resolver",
        {
          alias: {
            "@tests": "./tests",
            "@helpers": "./tests/helpers"
          }
        }
      ]);
      on("file:preprocessor", browserify(options));
    },
    specPattern: "tests/scenarios/**/*.test.js"
  }
});

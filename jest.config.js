module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
    "@tests(.*)$": "<rootDir>/tests/$1"
  },
  verbose: true
};

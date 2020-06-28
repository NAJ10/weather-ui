module.exports = {
  extends: ["airbnb-typescript-prettier"],
  plugins: ["jest"],
  env: {
    "jest/globals": true
  },
  rules: {
    "no-console": "off",
    "react/destructuring-assignment": "off",
    "@typescript-eslint/no-this-alias": "off",
  }
};

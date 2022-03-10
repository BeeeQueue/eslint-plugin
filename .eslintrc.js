module.exports = {
  root: true,
  extends: [
    "plugin:@beequeue/base",
    "plugin:@beequeue/node",
    "plugin:@beequeue/typescript",
  ],
  rules: {
    "@typescript-eslint/naming-convention": "off",
  },
}

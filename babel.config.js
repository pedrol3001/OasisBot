module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
  ],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@error": "./src/error/",
          "@command": "./src/command/",
          "@database": "./src/database/",
          "@repositories": "./src/repositories/",
          "@plugins_template": "./src/plugins/template/",
          "@guilds_repo": "./src/repositories/guild/",
          "@plugins_repo": "./src/repositories/plugin/"
        },
      },
    ],
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
  ],
};

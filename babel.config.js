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
          "@error": "./src/shared/error/",
          "@config": "./src/config",
          "@discord": "./src/shared/infra/discord/",
          "@command": "./src/shared/infra/discord/command/",
          "@database": "./src/shared/infra/database/",
          "@repositories": "./src/repositories/",
          "@guilds_repo": "./src/repositories/guild/",
          "@plugins_repo": "./src/repositories/plugin/"
        },
      },
    ],
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    ["@babel/plugin-proposal-private-property-in-object", { loose: true }]
  ],
};

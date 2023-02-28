const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("../tsconfig.json");

module.exports = {
  rootDir: "../",
  preset: "ts-jest",
  moduleDirectories: ["node_modules"],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(
      {
        ...compilerOptions.paths,
        "tests/*": ["./tests/*"],
      },
      {
        prefix: "<rootDir>/tests/../",
      }
    ),
  },
};

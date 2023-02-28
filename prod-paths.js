const tsConfig = require("./tsconfig.json");
const tsConfigPaths = require("tsconfig-paths");

const paths = tsConfig.compilerOptions.paths;
console.log(paths);

tsConfigPaths.register({
  baseUrl: tsConfig.compilerOptions.outDir,
  paths: Object.keys(paths).reduce(
    (agg, key) => ({
      ...agg,
      [key]: paths[key].map((p) => p.replace("src/", "").replace(".ts", ".js")),
    }),
    {}
  ),
});

const { getDefaultConfig } = require("@expo/metro-config");
const findUp = require("find-up");
const fs = require("fs");
const path = require("path");

const projectPath = __dirname;
const workspacePath = getWorkspaceRoot(__dirname);

const config = getDefaultConfig(projectPath);

// We want to watch all folders in the monorepo, instead of just `apps/managed`
config.watchFolders = [workspacePath];
// Modules can be hoisted to root or installed locally, resolve in this order.
config.resolver.nodeModulesPaths = [
  path.join(projectPath, "node_modules"),
  path.join(workspacePath, "node_modules"),
];

module.exports = config;

function getWorkspaceRoot(cwd) {
  return findUp.sync(
    (directory) => {
      const filePath = path.join(directory, "package.json");
      const fileContent = fs.existsSync(filePath)
        ? fs.readFileSync(filePath, "utf-8")
        : null;

      if (fileContent && Array.isArray(JSON.parse(fileContent).workspaces)) {
        return directory;
      }
    },
    {
      type: "directory",
      cwd: path.join(cwd, ".."),
    }
  );
}

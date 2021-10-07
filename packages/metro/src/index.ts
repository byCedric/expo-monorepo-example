import { getDefaultConfig } from "@expo/metro-config";
import findUp from "find-up";
import fs from "fs";
import path from "path";

export type MonorepoOptions = {
  /** The root of the monorepo, should be automatically detected */
  workspaceRoot?: string;
};

export function withMonorepo(
  config: ReturnType<typeof getDefaultConfig>,
  options: MonorepoOptions = {}
) {
  if (!config.projectRoot) {
    throw new Error(
      "Project root is not defined, make sure you are using @expo/metro-config"
    );
  }

  // Use the hardcoded workspace path, or try to resolve this automatically
  options.workspaceRoot =
    options.workspaceRoot || getWorkspaceRoot(config.projectRoot);

  if (!options.workspaceRoot) {
    throw new Error(
      "Could not resolve the root of your monorepo, please set this manually with `workspacePath`"
    );
  }

  // We want to watch all folders in the monorepo, instead of just `apps/<app>`
  config.watchFolders = [options.workspaceRoot];
  // Modules can be hoisted to root or installed locally, resolve in this order.
  config.resolver.nodeModulesPaths = [
    path.join(config.projectRoot, "node_modules"),
    path.join(options.workspaceRoot, "node_modules"),
  ];

  return config;
}

function getWorkspaceRoot(cwd: string): string | undefined {
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

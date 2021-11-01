const {
  withDangerousMod,
  WarningAggregator,
  AndroidConfig,
  withAppBuildGradle,
  withSettingsGradle,
} = require("@expo/config-plugins");
const fs = require("fs");
const path = require("path");

function getMMKVJSIModulePackage(packageName) {
  return `package ${packageName};

import com.facebook.react.bridge.JSIModuleSpec;
import com.facebook.react.bridge.JavaScriptContextHolder;
import com.facebook.react.bridge.ReactApplicationContext;

import com.swmansion.reanimated.ReanimatedJSIModulePackage;
import com.reactnativemmkv.MmkvModule;

import java.util.Collections;
import java.util.List;

public class MMKVJSIModulePackage extends ReanimatedJSIModulePackage {
    @Override
    public List<JSIModuleSpec> getJSIModules(ReactApplicationContext reactApplicationContext, JavaScriptContextHolder jsContext) {
        super.getJSIModules(reactApplicationContext, jsContext);
        MmkvModule.install(jsContext, reactApplicationContext.getFilesDir().getAbsolutePath() + "/mmkv");
        return Collections.emptyList();
    }
}`;
}

async function readFileAsync(path) {
  return fs.promises.readFile(path, "utf8");
}

async function saveFileAsync(path, content) {
  return fs.promises.writeFile(path, content, "utf8");
}

function getPackageRoot(projectRoot) {
  return path.join(projectRoot, "android", "app", "src", "main", "java");
}

function getCurrentPackageName(projectRoot, packageRoot) {
  const mainApplication = AndroidConfig.Paths.getProjectFilePath(
    projectRoot,
    "MainApplication"
  );
  const packagePath = path.dirname(mainApplication);
  const packagePathParts = path
    .relative(packageRoot, packagePath)
    .split(path.sep)
    .filter(Boolean);

  return packagePathParts.join(".");
}

async function editMainApplication(config, action) {
  const mainApplicationPath = AndroidConfig.Paths.getProjectFilePath(
    config.modRequest.projectRoot,
    "MainApplication"
  );

  try {
    const mainApplication = action(await readFileAsync(mainApplicationPath));
    return await saveFileAsync(mainApplicationPath, mainApplication);
  } catch (e) {
    WarningAggregator.addWarningAndroid(
      "react-native-mmkv",
      `Couldn't modify MainApplication.java - ${e}.`
    );
  }
}

async function createMMKVJSIModulePackage(config) {
  const projectRoot = config.modRequest.projectRoot;
  const packageRoot = getPackageRoot(projectRoot);
  const packageName = getCurrentPackageName(projectRoot, packageRoot);
  const filePath = path.join(
    packageRoot,
    `${packageName.split(".").join("/")}/MMKVJSIModulePackage.java`
  );

  try {
    return await saveFileAsync(filePath, getMMKVJSIModulePackage(packageName));
  } catch (e) {
    WarningAggregator.addWarningAndroid(
      "react-native-mmkv",
      `Couldn't create MMKVJSIModulePackage.java - ${e}.`
    );
  }
}

const withMMKVJSIModulePackage = (config) => {
  return withDangerousMod(config, [
    "android",
    async (config) => {
      await createMMKVJSIModulePackage(config);

      return config;
    },
  ]);
};

const withMainApplication = (config) => {
  return withDangerousMod(config, [
    "android",
    async (config) => {
      await editMainApplication(config, (mainApplication) => {
        const projectRoot = config.modRequest.projectRoot;
        const packageRoot = getPackageRoot(projectRoot);
        const packageName = getCurrentPackageName(projectRoot, packageRoot);
        const importStatement = `import ${packageName}.MMKVJSIModulePackage;`;

        if (
          !mainApplication.includes(importStatement) &&
          mainApplication.includes(
            "import com.swmansion.reanimated.ReanimatedJSIModulePackage;"
          )
        ) {
          mainApplication = mainApplication.replace(
            "import com.swmansion.reanimated.ReanimatedJSIModulePackage;",
            importStatement
          );
        }

        if (
          mainApplication.includes("return new ReanimatedJSIModulePackage();")
        ) {
          mainApplication = mainApplication.replace(
            "return new ReanimatedJSIModulePackage();",
            "return new MMKVJSIModulePackage();"
          );
        }

        return mainApplication;
      });

      return config;
    },
  ]);
};

const withCustomSettingsGradle = (config) => {
  return withSettingsGradle(config, (config) => {
    if (config.modResults.contents.includes(`include ':react-native-mmkv'`)) {
      return config;
    }

    config.modResults.contents =
      config.modResults.contents +
      `
include ':react-native-mmkv'
project(':react-native-mmkv').projectDir = new File(["node", "--print", "require.resolve('react-native-mmkv/package.json')"].execute().text.trim(), "../android")
`;
    return config;
  });
};

const withCustomAppBuildGradle = (config) => {
  return withAppBuildGradle(config, (config) => {
    if (
      config.modResults.contents.includes(
        `implementation project(':react-native-mmkv')`
      )
    ) {
      return config;
    }

    config.modResults.contents = config.modResults.contents.replace(
      `implementation "com.facebook.react:react-native:+"  // From node_modules`,
      `implementation "com.facebook.react:react-native:+"  // From node_modules
    implementation project(':react-native-mmkv')`
    );
    return config;
  });
};

module.exports = function withMMKV(config) {
  config = withMMKVJSIModulePackage(config);
  config = withMainApplication(config);
  config = withCustomSettingsGradle(config);
  config = withCustomAppBuildGradle(config);
  return config;
};

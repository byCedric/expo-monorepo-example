<div align="center">
  <h1>EAS monorepo example</h1>
  <p></p>
  <p>Enterprise-ready Expo Application Service monorepo with code sharing</p>
  <sup>
    <a href="https://github.com/byCedric/eas-monorepo-example/releases">
      <img src="https://img.shields.io/github/workflow/status/byCedric/eas-monorepo-example/preview?style=flat-square" alt="managed preview" />
    </a>
    <a href="https://github.com/byCedric/eas-monorepo-example/actions">
      <img src="https://img.shields.io/github/workflow/status/byCedric/eas-monorepo-example/standalone?style=flat-square" alt="latest standalone build" />
    </a>
    <a href="https://github.com/byCedric/eas-monorepo-example/blob/main/LICENSE.md">
      <img src="https://img.shields.io/github/license/byCedric/eas-monorepo-example?style=flat-square" alt="license" />
    </a>
  </sup>
  <br />
  <p align="center">
    <a href="https://github.com/byCedric/eas-monorepo-example#-structure"><b>Structure</b></a>
    &nbsp;&nbsp;&mdash;&nbsp;&nbsp;
    <a href="https://github.com/byCedric/eas-monorepo-example#-workflows"><b>Workflows</b></a>
    &nbsp;&nbsp;&mdash;&nbsp;&nbsp;
    <a href="https://github.com/byCedric/eas-monorepo-example#-how-to-use-it"><b>How to use it</b></a>
    &nbsp;&nbsp;&mdash;&nbsp;&nbsp;
    <a href="https://github.com/byCedric/eas-monorepo-example#%EF%B8%8F-caveats"><b>Caveats</b></a>
    &nbsp;&nbsp;&mdash;&nbsp;&nbsp;
    <a href="https://github.com/byCedric/eas-monorepo-example#-common-errors"><b>Common Errors</b></a>
  </p>
  <br />
</div>

## 📁 Structure

- [`apps`](./apps) - Expo apps that only use packages and aren't aware of other apps.
- [`packages`](./packages) - Node packages that may use external and/or local packages.

### Apps

- [`apps/ejected`](./apps/ejected) - Expo bare app using `babel`, `eslint`, and `ui` packages.
- [`apps/managed`](./apps/ejected) - Expo managed app using `babel`, `eslint`, and `ui` packages.

### Packages

- [`packages/babel`](./packages/babel) - Preconfigured Babel configuration for Expo.
- [`packages/eslint`](./packages/eslint) - Preconfigured ESLint coniguration for Expo.
- [`packages/ui`](./packages/ui) - Shared React Native UI components for the apps, using the `eslint` package.

## 👷 Workflows

- [`preview`](./.github/workflows/preview.yml) - Publishes `apps/managed` to a PR-specific release channel and adds a QR code in that PR.
- [`standalone`](./.github/workflows/standalone.yml) - Starts the EAS builds for user-provided OS and build profiles.
- [`test`](./.github/workflows/test.yml) - Ensures that the apps and packages are passing lint and build checks.

## 🚀 How to use it

To set this repository up, you need an Expo account [with access to EAS](https://docs.expo.io/eas/). After that, you need to run these commands.

- `$ yarn` - This installs all required Node libraries using Yarn Workspaces
- `$ yarn build` - To precompile the packages to publish them to NPM and/or use them in your apps.
- Change the `expo.owner` and `expo.android.package` / `expo.ios.bundleIdentifier` properties in `app.json` for both apps.

### Starting apps

After the initial setup, you can start the apps from their app directories.

- `$ cd apps/ejected` - From here, you can run your bare project with `yarn start` and `yarn android|ios`.
- `$ cd apps/managed` - From here, you can start Expo with `yarn start`.

> You can also run these commands with `yarn workspaces` from the monorepo root with `yarn ejected|managed <script>`. But sometimes, the context is incorrectly reverted to the root of the monorepo instead of the app directory.

## ⚠️ Caveats

### Precompile packages

EAS only sends the files which are committed to the repository. That means [the `packages/*/build` folders](.gitignore#L3) need to be generated before building our apps. To tell EAS how to compile our packages, we can [use the `postinstall` hook](https://docs.expo.io/build-reference/how-tos/#how-to-set-up-eas-build-with).

### Running EAS from apps directories

As of writing, the `eas build` command needs to be executed from the package folder itself. EAS will still create a tarball with all files from your monorepo, but runs the build commands from this local folder. You can see this happening in the [standalone workflow](./.github/workflows/standalone.yml#L58).

### Using local credentials in CI

If you want to maintain the keystore or certificates yourself, you have to [configure EAS with local credentials](https://docs.expo.io/app-signing/local-credentials/#credentialsjson). When your CI provider doesn't allow you to add "secret files", you can [encode these files to base64 strings](https://docs.expo.io/app-signing/local-credentials/#using-local-credentials-on-builds-triggered-from) and decode whenever you need it.

> It's highly recommended to keep keystores and certificates out of your repository to avoid security issues.

In this example, [we added a custom Node script](./.github/workflows/standalone.yml#L40-L56) that generates these files from JSON. This JSON is stored in a secret repository variable and contains the base64 strings of the required files. It uses the following structure:

```
[
  { "file": "credentials.json", "code": "<base64>" },
  { "file": "ios/certs/dist-cert.p12", "code": "<base64>" },
  { "file": "ios/certs/profile.mobileprovision", "code": "<base64>" }
]
```
## ❌ Common Errors

### Scripts not found

In React Native, your Node modules often contain native code or scripts used during native compilation. Sometimes the default native configuration isn't aware of the monorepo structure and tries to look for packages in the app's `node_modules` directory.

```bash
# Android example
> Could not read script '.../packages/app/node_modules/expo-constants/scripts/get-app-config-android.gradle' as it does not exist.

# iOS example
> fatal error: module map file '.../Release-iphoneos/YogaKit/YogaKit.modulemap' not found
```

Luckily, we can solve that in different ways:

- **Bare workflow** - You can update the native code to point to the root of the monorepo. You can do that by adding `../../` to the package-specific scripts.
- **Managed workflow** - You need to symlink these packages into the app's `node_modules` directory. [`expo-yarn-workspaces` can help](./apps/managed/package.json#L45-L61) with that.

<div align="center">
  <br />
  with&nbsp;:heart:&nbsp;&nbsp;<strong>byCedric</strong>
  <br />
</div>

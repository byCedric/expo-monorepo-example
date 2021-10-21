<div align="center">
  <h1>EAS monorepo example</h1>
  <p>Enterprise-ready Expo Application Service monorepo with code sharing</p>
  <p>
    <a href="https://github.com/byCedric/eas-monorepo-example/releases">
      <img src="https://img.shields.io/github/workflow/status/byCedric/eas-monorepo-example/preview?style=flat-square" alt="managed preview" />
    </a>
    <a href="https://github.com/byCedric/eas-monorepo-example/actions">
      <img src="https://img.shields.io/github/workflow/status/byCedric/eas-monorepo-example/standalone?style=flat-square" alt="latest standalone build" />
    </a>
    <a href="https://github.com/byCedric/eas-monorepo-example/blob/main/LICENSE.md">
      <img src="https://img.shields.io/github/license/byCedric/eas-monorepo-example?style=flat-square" alt="license" />
    </a>
  </p>
  <p>
    <a href="https://github.com/byCedric/eas-monorepo-example#-structure"><b>Structure</b></a>
    &ensp;&mdash;&ensp;
    <a href="https://github.com/byCedric/eas-monorepo-example#-workflows"><b>Workflows</b></a>
    &ensp;&mdash;&ensp;
    <a href="https://github.com/byCedric/eas-monorepo-example#-how-to-use-it"><b>How to use it</b></a>
    &ensp;&mdash;&ensp;
    <a href="https://github.com/byCedric/eas-monorepo-example#%EF%B8%8F-caveats"><b>Caveats</b></a>
    &ensp;&mdash;&ensp;
    <a href="https://github.com/byCedric/eas-monorepo-example#-common-errors"><b>Common Errors</b></a>
  </p>
</div>


## 📁 Structure

- [`apps`](./apps) - Expo apps that only use packages and aren't aware of other apps.
- [`packages`](./packages) - Node packages that may use external and/or local packages.

### Apps

- [`apps/ejected`](./apps/ejected) - Expo bare app using `babel`, `eslint`, and `ui` packages.
- [`apps/managed`](./apps/managed) - Expo managed app using `babel`, `eslint`, and `ui` packages.
- [`apps/with-sentry`](./apps/with-sentry) - Expo managed app with `expo-sentry` integrated.

### Packages

- [`packages/babel`](./packages/babel) - Preconfigured Babel configuration for Expo.
- [`packages/eslint`](./packages/eslint) - Preconfigured ESLint coniguration for Expo.
- [`packages/ui`](./packages/ui) - Shared React Native UI components for the apps, using the `eslint` package.

## 👷 Workflows

- [`preview`](./.github/workflows/preview.yml) - Publishes managed apps to a PR-specific release channel and adds a QR code to that PR.
- [`standalone`](./.github/workflows/standalone.yml) - Starts the EAS builds for user-provided OS and build profiles.
- [`test`](./.github/workflows/test.yml) - Ensures that the apps and packages are passing lint and build checks.

## 🚀 How to use it

To set this repository up, you need an Expo account [with access to EAS](https://docs.expo.io/eas/). After that, you need to run these commands.

- `$ yarn` - This installs all required Node libraries using Yarn Workspaces
- `$ yarn build` - To precompile the packages to publish them to NPM and/or use them in your apps.
- Change the `expo.owner` and `expo.android.package` / `expo.ios.bundleIdentifier` properties in `app.json` for all apps.

### Starting apps

After the initial setup, you can start the apps from their app directories. Or you can use `yarn workspace <name> expo start` command, see `scripts` in [`package.json`](./package.json).

- `$ yarn ejected expo run:android|ios` - This will execute `expo run:android|ios` in the ejected app.
- `$ yarn managed expo start` - This will execute `expo start` in the managed app.
- `$ yarn with-sentry expo start` - This will execute `expo start` in the with-sentry app.

## ⚠️ Caveats

### Precompile packages

EAS only sends the files which are committed to the repository. That means [the `packages/*/build` folders](.gitignore#L3) need to be generated before building our apps. To tell EAS how to compile our packages, we can [use the `postinstall` hook](https://docs.expo.io/build-reference/how-tos/#how-to-set-up-eas-build-with).

### Running EAS from apps directories

As of writing, the `eas build` command needs to be executed from the package folder itself. EAS will still create a tarball with all files from your monorepo, but runs the build commands from this local folder. You can see this happening in the [standalone workflow](./.github/workflows/standalone.yml#L58).

### Using local credentials in CI

If you want to maintain the keystore or certificates yourself, you have to [configure EAS with local credentials](https://docs.expo.io/app-signing/local-credentials/#credentialsjson). When your CI provider doesn't allow you to add "secret files", you can [encode these files to base64 strings](https://docs.expo.io/app-signing/local-credentials/#using-local-credentials-on-builds-triggered-from) and decode whenever you need it.

> It's highly recommended to keep keystores and certificates out of your repository to avoid security issues.

## ❌ Common Errors

_We are still testing for potential issues, but none are found yet!_

<div align="center">
  <br />
  with&nbsp;:heart:&nbsp;&nbsp;<strong>byCedric</strong>
  <br />
</div>

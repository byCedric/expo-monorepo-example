<div align="center">
  <h1>Expo monorepo</h1>
  <p>Fast pnpm monorepo for cross-platform apps built with Expo and React</p>
  <p>
    <a href="https://github.com/byCedric/expo-monorepo-example/actions/workflows/test.yml">
      <img src="https://img.shields.io/github/workflow/status/byCedric/expo-monorepo-example/test/main?label=tests&style=flat-square" alt="Test workflows" />
    </a>
    <a href="https://github.com/byCedric/expo-monorepo-example/actions/workflows/preview.yml">
      <img src="https://img.shields.io/github/workflow/status/byCedric/expo-monorepo-example/preview?label=previews&style=flat-square" alt="Preview workflows" />
    </a>
    <a href="https://github.com/byCedric/expo-monorepo-example/actions/workflows/build.yml">
      <img src="https://img.shields.io/github/workflow/status/byCedric/expo-monorepo-example/build/main?label=builds&style=flat-square" alt="Build workflows" />
    </a>
  </p>
  <p>
    <a href="https://github.com/byCedric/expo-monorepo-example#-why-is-it-fast"><b>Why is it fast?</b></a>
    &ensp;&mdash;&ensp;
    <a href="https://github.com/byCedric/expo-monorepo-example#-how-to-use-it"><b>How to use it</b></a>
    &ensp;&mdash;&ensp;
    <a href="https://github.com/byCedric/expo-monorepo-example#-structure"><b>Structure</b></a>
    &ensp;&mdash;&ensp;
    <a href="https://github.com/byCedric/expo-monorepo-example#-workflows"><b>Workflows</b></a>
    &ensp;&mdash;&ensp;
    <a href="https://github.com/byCedric/expo-monorepo-example#%EF%B8%8F-caveats"><b>Caveats & Issues</b></a>
  </p>
</div>

## ⚡ Why is it fast?

This repository uses both [pnpm](https://pnpm.io/) and [Turborepo](https://turborepo.org/) to speed things up, _by a lot_. With pnpm, we leverage the installation performance using the global store cache. Turborepo helps us to run certain tasks, and cache the result if we rerun tasks with the same input or code. In the workflows we cache the [pnpm store](./.github/actions/setup-monorepo/action.yml#L37) and [Turborepo cache](./.github/actions/setup-monorepo/action.yml#L50-L56) using GitHub Actions built-in cache, resulting in the best performance possible.

### What about Metro?

In **apps/mobile** we leverage the Metro cache to speed up building and publishing. We use Turborepo to restore or invalidate this cache, working around [potential environment variable issues](#using-environment-variables-in-react-native). To populate this Metro cache, the **apps/mobile** has a [`$ pnpm build`](./apps/mobile/package.json#L9) script that exports React Native bundles. The resulting Metro cache is then reused when [publishing previews](./.github/workflows/preview.yml#L26-L28).

## 🚀 How to use it

You can use and modify this repository however you want. If you want to use EAS to build your app, you'll need to create an [Expo access token](https://expo.dev/accounts/[account]/settings/access-tokens) and set it as `EXPO_TOKEN` GitHub actions secret.

To run the repository locally, run these two commands:

- `$ pnpm install` - This installs all required Node libraries using [pnpm](https://pnpm.io/).
- `$ pnpm dev` - Starts the development servers for all **apps**.

### Commands

Because this monorepo uses [Turborepo](https://turborepo.org/), you don't need to run additional commands to set things up. Whenever you run `$ pnpm dev`, it will build all **packages** if they aren't built yet. In this monorepo we use a few other commands or pipelines:

- `$ pnpm lint` - Analyze the source code of all **apps** and **packages** using ESLint.
- `$ pnpm test` - Run all tests for packages with Jest tests.
- `$ pnpm build` - Build all **apps** and **packages** for production or to publish them on npm.

When deploying a single app to production, you only need to build a specific app with all dependencies. This monorepo uses a simple npm script convention of `build:<app-name>` to keep this process simple. Under the hood, it uses [Turborepo's workspace filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering), defined as an npm script in the root [**package.json**](./package.json).

- `$ pnpm build:mobile` - Build **apps/mobile** and all **packages** used in mobile.
- `$ pnpm build:web` - Build **apps/web** and all **packages** used in web.

### Switching to yarn or npm

You can use yarn or npm with this monorepo as well. If you want to use one of these package managers, instead of pnpm, all you have to do is:

- Remove **.npmrc**, **pnpm-lock.yaml**, and **pnpm-workspace.yaml**.
- Remove the `pnpm` property from the root **package.json** file.
- Add the [`workspaces`](https://docs.npmjs.com/cli/v8/using-npm/workspaces) property to the root **package.json** file.
- Update the workflows to use yarn or npm instead.

## 📁 Structure

- [`apps`](./apps) - Apps that only use packages and aren't aware of other apps.
- [`packages`](./packages) - Packages that may use external and/or other monorepo packages.

### Apps

- [`apps/mobile`](./apps/mobile) - Expo app using `eslint-config` and `feature-home` packages.
- [`apps/web`](./apps/web) - Next.js app using `eslint-config` and `feature-home` packages.

### Packages

- [`packages/eslint-config`](./packages/eslint) - Preconfigured ESLint configuration for each app or package.
- [`packages/feature-home`](./packages/feature-home) - Shared React Native domain-logic for apps, using both `ui` and `eslint-config` packages.
- [`packages/ui`](./packages/ui) - Shared React Native UI components for apps, using the `eslint-config` package.

## 👷 Workflows

- [`build`](./.github/workflows/build.yml) - Starts the EAS builds for **apps/mobile** using the given profile.
- [`preview`](./.github/workflows/preview.yml) - Publishes apps to a PR-specific release channel and adds a QR code to that PR.
- [`test`](./.github/workflows/test.yml) - Ensures that the apps and packages are healthy on multiple OSs.

### Composite workflows

- [`setup-monorepo`](./.github/actions/setup-monorepo/action.yml) - Reusable composite workflow to setup the monorepo in GitHub Actions.

## ⚠️ Caveats

### Using environment variables in React Native

Reusing Metro caches can be dangerous if you use Babel plugins like [transform-inline-environment-variables](https://babeljs.io/docs/en/babel-plugin-transform-inline-environment-variables/). When using Babel plugins to swap out environment variables for their actual value, you are creating a dependency on environment variables. Because Metro is unaware of dependencies on environment variables, Metro might reuse an incorrect cached environment variable.

Since Turborepo handles the cache in this repository, we can leverage [caching based on environment variables](https://turborepo.org/docs/core-concepts/caching#alter-caching-based-on-environment-variables-and-files). This invalidates the Metro cache whenever certain environment variables are changed and avoid reusing incorrect cached code.

### pnpm workarounds

In the current React Native ecosystem, there are a lot of implicit dependencies. These can be from the native code that is shipped within packages, or even implicit dependencies through installing a specific version of Expo or React Native. In the newer package managers like pnpm, you will run into issues due to these implicit dependencies. Besides that there are other issues like [Metro not following symlinks](https://github.com/facebook/metro/issues/1).

To workaround these issues, we have to change some config:

1. Let pnpm generate a flat **node_modules** folder, without symlinks. You can do that by creating a root [**.npmrc**](./.npmrc) file containing ([`node-linker=hoisted`](https://pnpm.io/npmrc#node-linker)). This works around two things; no Metro symlink support, and having a simple way to determine where the modules are installed (see point 3).

2. Either disable [`strict-peer-dependencies`](https://pnpm.io/npmrc#strict-peer-dependencies) or add [`peerDependencyRules.ignoreMissing`](./package.json#L14-L22) rules in the **package.json**. This disables some of the expected implicit peer dependencies issues. Without these changes, pnpm will fail on install asking you to install various peer dependencies.

3. Update the **metro.config.js** configuration for usage in monorepos. Full explanation per configuration option can be found in the [Expo docs](https://docs.expo.dev/guides/monorepos/#modify-the-metro-config). The only addition in this repository is the [`config.cacheStores`](./apps/mobile/metro.config.js#L22-L24). This change moves the Metro cache to a place which is accessible by Turborepo, our main cache handler (see [Why is it fast?](#-why-is-it-fast)).


### Precompile packages

EAS only sends the files which are committed to the repository. That means [the `packages/*/build` folders](.gitignore#L3) need to be generated before building our apps. To tell EAS how to compile our packages, we can [use the `postinstall` hook](https://docs.expo.dev/build-reference/how-tos/#how-to-set-up-eas-build-with).

### Running EAS from apps directories

As of writing, the `eas build` command needs to be executed from the package folder itself. EAS will still create a tarball with all files from your monorepo, but runs the build commands from this local folder. You can see this happening in the [build workflow](./.github/workflows/build.yml#L32).

### Using local credentials in CI

If you want to maintain the keystore or certificates yourself, you have to [configure EAS with local credentials](https://docs.expo.dev/app-signing/local-credentials/#credentialsjson). When your CI provider doesn't allow you to add "secret files", you can [encode these files to base64 strings](https://docs.expo.dev/app-signing/local-credentials/#using-local-credentials-on-builds-triggered-from) and decode whenever you need it.

> It's highly recommended to keep keystores and certificates out of your repository to avoid security issues.

## ❌ Common issues

### Codegen errors when building app

Since Expo SDK 47, and therefore React Native 0.70.5, the codegen code is split out into a different module `react-native-codegen`. Unfortunately, the code which resolves the path to `react-native-codegen` [is not working in monorepo projects](https://github.com/facebook/react-native/issues/35429). You can find a patch for this issue in **apps/mobile/patches**, added in commit [cffcb8b](https://github.com/byCedric/expo-monorepo-example/commit/cffcb8b19bfc9fdf284163fd53e7da85fb0b2acb).

<div align="center">
  <br />
  with&nbsp;:heart:&nbsp;&nbsp;<strong>byCedric</strong>
  <br />
</div>

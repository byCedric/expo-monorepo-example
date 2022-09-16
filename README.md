<div align="center">
  <h1>Expo monorepo</h1>
  <p>A fast and enterprise-ready monorepo for cross-platform apps</p>
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
    <a href="https://github.com/byCedric/eas-monorepo-example#-why-is-it-fast"><b>Why is it fast?</b></a>
    &ensp;&mdash;&ensp;
    <a href="https://github.com/byCedric/eas-monorepo-example#-how-to-use-it"><b>How to use it</b></a>
    &ensp;&mdash;&ensp;
    <a href="https://github.com/byCedric/eas-monorepo-example#%EF%B8%8F-caveats"><b>Caveats & Issues</b></a>
  </p>
</div>


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

## ⚡ Why is it fast?

This repository uses both [pnpm](https://pnpm.io/) and [Turborepo](https://turborepo.org/) to speed things up, _by a lot_. With pnpm, we leverage the installation performance using the global store cache. Turborepo helps us to run certain tasks, and cache the result if we rerun tasks with the same input or code. In the workflows we cache the [pnpm store](./.github/actions/setup-monorepo/action.yml#L37) and [Turborepo cache](./.github/actions/setup-monorepo/action.yml#L50-L56) using GitHub Actions built-in cache, resulting in the best performance possible.

### What about Metro?

In **apps/mobile** we leverage the Metro cache to speed up building and publishing. We use Turborepo to restore or invalidate this cache, working around [potential environment variable issues](#using-environment-variables-in-react-native). To populate this Metro cache, the **apps/mobile** has a [`$ pnpm build`](./apps/mobile/package.json#L9) script that exports React Native bundles. The cached result is then reused when [publishing previews](./.github/workflows/preview.yml#L26-L28).

## 🚀 How to use it

You can use and modify this repository however you want. If you want to use EAS to build your app, you'll need to create an [Expo access token](https://expo.dev/accounts/[account]/settings/access-tokens) and set it as `EXPO_TOKEN` GitHub actions secret.

To run the repository locally, run these two commands:

- `$ pnpm` - This installs all required Node libraries using [pnpm](https://pnpm.io/).
- `$ pnpm dev` - Starts the development servers for all **apps**.

### Commands

Because this monorepo uses [Turborepo](https://turborepo.org/), you don't need to run additional commands to set things up. Whenever you run `$ pnpm dev`, it will build all **packages** if they aren't built yet. In this monorepo we use a few other commands or pipelines:

- `$ pnpm lint` - Analyze the source code of all **apps** and **packages** using ESLint.
- `$ pnpm test` - Run all tests for packages with Jest tests.
- `$ pnpm build` - Build all **apps** and **packages** for production or to publish them on npm.

### Switching to yarn or npm

You can use yarn or npm with this monorepo as well. If you want to use one of these package managers, instead of pnpm, all you have to do is:

- Remove **.npmrc**, **pnpm-lock.yaml**, and **pnpm-workspace.yaml**.
- Remove the `pnpm` property from the root **package.json** file.
- Add the [`workspaces`](https://docs.npmjs.com/cli/v8/using-npm/workspaces) property to the root **package.json** file.
- Update the workflows to use yarn or npm instead.

## ⚠️ Caveats

### Using environment variables in React Native

Reusing Metro caches can be dangerous if you use Babel plugins like [transform-inline-environment-variables](https://babeljs.io/docs/en/babel-plugin-transform-inline-environment-variables/). When using Babel plugins to swap out environment variables for their actual value, you are creating a dependency on environment variables. Because Metro is unaware of dependencies on environment variables, Metro might reuse an incorrect cached environment variable.

Since Turborepo handles the cache in this repository, we can leverage [caching based on environment variables](https://turborepo.org/docs/core-concepts/caching#alter-caching-based-on-environment-variables-and-files). This invalidates the Metro cache whenever certain environment variables are changed and avoid reusing incorrect cached code.

### Precompile packages

EAS only sends the files which are committed to the repository. That means [the `packages/*/build` folders](.gitignore#L3) need to be generated before building our apps. To tell EAS how to compile our packages, we can [use the `postinstall` hook](https://docs.expo.dev/build-reference/how-tos/#how-to-set-up-eas-build-with).

### Running EAS from apps directories

As of writing, the `eas build` command needs to be executed from the package folder itself. EAS will still create a tarball with all files from your monorepo, but runs the build commands from this local folder. You can see this happening in the [build workflow](./.github/workflows/build.yml#L32).

### Using local credentials in CI

If you want to maintain the keystore or certificates yourself, you have to [configure EAS with local credentials](https://docs.expo.dev/app-signing/local-credentials/#credentialsjson). When your CI provider doesn't allow you to add "secret files", you can [encode these files to base64 strings](https://docs.expo.dev/app-signing/local-credentials/#using-local-credentials-on-builds-triggered-from) and decode whenever you need it.

> It's highly recommended to keep keystores and certificates out of your repository to avoid security issues.

## ❌ Common issues

_We are actively monitoring potential issues, and fix them_

<div align="center">
  <br />
  with&nbsp;:heart:&nbsp;&nbsp;<strong>byCedric</strong>
  <br />
</div>

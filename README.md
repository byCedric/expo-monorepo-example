<div align="center">
  <h1>Expo monorepo</h1>
  <p>Fast, enterprise-ready monorepo for cross-platform apps</p>
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

- [`apps`](./apps) - Apps that only use packages and aren't aware of other apps.
- [`packages`](./packages) - Packages that may use external and/or other monorepo packages.

### Apps

- [`apps/mobile`](./apps/mobile) - Expo app using `eslint-config` and `feature-home` packages.
- [`apps/managed`](./apps/managed) - Next.js app using `eslint-config` and `feature-home` packages.

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

## 🚀 How to use it

You can use and modify this repository however you want. If you want to use EAS to build your app, you'll need to create an [Expo access token](https://expo.dev/accounts/[account]/settings/access-tokens) and set it as `EXPO_TOKEN` GitHub actions secret.

To run the repository locally, run these two commands:

- `$ pnpm` - This installs all required Node libraries using [pnpm](https://pnpm.io/)
- `$ pnpm build` - To precompile the packages to publish them to NPM and/or use them in your apps.

## ⚠️ Caveats

### Precompile packages

EAS only sends the files which are committed to the repository. That means [the `packages/*/build` folders](.gitignore#L3) need to be generated before building our apps. To tell EAS how to compile our packages, we can [use the `postinstall` hook](https://docs.expo.dev/build-reference/how-tos/#how-to-set-up-eas-build-with).

### Running EAS from apps directories

As of writing, the `eas build` command needs to be executed from the package folder itself. EAS will still create a tarball with all files from your monorepo, but runs the build commands from this local folder. You can see this happening in the [build workflow](./.github/workflows/build.yml#L32).

### Using local credentials in CI

If you want to maintain the keystore or certificates yourself, you have to [configure EAS with local credentials](https://docs.expo.dev/app-signing/local-credentials/#credentialsjson). When your CI provider doesn't allow you to add "secret files", you can [encode these files to base64 strings](https://docs.expo.dev/app-signing/local-credentials/#using-local-credentials-on-builds-triggered-from) and decode whenever you need it.

> It's highly recommended to keep keystores and certificates out of your repository to avoid security issues.

## ❌ Common Errors

_We are actively monitoring potential issues, and fix them_

<div align="center">
  <br />
  with&nbsp;:heart:&nbsp;&nbsp;<strong>byCedric</strong>
  <br />
</div>

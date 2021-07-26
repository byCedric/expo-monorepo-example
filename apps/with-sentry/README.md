<div align="center">
  <h1>Sentry Example</h1>
  <p></p>
  <p>Example app for error reporting with <a href="https://sentry.io/">Sentry</a></p>
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
    <a href="https://github.com/byCedric/eas-monorepo-example#-how-to-use-it"><b>How to use it</b></a>
    &nbsp;&nbsp;&mdash;&nbsp;&nbsp;
    <a href="https://github.com/byCedric/eas-monorepo-example#%EF%B8%8F-caveats"><b>Caveats</b></a>
    &nbsp;&nbsp;&mdash;&nbsp;&nbsp;
    <a href="https://github.com/byCedric/eas-monorepo-example#-common-errors"><b>Common Errors</b></a>
  </p>
  <br />
</div>

## 🚀 How to use it

This simple managed app contains an example of how to integrate Sentry in an EAS monorepo app. Once you press the "Trigger error" button, the app will throw an uncaught exception and report it to Sentry. It also includes sourcemap uploading through the `postPublish` hook.

- Change the organization settings in `app.json`.
- Change the public DSN in `App.tsx`.
- Start the app and trigger the error.

> In the `postPublish` hook, `authToken` is omitted in favor of using the [environment variable `SENTRY_AUTH_TOKEN`](https://github.com/expo/sentry-expo/issues/144). The environment variable is added in the `preview` workflow and on [EAS as secret](https://docs.expo.io/build-reference/variables/#using-secrets-in-environment-variables).

## ⚠️ Caveats

### EAS vs classic build differences

If you build an app without native code through EAS, we will [run `expo prebuild`](https://docs.expo.io/guides/config-plugins/). This command auto-generates the native configuration based on the current settings. After generating the native code, your app is built as a bare React Native app. Because of that, it requires you to add and symlink [the native dependencies for bare projects](https://github.com/expo/sentry-expo#step-3) as well.

## ❌ Common Errors

### Failed `:app:bundleReleaseJsAndAssets_SentryUpload` gradlew task

As mentioned in the caveats, you also need to configure your app as a bare project. The `sentry-expo` plugin takes care of all native code changes required. If you run into this error, please check the following:

- When using `sentry-expo` in a bare project, you need to install additional libraries. (see [step 3 of `sentry-expo`](https://github.com/expo/sentry-expo#step-3)
  The current native modules contain hardcoded links to their locations. To ensure this library is included in your build, you must symlink this module with `expo-yarn-workspaces` into the app's `node_modules` folder.
- When using a `postPublish` hook, the [Expo config plugin will automatically configure Sentry](https://github.com/expo/sentry-expo/blob/master/plugin/src/withSentry.ts#L32-L71) to trigger this in a bare project.
  Because Sentry requires `@sentry/cli` to upload the sourcemap, you also need to symlink this dependency into your app's `node_modules` folder.

After installing and symlinking three modules, `sentry-expo`, `@sentry/react-native`, and `@sentry/cli` (if you use a hook), this should solve the issue.

### Unauthorized when uploading sourcemaps

For Sentry to upload the sourcemap, you need to be authenticated. There are currently two ways to authenticate the `@sentry/cli`.

1. Add `authToken` to your `postPublish` hook - the Expo config plugin will configure Sentry to use [a similar hook](https://github.com/expo/sentry-expo#configure-no-publish-builds-or-eas-build) during the `expo prebuild` step.
2. Add `SENTRY_AUTH_TOKEN` as a [secret to your EAS project](https://docs.expo.io/build-reference/variables/#using-secrets-in-environment-variables) - this is [automatically picked up by `@sentry/cli`](https://docs.sentry.io/product/cli/configuration/#to-authenticate-manually) and used as authentication.

<div align="center">
  <br />
  with&nbsp;:heart:&nbsp;&nbsp;<strong>byCedric</strong>
  <br />
</div>

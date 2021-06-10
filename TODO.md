## Managed

- managed monorepos break with `npx crna expo-yarn-workspaces` because of missing `react-native-unimodules`
- unclear which modules should be linkd with `expo-yarn-workspaces`'s `symlinks`
- adding only `expo-*` modules still break on "unimodules not found"
- ejecting managed project (on EAS) doesn't fix the entrypoint

## Ejected

- CLI is incorrectly assuming `eas build:configure` wasn't ran
```
  Error: Project is not configured. Please run "eas build:configure" to configure
    the project.
```
> Caused by missing `eas.gradle` when ejected, might need to rephrase "rerun eas build:configure"?

- duplicated `expo-updates` script on `expo eject` + `eas build:configure`
```
// Integration with Expo updates
apply from: "../../../../node_modules/expo-updates/scripts/create-manifest-android.gradle"
```

- `yarn ios` starts bundler from root, instead of local package folder

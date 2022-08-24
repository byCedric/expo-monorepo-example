import { useForegroundPermissions } from 'expo-location';
import { openSettings } from 'expo-linking';
import { PropsWithChildren } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import { useAppState } from '../hooks/useAppState';

export function LocationPermission({ children }: PropsWithChildren<{}>) {
  const [permission, requestPermission, fetchPermission] = useForegroundPermissions();

  // If users come back from the app settings,
  // fetch the current permission state again.
  useAppState(state => {
    if (state === 'active') fetchPermission();
  }, [fetchPermission]);

  // Permission is still loading, we don't know if permission has been granted yet
  if (!permission) {
    return <View />;
  }

  // Permission has been granted, render the child components
  if (permission.granted) {
    return <>{children}</>;
  }

  // Permission has not been granted, render why we need it
  // This also renders a button to grant permission.
  // If we asked too many times, we need to open the settings to manually enable location permissions.
  return (
    <View>
      <Text style={$title}>We need access to your location to find the current weather conditions</Text>
      {permission.canAskAgain
        ? <Button title="Grant permission" onPress={requestPermission} />
        : <Button title="Grant permission" onPress={openSettings} />
      }
    </View>
  );
}

const { $title } = StyleSheet.create({
  $title: {
    fontSize: 16,
    margin: 16,
  },
});

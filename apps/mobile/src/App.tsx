import { CurrentWeather, LocationProvider } from '@acme/feature-weather';
import { StatusBar } from 'expo-status-bar';
import { getLastKnownPositionAsync } from 'expo-location';
import { StyleSheet, View } from 'react-native';

import { LocationPermission } from './components/LocationPermission';

export function App() {
  return (
    <View style={styles.container}>
      <LocationPermission>
        <LocationProvider getLocation={getLocation}>
          <CurrentWeather />
        </LocationProvider>
      </LocationPermission>
      <StatusBar style="auto" />
    </View>
  );
}

async function getLocation() {
  return await getLastKnownPositionAsync().then(location => ({
    latitude: location!.coords.latitude,
    longitude: location!.coords.longitude,
  }))
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import { trpc } from '@acme/api/client';
import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { locationContext } from './LocationProvider';

export function CurrentWeather() {
  const { location } = useContext(locationContext);
  const weather = trpc.useQuery(['weather.location', {
    latitude: location!.latitude,
    longitude: location!.longitude,
  }]);

  if (weather.isLoading) {
    return (
      <Text style={$title}>🌡️ Asking the weather gods...</Text>
    );
  }

  return (
    <View style={$container}>
      <Text style={$title}>It's a nice day today!</Text>
      <Text>Looks like <Text style={$value}>{weather.data?.temperatureC}</Text>C</Text>
      <Text>Could be windy, <Text style={$value}>{weather.data?.windSpeed}</Text>km/H</Text>
    </View>
  );
}

const { $container, $title, $value } = StyleSheet.create({
  $container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  $title: {
    fontSize: 18,
  },
  $value: {
    fontWeight: 'bold',
  },
});

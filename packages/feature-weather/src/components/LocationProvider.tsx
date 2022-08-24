import { PropsWithChildren, createContext, useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';

export interface Location {
  latitude: number;
  longitude: number;
}

export interface LocationContext {
  location: Location | null;
  getLocation: () => Promise<{ latitude: number; longitude: number }>;
}

export const locationContext = createContext<LocationContext>({
  location: null,
  getLocation() { throw new Error('No location provider set up') },
});

export function LocationProvider({ children, getLocation }: PropsWithChildren<Omit<LocationContext, 'location'>>) {
  const [location, setLocation] = useState<Location | null>(null);

  useEffect(() => {
    getLocation().then(setLocation);
  }, [getLocation]);

  if (!location) {
    return (
      <Text style={$title}>📍 Finding your location...</Text>
    )
  }

  return (
    <locationContext.Provider value={{ location, getLocation }}>
      {children}
    </locationContext.Provider>
  );
}

const { $title } = StyleSheet.create({
  $title: {
    fontSize: 18,
  },
});

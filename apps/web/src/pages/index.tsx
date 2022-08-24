import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { CurrentWeather, LocationProvider } from '@acme/feature-weather';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Weather app</title>
        <meta name="description" content="Example repository for the zART stack" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <LocationProvider getLocation={getLocation}>
          <CurrentWeather />
        </LocationProvider>
      </main>
    </div>
  )
}

async function getLocation() {
  if (!navigator.geolocation) {
    throw new Error('Geolocation is not available');
  }

  const location = await new Promise<GeolocationPosition>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });

  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };
}

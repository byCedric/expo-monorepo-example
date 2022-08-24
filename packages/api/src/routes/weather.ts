import fetch from 'node-fetch';
import { z } from 'zod';

import { createRouter } from '../utils/createRouter';

/**
 * Create a new tRPC (sub) router that handles all weather related requests.
 */
export const weatherRouter = createRouter()
  .query('location', {
    input: z.object({
      latitude: z.number().min(-90).max(90),
      longitude: z.number().min(-180).max(180),
    }),
    async resolve({ input }) {
      // This response is untyped, so we work around that by setting the types below
      const { current_weather: weather } = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${input.latitude}&longitude=${input.longitude}&current_weather=true`)
        // see: https://open-meteo.com/en/docs
        .then((response) => response.json() as any);

      return {
        temperatureC: weather.temperature as number,
        temperatureF: celciusToFahrenheit(weather.temperature),
        windSpeed: weather.wind_speed as number,
        windDirection: weather.wind_direction as number,
        weatherCode: weather.weathercode as number,
        timeUtc: new Date(weather.time),
      }
    },
  });

function celciusToFahrenheit(celcius: number) {
  // see: google.com, idk figure it out
  return Math.round(((celcius * (9/5)) + 32) * 10) / 10;
}

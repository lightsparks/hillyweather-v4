// src/utils/weatherFormat.ts

/**
 * Convert a Unix timestamp (seconds) into a localized HH:mm string.
 */
export function formatTime(unixTime: number | undefined): string {
  if (!unixTime) return '-'
  const date = new Date(unixTime * 1000)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

/**
 * Pick a weather emoji/icon based on OpenWeather’s weather ID.
 */
export function weatherIcon(id: number | undefined): string {
  if (!id) return ''
  if (id >= 200 && id < 300) return '⛈️'
  if (id >= 300 && id < 400) return '🌦️'
  if (id >= 500 && id < 600) return '🌧️'
  if (id >= 600 && id < 700) return '❄️'
  if (id >= 700 && id < 800) return '🌫️'
  if (id === 800) return '☀️'
  if (id > 800 && id < 900) return '☁️'
  return ''
}

/**
 * Return a short wind direction abbreviation (N, NO, O, etc.) from degrees.
 */
export function windAbbrevFromDegrees(deg: number | undefined): string {
  if (deg == null) return '–'
  const points = [
    'N','NNO','NO','ONO',
    'O','OZO','ZO','ZZO',
    'Z','ZZW','ZW','WZW',
    'W','WNW','NW','NNW',
  ]
  const idx = Math.round(deg / 22.5) % 16
  return points[idx]
}

/**
 * Return a Unicode arrow showing wind direction (16 points).
 */
export function windArrowFromDegrees(degrees: number | undefined): string {
  if (degrees === undefined || degrees === null) return '–'

  const arrows = [
    '⬇️', // N (wind blowing south)
    '↙️', // NNE
    '↙️', // NE
    '↙️', // ENE
    '⬅️', // E
    '↖️', // ESE
    '↖️', // SE
    '↖️', // SSE
    '⬆️', // S (wind blowing north)
    '↗️', // SSW
    '↗️', // SW
    '↗️', // WSW
    '➡️', // W
    '↘️', // WNW
    '↘️', // NW
    '↘️', // NNW
  ]

  const index = Math.round(degrees / 22.5) % 16
  return arrows[index]
}

/**
 * Compute the Beaufort-scale number (0–12) from speed in m/s, or '-' if no data.
 */
export function beaufortNumber(speedMps: number | undefined): number | '-' {
  if (speedMps == null) return '-'
  const kmh = speedMps * 3.6
  if (kmh < 1)   return 0
  if (kmh < 6)   return 1
  if (kmh < 12)  return 2
  if (kmh < 20)  return 3
  if (kmh < 29)  return 4
  if (kmh < 39)  return 5
  if (kmh < 50)  return 6
  if (kmh < 62)  return 7
  if (kmh < 75)  return 8
  if (kmh < 89)  return 9
  if (kmh < 103) return 10
  if (kmh < 118) return 11
  return 12
}

/**
 * Convert m/s to a rounded km/h string (e.g. “15 km/h”).
 */
export function toKmh(mps: number | undefined): string {
  if (mps === undefined || mps === null) return '-'
  return `${Math.round(mps * 3.6)} km/h`
}

/**
 * Return a Dutch‐language Beaufort‐scale description for a given speed in m/s.
 */
export function beaufortScale(speedMps: number | undefined): string {
  if (speedMps === undefined || speedMps === null) return '-'
  const kmh = speedMps * 3.6

  if (kmh < 1) return 'windstil'              // windkracht 1
  if (kmh < 6) return 'zeer zwak'             // windkracht 2
  if (kmh < 12) return 'zwak'                 // windkracht 3
  if (kmh < 20) return 'vrij matig'           // windkracht 4
  if (kmh < 29) return 'matig'                // windkracht 5
  if (kmh < 39) return 'vrij krachtig'        // windkracht 6
  if (kmh < 50) return 'krachtig'             // windkracht 7
  if (kmh < 62) return 'hard'                 // windkracht 8
  if (kmh < 75) return 'stormachtig'          // windkracht 9
  if (kmh < 89) return 'storm'                // windkracht 10
  if (kmh < 103) return 'zware storm'         // windkracht 11
  if (kmh < 118) return 'zeer zware storm'    // windkracht 12
  return 'orkaan'
}

/**
 * Format a combined wind string: direction arrow plus gusts, if any.
 */
export function formatWind(
  speedMps: number | undefined,
  degrees?: number,
  gustMps?: number
): string {
  if (speedMps === undefined || speedMps === null) return '-'
  const direction = windArrowFromDegrees(degrees)

  let gustPart = ''
  if (
    gustMps !== undefined &&
    gustMps !== null &&
    gustMps > speedMps + 2
  ) {
    gustPart = `, met windstoten tot ${toKmh(gustMps)}`
  }

  return `${direction}${gustPart}`.trim()
}

/**
 * Translate an English OpenWeather description into Dutch.
 */
export function translateWeatherDescription(
  description: string | undefined
): string {
  if (!description) return '-'

  const translations: Record<string, string> = {
    // Thunderstorm
    'thunderstorm with light rain': 'onweer met lichte regen',
    'thunderstorm with rain': 'onweer met regen',
    'thunderstorm with heavy rain': 'onweer met zware regen',
    'light thunderstorm': 'licht onweer',
    thunderstorm: 'onweer',
    'heavy thunderstorm': 'zwaar onweer',
    'ragged thunderstorm': 'onregelmatig onweer',
    'thunderstorm with light drizzle': 'onweer met lichte motregen',
    'thunderstorm with drizzle': 'onweer met motregen',
    'thunderstorm with heavy drizzle': 'onweer met zware motregen',

    // Drizzle
    'light intensity drizzle': 'lichte motregen',
    'drizzle': 'motregen',
    'heavy intensity drizzle': 'zware motregen',
    'light intensity drizzle rain': 'lichte motregenregen',
    'drizzle rain': 'motregenregen',
    'heavy intensity drizzle rain': 'zware motregenregen',
    'shower rain and drizzle': 'regenbui met motregen',
    'heavy shower rain and drizzle': 'zware regenbui met motregen',
    'shower drizzle': 'motregenbui',

    // Rain
    'light rain': 'lichte regen',
    'moderate rain': 'matige regen',
    'heavy intensity rain': 'zware regen',
    'very heavy rain': 'zeer zware regen',
    'extreme rain': 'extreme regen',
    'freezing rain': 'ijzel',
    'light intensity shower rain': 'lichte bui',
    'shower rain': 'regenbui',
    'heavy intensity shower rain': 'hevige regenbui',
    'ragged shower rain': 'onregelmatige regenbui',

    // Snow
    'light snow': 'lichte sneeuw',
    'snow': 'sneeuw',
    'heavy snow': 'zware sneeuw',
    'sleet': 'natte sneeuw',
    'light shower sleet': 'lichte bui van natte sneeuw',
    'shower sleet': 'bui van natte sneeuw',
    'light rain and snow': 'lichte regen en sneeuw',
    'rain and snow': 'regen en sneeuw',
    'light shower snow': 'lichte sneeuwbui',
    'shower snow': 'sneeuwbui',
    'heavy shower snow': 'zware sneeuwbui',

    // Atmosphere
    mist: 'mist',
    smoke: 'rook',
    haze: 'nevel',
    'sand/dust whirls': 'opwervelend zand/stof',
    fog: 'dichte mist',
    sand: 'zand',
    dust: 'stof',
    'volcanic ash': 'vulkanische as',
    squalls: 'windvlagen',
    tornado: 'tornado',

    // Clear & Clouds
    'clear sky': 'heldere lucht',
    'few clouds': 'lichte bewolking',
    'scattered clouds': 'verspreide bewolking',
    'broken clouds': 'gebroken bewolking',
    'overcast clouds': 'bewolkt',
  }

  return translations[description.toLowerCase()] ?? description
}

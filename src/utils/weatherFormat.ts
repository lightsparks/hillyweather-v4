export function formatTime(unixTime: number | undefined): string {
  if (!unixTime) return '-'
  const date = new Date(unixTime * 1000)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

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

export function windDirectionFromDegrees(degrees: number | undefined): string {
  if (degrees === undefined || degrees === null) return '–'

  // Array of wind directions
  // if (degrees === undefined || degrees === null) return '-'
  //
  // const directions = ['N', 'NNO', 'NO', 'ONO', 'O', 'OZO', 'ZO', 'ZZO',
  //   'Z', 'ZZW', 'ZW', 'WZW', 'W', 'WNW', 'NW', 'NNW']
  // const index = Math.round(degrees / 22.5) % 16
  // return directions[index]

  // Array of arrows pointing in 16 directions
  const arrows = [
    '↓',  // N (wind blowing south)
    '↙',  // NNE
    '↙',  // NE
    '↙',  // ENE
    '←',  // E
    '↖',  // ESE
    '↖',  // SE
    '↖',  // SSE
    '↑',  // S (wind blowing north)
    '↗',  // SSW
    '↗',  // SW
    '↗',  // WSW
    '→',  // W
    '↘',  // WNW
    '↘',  // NW
    '↘',  // NNW
  ]

  const index = Math.round(degrees / 22.5) % 16
  return arrows[index]
}

export function toKmh(mps: number | undefined): string {
  if (mps === undefined || mps === null) return '-'
  return `${Math.round(mps * 3.6)} km/h`;
}

export function beaufortScale(speedMps: number | undefined): string {
  if (speedMps === undefined || speedMps === null) return '-'
  const kmh = speedMps * 3.6

  if (kmh < 1) return 'windstil'
  if (kmh < 6) return 'zeer zwak'
  if (kmh < 12) return 'zwak'
  if (kmh < 20) return 'vrij matig'
  if (kmh < 29) return 'matig'
  if (kmh < 39) return 'vrij krachtig'
  if (kmh < 50) return 'krachtig'
  if (kmh < 62) return 'hard'
  if (kmh < 75) return 'stormachtig'
  if (kmh < 89) return 'storm'
  if (kmh < 103) return 'zware storm'
  if (kmh < 118) return 'zeer zware storm'
  return 'orkaan'
}

export function formatWind(
  speedMps: number | undefined,
  degrees?: number,
  gustMps?: number
): string {
  if (speedMps === undefined || speedMps === null) return '-'

  const kmh = toKmh(speedMps)
  const direction = windDirectionFromDegrees(degrees)

  let gustPart = ''
  if (gustMps !== undefined && gustMps !== null && gustMps > speedMps + 2) {
    gustPart = `, met windstoten tot ${toKmh(gustMps)}`
  }

  return `${kmh} ${direction}${gustPart}`.trim()
}

export function translateWeatherDescription(description: string | undefined): string {
  if (!description) return '-'

  const translations: Record<string, string> = {
    // 🌩 Thunderstorm
    'thunderstorm with light rain': 'onweer met lichte regen',
    'thunderstorm with rain': 'onweer met regen',
    'thunderstorm with heavy rain': 'onweer met zware regen',
    'light thunderstorm': 'licht onweer',
    'thunderstorm': 'onweer',
    'heavy thunderstorm': 'zwaar onweer',
    'ragged thunderstorm': 'onregelmatig onweer',
    'thunderstorm with light drizzle': 'onweer met lichte motregen',
    'thunderstorm with drizzle': 'onweer met motregen',
    'thunderstorm with heavy drizzle': 'onweer met zware motregen',

    // 🌦 Drizzle
    'light intensity drizzle': 'lichte motregen',
    'drizzle': 'motregen',
    'heavy intensity drizzle': 'zware motregen',
    'light intensity drizzle rain': 'lichte motregenregen',
    'drizzle rain': 'motregenregen',
    'heavy intensity drizzle rain': 'zware motregenregen',
    'shower rain and drizzle': 'regenbui met motregen',
    'heavy shower rain and drizzle': 'zware regenbui met motregen',
    'shower drizzle': 'motregenbui',

    // 🌧 Rain
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

    // ❄ Snow
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

    // 🌫 Atmosphere
    'mist': 'mist',
    'smoke': 'rook',
    'haze': 'nevel',
    'sand/dust whirls': 'zand-/stofwervels',
    'fog': 'dichte mist',
    'sand': 'zand',
    'dust': 'stof',
    'volcanic ash': 'vulkanische as',
    'squalls': 'windvlagen',
    'tornado': 'tornado',

    // ☀️ Clear & Clouds
    'clear sky': 'heldere lucht',
    'few clouds': 'lichte bewolking',
    'few clouds: 11-25%': 'lichte bewolking (11-25%)',
    'scattered clouds': 'verspreide bewolking',
    'scattered clouds: 25-50%': 'verspreide bewolking (25-50%)',
    'broken clouds': 'gebroken bewolking',
    'broken clouds: 51-84%': 'gebroken bewolking (51-84%)',
    'overcast clouds': 'bewolkt',
    'overcast clouds: 85-100%': 'bewolkt (85-100%)',
  }

  return translations[description.toLowerCase()] ?? description
}
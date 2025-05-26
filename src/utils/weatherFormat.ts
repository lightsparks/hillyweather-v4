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
  if (degrees === undefined || degrees === null) return '-'

  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
    'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
  const index = Math.round(degrees / 22.5) % 16
  return directions[index]
}

export function toKmh(mps: number | undefined): string {
  if (mps === undefined || mps === null) return '-'
  return `${Math.round(mps * 3.6)} km/h`
}

export function beaufortScale(speedMps: number | undefined): string {
  if (speedMps === undefined || speedMps === null) return '-'
  const kmh = speedMps * 3.6

  if (kmh < 1) return 'Calm'
  if (kmh < 6) return 'Light air'
  if (kmh < 12) return 'Light breeze'
  if (kmh < 20) return 'Gentle breeze'
  if (kmh < 29) return 'Moderate breeze'
  if (kmh < 39) return 'Fresh breeze'
  if (kmh < 50) return 'Strong breeze'
  if (kmh < 62) return 'Near gale'
  if (kmh < 75) return 'Gale'
  if (kmh < 89) return 'Severe gale'
  if (kmh < 103) return 'Storm'
  if (kmh < 118) return 'Violent storm'
  return 'Hurricane'
}

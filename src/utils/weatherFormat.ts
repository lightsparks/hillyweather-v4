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

  if (kmh < 1) return 'calm'
  if (kmh < 6) return 'light air'
  if (kmh < 12) return 'light breeze'
  if (kmh < 20) return 'gentle breeze'
  if (kmh < 29) return 'moderate breeze'
  if (kmh < 39) return 'fresh breeze'
  if (kmh < 50) return 'strong breeze'
  if (kmh < 62) return 'near gale'
  if (kmh < 75) return 'gale'
  if (kmh < 89) return 'severe gale'
  if (kmh < 103) return 'storm'
  if (kmh < 118) return 'violent storm'
  return 'hurricane'
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
    gustPart = `, gusts up to ${toKmh(gustMps)}`
  }

  return `${kmh} ${direction}${gustPart}`.trim()
}

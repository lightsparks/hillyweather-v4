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

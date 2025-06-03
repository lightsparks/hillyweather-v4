import { ref } from 'vue'

/**
 * Handles GDPR-compliant geolocation permission flow
 * - Shows custom consent dialog if needed
 * - Uses Permissions API to skip prompt if possible
 * - Honors previous decisions
 */
export function useGeolocationConsent(
  fetchWeather: (lat: string, lon: string, label: string) => void,
  useMyLocation: () => void,
) {
  const showLocationConsent = ref(false)

  const fallbackLat = import.meta.env.VITE_FALLBACK_LAT
  const fallbackLon = import.meta.env.VITE_FALLBACK_LON
  const fallbackCity = import.meta.env.VITE_FALLBACK_CITY || 'Default City'
  const fallbackCountry = import.meta.env.VITE_FALLBACK_COUNTRY || ''

  async function initGeolocationFlow() {
    const storedConsent = localStorage.getItem('locationConsent')

    const permissionStatus = await navigator.permissions?.query({
      name: 'geolocation',
    })

    if (permissionStatus?.state === 'granted') {
      useMyLocation()
      return
    }

    if (permissionStatus?.state === 'denied') {
      fetchFallback()
      return
    }

    if (storedConsent === 'granted') {
      useMyLocation()
    } else if (storedConsent === 'denied') {
      fetchFallback()
    } else {
      showLocationConsent.value = true
    }
  }

  function grantConsent() {
    localStorage.setItem('locationConsent', 'granted')
    showLocationConsent.value = false
    console.log('[Consent] User granted permission – requesting location')
    useMyLocation()
  }

  function denyConsent() {
    localStorage.setItem('locationConsent', 'denied')
    showLocationConsent.value = false
    fetchFallback()
  }

  function fetchFallback() {
    fetchWeather(
      fallbackLat,
      fallbackLon,
      `${fallbackCity}, ${fallbackCountry}`,
    )
  }

  return {
    showLocationConsent,
    initGeolocationFlow,
    grantConsent,
    denyConsent,
  }
}

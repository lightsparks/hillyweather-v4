export function debounce<F extends (...args: unknown[]) => unknown>(
  func: F,
  wait: number
): (...args: Parameters<F>) => void {
  let timeout: ReturnType<typeof setTimeout>

  return function (...args: Parameters<F>) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      void func(...args) // ignore return value, even if async
    }, wait)
  }
}

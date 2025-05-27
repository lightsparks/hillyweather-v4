export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>

  return function (...args: Parameters<T>) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      void func(...args)
    }, wait)
  }
}

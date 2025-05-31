export function debounce<
  Args extends unknown[],
  R
>(
  func: (...args: Args) => R,
  wait: number
): (...args: Args) => void {
  let timeout: ReturnType<typeof setTimeout>

  return (...args: Args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      // We use `void` to ignore the return value of `func`, if any
      void func(...args)
    }, wait)
  }
}
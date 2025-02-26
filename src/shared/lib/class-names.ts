type ClassValue = string | { [key: string]: boolean } | undefined | null

export function classNames(...args: ClassValue[]): string {
  const classes: string[] = []

  args.forEach((arg) => {
    if (!arg) return

    if (typeof arg === 'string') {
      classes.push(arg)
    } else if (typeof arg === 'object') {
      Object.entries(arg).forEach(([key, value]) => {
        if (value) {
          classes.push(key)
        }
      })
    }
  })

  return classes.join(' ')
} 
export const compareByNumbers =
  (key: string, dir: string) =>
  (a: Record<string, number>, b: Record<string, number>) =>
    dir === 'asc' ? a[key] - b[key] : b[key] - a[key]

export const compareByString =
  (key: string, dir: string) =>
  (a: Record<string, string>, b: Record<string, string>) => {
    if (a[key] > b[key]) {
      return dir === 'asc' ? 1 : -1
    }
    if (a[key] < b[key]) {
      return dir === 'asc' ? -1 : 1
    }

    return 0
  }

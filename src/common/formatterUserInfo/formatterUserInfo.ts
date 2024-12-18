export const longestStringFormatter = (str: string): string => {
  if (str.length <= 10) {
    return str
  }
  const prefix = str.slice(0, 25)

  // return `${prefix}...`
  return str
}

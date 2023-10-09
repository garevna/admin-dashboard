let timestamp = 0

export function lastCalcTimestamp (arg) {
  const test = Boolean(arg) || Date.now() - timestamp > 1000 * 60 * 30
  timestamp = test ? Date.now() : timestamp
  return Boolean(arg) || test
}

const buckets = new Map<string, { count: number; ts: number }>()
export function allow(ip: string, limit = 10, windowMs = 60000) {
  const now = Date.now()
  const slot = Math.floor(now / windowMs)
  const key = `${ip}:${slot}`
  const entry = buckets.get(key) || { count: 0, ts: slot }
  entry.count += 1
  buckets.set(key, entry)
  return entry.count <= limit
}

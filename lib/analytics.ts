'use client'
import posthog from 'posthog-js'
let loaded = false
export function initAnalytics() {
  if (loaded) return
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com'
  if (!key) return
  posthog.init(key, { api_host: host, autocapture: false, capture_pageview: false, disable_session_recording: true, persistence: 'memory' })
  loaded = true
}
export const track = (event: string, props?: Record<string, any>) => { if (!loaded) initAnalytics(); try { posthog.capture(event, props) } catch {} }

export function normalizeUrl(input: string): string {
  let url = input.trim().toLowerCase()
  if (!/^https?:\/\//i.test(url)) url = 'https://' + url

  const parsed = new URL(url)
  // Remove trailing slash (except root)
  if (parsed.pathname.endsWith('/') && parsed.pathname !== '/') {
    parsed.pathname = parsed.pathname.slice(0, -1)
  }
  return parsed.toString()
}

export function isInternalUrl(url: string): boolean {
  try {
    const { hostname } = new URL(url)
    if (['localhost', '127.0.0.1', '::1'].includes(hostname)) return true

    // Private IPv4 ranges
    if (
      hostname.startsWith('10.') ||
      hostname.startsWith('192.168.') ||
      hostname.startsWith('172.16.') || hostname.startsWith('172.17.') ||
      hostname.startsWith('172.18.') || hostname.startsWith('172.19.') ||
      hostname.startsWith('172.20.') || hostname.startsWith('172.21.') ||
      hostname.startsWith('172.22.') || hostname.startsWith('172.23.') ||
      hostname.startsWith('172.24.') || hostname.startsWith('172.25.') ||
      hostname.startsWith('172.26.') || hostname.startsWith('172.27.') ||
      hostname.startsWith('172.28.') || hostname.startsWith('172.29.') ||
      hostname.startsWith('172.30.') || hostname.startsWith('172.31.') ||
      hostname.startsWith('169.254.')
    ) return true

    return false
  } catch {
    return true // invalid = block
  }
}
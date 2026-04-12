const SAFE_URL_PROTOCOLS = ['http:', 'https:']
const SAFE_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  'image/x-icon',
  'image/vnd.microsoft.icon',
]

export function normalizeText(value: string | null | undefined) {
  return value?.trim() ?? ''
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function isValidSlug(value: string) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)
}

export function validateLength(value: string, max: number) {
  return value.length <= max
}

export function sanitizeFilename(filename: string) {
  return filename.replace(/[^a-zA-Z0-9._-]/g, '-').replace(/-+/g, '-')
}

export function isSafeUrl(value: string | null | undefined) {
  if (!value) return true

  try {
    const url = new URL(value)
    return SAFE_URL_PROTOCOLS.includes(url.protocol)
  } catch {
    return false
  }
}

export function isSafeInternalRedirect(value: string | null | undefined) {
  if (!value) return false
  return value.startsWith('/') && !value.startsWith('//') && !value.includes('://')
}

export function isAllowedImageMimeType(value: string) {
  return SAFE_IMAGE_MIME_TYPES.includes(value)
}

export function getBase64ByteLength(base64: string) {
  const normalized = base64.replace(/\s/g, '')
  const padding = normalized.endsWith('==') ? 2 : normalized.endsWith('=') ? 1 : 0
  return (normalized.length * 3) / 4 - padding
}

export function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message)
  }
}

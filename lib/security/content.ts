const BLOCKED_TAGS = ['script', 'style', 'iframe', 'object', 'embed', 'form', 'svg']
const BLOCKED_PROTOCOLS = ['javascript:', 'vbscript:', 'data:text/']

export function sanitizeRichTextHtml(html: string | null | undefined): string | null {
  if (!html) return null

  let sanitized = html

  for (const tag of BLOCKED_TAGS) {
    sanitized = sanitized.replace(new RegExp(`<${tag}[\\s\\S]*?<\\/${tag}>`, 'gi'), '')
  }

  sanitized = sanitized
    .replace(/\son\w+=(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/\sstyle=(?:"[^"]*"|'[^']*')/gi, '')

  for (const protocol of BLOCKED_PROTOCOLS) {
    sanitized = sanitized.replace(new RegExp(protocol, 'gi'), '')
  }

  return sanitized
}

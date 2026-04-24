import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Standard shadcn classnames helper
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Slug genereren
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// Datum formatteren (NL)
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// Tekst inkorten
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

// Supabase storage URL genereren
export function getStorageUrl(bucket: string, path: string): string {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`
}

export function normalizePhoneForWhatsApp(phone: string): string {
  const digits = phone.replace(/\D/g, '')

  if (digits.startsWith('00')) return digits.slice(2)
  if (digits.startsWith('0')) return `31${digits.slice(1)}`

  return digits
}

export function createWhatsAppHref(phone: string, message?: string): string {
  const normalizedPhone = normalizePhoneForWhatsApp(phone)
  const base = `https://wa.me/${normalizedPhone}`

  if (!message) return base

  return `${base}?text=${encodeURIComponent(message)}`
}

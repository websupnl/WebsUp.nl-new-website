import { NextRequest, NextResponse } from 'next/server'
import { isValidEmail, normalizeText, validateLength } from '@/lib/security/validation'
import { rateLimit } from '@/lib/security/rate-limit'
import { siteConfig } from '@/config/site.config'

interface ContactBody {
  name: string
  email: string
  subject?: string
  message: string
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.BREVO_API_KEY
  const toEmail = process.env.CONTACT_TO_EMAIL ?? process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? siteConfig.email
  const toName = siteConfig.name

  if (!apiKey) {
    console.error('BREVO_API_KEY is not set')
    return NextResponse.json(
      { error: 'E-mailservice niet geconfigureerd.' },
      { status: 500 }
    )
  }

  let body: ContactBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Ongeldig verzoek.' }, { status: 400 })
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const limiter = rateLimit(`contact:${ip}`, 5, 10 * 60 * 1000)
  if (!limiter.allowed) {
    return NextResponse.json(
      { error: 'Te veel aanvragen. Probeer het later opnieuw.' },
      { status: 429 }
    )
  }

  const name = normalizeText(body.name)
  const email = normalizeText(body.email)
  const subject = normalizeText(body.subject)
  const message = normalizeText(body.message)

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Vul alle verplichte velden in.' }, { status: 422 })
  }

  // Input length limits
  if (!validateLength(name, 100) || !validateLength(email, 254) || !validateLength(subject, 200) || !validateLength(message, 5000)) {
    return NextResponse.json({ error: 'Een of meer velden bevatten te veel tekens.' }, { status: 422 })
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Ongeldig e-mailadres.' }, { status: 422 })
  }

  const subjectLine = subject
    ? `Contactformulier: ${subject}`
    : `Nieuw bericht van ${name}`

  const htmlContent = `
    <div style="font-family: Inter, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111827;">
      <div style="background: #0F172A; padding: 32px; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 20px;">Nieuw contactformulier</h1>
        <p style="color: #94a3b8; margin: 8px 0 0; font-size: 14px;">Via ${escapeHtml(siteConfig.name)}</p>
      </div>
      <div style="background: #f8fafc; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0; border-top: none;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #64748b; width: 100px;">Naam</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-size: 14px; font-weight: 600; color: #111827;">${escapeHtml(name)}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #64748b;">E-mail</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #2563eb;">
              <a href="mailto:${escapeHtml(email)}" style="color: #2563eb;">${escapeHtml(email)}</a>
            </td>
          </tr>
          ${subject ? `
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #64748b;">Onderwerp</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #111827;">${escapeHtml(subject)}</td>
          </tr>` : ''}
        </table>
        <div style="margin-top: 24px;">
          <p style="font-size: 13px; color: #64748b; margin: 0 0 8px;">Bericht:</p>
          <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.7; color: #374151; white-space: pre-wrap;">${escapeHtml(message)}</div>
        </div>
        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
          <a href="mailto:${escapeHtml(email)}" style="display: inline-block; background: #0F172A; color: white; padding: 10px 20px; border-radius: 8px; font-size: 13px; font-weight: 600; text-decoration: none;">
            Beantwoorden
          </a>
        </div>
      </div>
    </div>
  `

  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        sender: {
          name: `${name} via ${siteConfig.name}`,
          email: siteConfig.email,
        },
        replyTo: {
          name,
          email,
        },
        to: [{ name: toName, email: toEmail }],
        subject: subjectLine,
        htmlContent,
      }),
    })

    if (!res.ok) {
      const text = await res.text()
      console.error('Brevo error:', res.status, text)
      return NextResponse.json(
        { error: 'Verzenden mislukt. Probeer het later opnieuw.' },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json(
      { error: 'Er is een fout opgetreden. Probeer het later opnieuw.' },
      { status: 500 }
    )
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

import { NextRequest, NextResponse } from 'next/server'
import { siteConfig } from '@/config/site.config'
import { rateLimit } from '@/lib/security/rate-limit'
import { isValidEmail, normalizeText, validateLength } from '@/lib/security/validation'

interface ContactBody {
  name: string
  email: string
  subject?: string
  message: string
  type?: string
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.BREVO_API_KEY
  const toEmail =
    process.env.CONTACT_TO_EMAIL ?? process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? siteConfig.email
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? siteConfig.email

  if (!apiKey) {
    console.error('BREVO_API_KEY is not set')
    return NextResponse.json({ error: 'E-mailservice niet geconfigureerd.' }, { status: 500 })
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
  const projectType = normalizeText(body.type)

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Vul alle verplichte velden in.' }, { status: 422 })
  }

  if (
    !validateLength(name, 100) ||
    !validateLength(email, 254) ||
    !validateLength(subject, 200) ||
    !validateLength(projectType, 120) ||
    !validateLength(message, 5000)
  ) {
    return NextResponse.json(
      { error: 'Een of meer velden bevatten te veel tekens.' },
      { status: 422 }
    )
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Ongeldig e-mailadres.' }, { status: 422 })
  }

  const subjectLine = subject
    ? `Nieuw contactverzoek: ${subject}`
    : `Nieuw bericht van ${name}`

  const projectTypeRow = projectType
    ? `
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-size: 13px; color: #6b7280;">Type vraag</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-size: 14px; color: #111827; font-weight: 600;">${escapeHtml(projectType)}</td>
          </tr>`
    : ''

  const htmlContent = `
    <div style="margin:0; padding:24px; background:#f5f5f4; font-family:Inter,Arial,sans-serif; color:#111827;">
      <div style="max-width:680px; margin:0 auto; overflow:hidden; border-radius:24px; border:1px solid #e7e5e4; background:#ffffff; box-shadow:0 20px 50px rgba(15,23,42,0.08);">
        <div style="padding:32px; background:#06040c; color:#ffffff;">
          <div style="display:inline-block; padding:6px 10px; border:1px solid rgba(255,255,255,0.12); border-radius:999px; font-size:11px; letter-spacing:0.12em; text-transform:uppercase; color:rgba(255,255,255,0.66);">
            Contactformulier
          </div>
          <h1 style="margin:18px 0 0; font-size:24px; line-height:1.2;">Nieuw bericht via WebsUp.nl</h1>
          <p style="margin:10px 0 0; font-size:14px; line-height:1.7; color:rgba(255,255,255,0.72);">
            Iemand heeft een nieuwe aanvraag of vraag ingestuurd via de website.
          </p>
        </div>

        <div style="padding:32px;">
          <table style="width:100%; border-collapse:collapse;">
            <tr>
              <td style="padding:12px 0; border-bottom:1px solid #e5e7eb; font-size:13px; color:#6b7280; width:120px;">Naam</td>
              <td style="padding:12px 0; border-bottom:1px solid #e5e7eb; font-size:14px; color:#111827; font-weight:600;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding:12px 0; border-bottom:1px solid #e5e7eb; font-size:13px; color:#6b7280;">E-mail</td>
              <td style="padding:12px 0; border-bottom:1px solid #e5e7eb; font-size:14px;">
                <a href="mailto:${escapeHtml(email)}" style="color:#ea580c; text-decoration:none; font-weight:600;">${escapeHtml(email)}</a>
              </td>
            </tr>
            ${projectTypeRow}
            ${
              subject
                ? `
          <tr>
            <td style="padding:12px 0; border-bottom:1px solid #e5e7eb; font-size:13px; color:#6b7280;">Onderwerp</td>
            <td style="padding:12px 0; border-bottom:1px solid #e5e7eb; font-size:14px; color:#111827; font-weight:600;">${escapeHtml(subject)}</td>
          </tr>`
                : ''
            }
          </table>

          <div style="margin-top:24px;">
            <div style="font-size:13px; color:#6b7280; margin-bottom:10px;">Bericht</div>
            <div style="padding:18px; border:1px solid #e7e5e4; border-radius:18px; background:#fafaf9; font-size:14px; line-height:1.8; color:#44403c; white-space:pre-wrap;">${escapeHtml(message)}</div>
          </div>

          <div style="margin-top:24px; padding-top:20px; border-top:1px solid #e7e5e4;">
            <a href="mailto:${escapeHtml(email)}" style="display:inline-block; padding:12px 20px; border-radius:999px; background:#0f172a; color:#ffffff; text-decoration:none; font-size:13px; font-weight:700;">
              Reageer direct
            </a>
          </div>
        </div>
      </div>
    </div>
  `

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        sender: {
          name: `${siteConfig.shortName} contactformulier`,
          email: fromEmail,
        },
        replyTo: {
          name,
          email,
        },
        to: [{ name: siteConfig.shortName, email: toEmail }],
        subject: subjectLine,
        htmlContent,
      }),
    })

    if (!response.ok) {
      const text = await response.text()
      console.error('Brevo error:', response.status, text)
      return NextResponse.json(
        { error: 'Verzenden mislukt. Probeer het later opnieuw.' },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: 'Er is een fout opgetreden. Probeer het later opnieuw.' },
      { status: 500 }
    )
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

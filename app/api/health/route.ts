export async function GET() {
  const configured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  return Response.json({
    ok: configured,
    status: configured ? 'healthy' : 'degraded',
    timestamp: new Date().toISOString(),
  })
}

/**
 * Tenant context
 *
 * For single-tenant: set NEXT_PUBLIC_TENANT_ID in .env.local
 * For multi-tenant:  resolve tenant_id from hostname / JWT claim / subdomain
 *
 * Default fallback = the seed UUID from schema_v2.sql
 */

export const DEFAULT_TENANT_ID = '00000000-0000-0000-0000-000000000001'

export function getTenantId(): string {
  return process.env.NEXT_PUBLIC_TENANT_ID ?? DEFAULT_TENANT_ID
}

/**
 * Server-side: resolve tenant from request hostname (future multi-tenant hook)
 * For now returns the same as getTenantId().
 */
export function getTenantIdFromHostname(_hostname: string): string {
  // TODO: look up tenant by hostname in DB for true multi-tenant
  return getTenantId()
}

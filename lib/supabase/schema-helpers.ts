export function isMissingColumnError(error: { message?: string } | null | undefined, column: string) {
  return Boolean(error?.message?.includes(`Could not find the '${column}' column`))
}

export function isMissingTableError(error: { message?: string } | null | undefined, table: string) {
  return Boolean(error?.message?.includes(`Could not find the table 'public.${table}'`))
}

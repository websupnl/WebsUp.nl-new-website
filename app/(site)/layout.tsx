export const revalidate = 3600

import SiteFrame from '@/components/site/SiteFrame'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteFrame>{children}</SiteFrame>
}

import { MarketingChrome } from "../_components/marketing-chrome"

export default function SubsidyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MarketingChrome brand="lsystem">{children}</MarketingChrome>
}

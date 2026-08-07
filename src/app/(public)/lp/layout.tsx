import { MarketingChrome } from "../_components/marketing-chrome"

export default function LpLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MarketingChrome brand="lsystem">{children}</MarketingChrome>
}

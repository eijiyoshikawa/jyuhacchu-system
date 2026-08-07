import { MarketingChrome } from "../_components/marketing-chrome"

export default function TransactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MarketingChrome brand="dsystem">{children}</MarketingChrome>
}

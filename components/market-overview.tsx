import { ArrowUpRight, ArrowDownRight } from "lucide-react"

export function MarketOverview() {
  const markets = [
    { symbol: "BTC", name: "Bitcoin", price: 31245.67, change: 2.34 },
    { symbol: "ETH", name: "Ethereum", price: 1845.32, change: 1.56 },
    { symbol: "SOL", name: "Solana", price: 102.45, change: -3.21 },
    { symbol: "ADA", name: "Cardano", price: 0.45, change: 0.78 },
    { symbol: "DOT", name: "Polkadot", price: 6.32, change: -1.23 },
  ]

  return (
    <div className="space-y-2">
      {markets.map((market) => (
        <div key={market.symbol} className="flex items-center justify-between py-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              {market.symbol.charAt(0)}
            </div>
            <div>
              <div className="font-medium">{market.symbol}</div>
              <div className="text-xs text-muted-foreground">{market.name}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-medium">${market.price.toLocaleString()}</div>
            <div className={market.change >= 0 ? "text-green-500 text-xs" : "text-red-500 text-xs"}>
              {market.change >= 0 ? (
                <ArrowUpRight className="h-3 w-3 inline mr-1" />
              ) : (
                <ArrowDownRight className="h-3 w-3 inline mr-1" />
              )}
              {Math.abs(market.change)}%
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

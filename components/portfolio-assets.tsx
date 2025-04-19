import { Progress } from "@/components/ui/progress"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

export function PortfolioAssets() {
  const assets = [
    {
      symbol: "BTC",
      name: "Bitcoin",
      amount: 0.25,
      value: 7811.42,
      allocation: 63.27,
      price: 31245.67,
      change: 2.34,
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      amount: 1.5,
      value: 2767.98,
      allocation: 22.42,
      price: 1845.32,
      change: 1.56,
    },
    {
      symbol: "SOL",
      name: "Solana",
      amount: 12.5,
      value: 1280.63,
      allocation: 10.37,
      price: 102.45,
      change: -3.21,
    },
    {
      symbol: "ADA",
      name: "Cardano",
      amount: 500,
      value: 225.0,
      allocation: 1.82,
      price: 0.45,
      change: 0.78,
    },
    {
      symbol: "DOT",
      name: "Polkadot",
      amount: 25,
      value: 158.0,
      allocation: 1.28,
      price: 6.32,
      change: -1.23,
    },
  ]

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs text-muted-foreground">
              <th className="pb-2">Asset</th>
              <th className="pb-2">Amount</th>
              <th className="pb-2">Value</th>
              <th className="pb-2">Allocation</th>
              <th className="pb-2">Price</th>
              <th className="pb-2">24h</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset.symbol} className="border-t border-border">
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      {asset.symbol.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium">{asset.symbol}</div>
                      <div className="text-xs text-muted-foreground">{asset.name}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3">{asset.amount}</td>
                <td className="py-3 font-medium">${asset.value.toLocaleString()}</td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <Progress value={asset.allocation} className="w-16 h-2" />
                    <span className="text-xs">{asset.allocation.toFixed(1)}%</span>
                  </div>
                </td>
                <td className="py-3">${asset.price.toLocaleString()}</td>
                <td className="py-3">
                  <div className={asset.change >= 0 ? "text-green-500 text-xs" : "text-red-500 text-xs"}>
                    {asset.change >= 0 ? (
                      <ArrowUpRight className="h-3 w-3 inline mr-1" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 inline mr-1" />
                    )}
                    {Math.abs(asset.change)}%
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

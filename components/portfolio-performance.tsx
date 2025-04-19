import { Card } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

export function PortfolioPerformance() {
  const performanceData = [
    { period: "24h", value: 2.5, change: 245.89 },
    { period: "7d", value: 5.8, change: 567.32 },
    { period: "30d", value: -1.2, change: -120.45 },
    { period: "90d", value: 12.4, change: 1156.78 },
    { period: "1y", value: 32.7, change: 2876.54 },
    { period: "All Time", value: 124.5, change: 6845.23 },
  ]

  return (
    <div className="space-y-4">
      {performanceData.map((data) => (
        <Card key={data.period} className="p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{data.period}</span>
            <div className="text-right">
              <div className={data.value >= 0 ? "text-green-500 font-medium" : "text-red-500 font-medium"}>
                {data.value >= 0 ? (
                  <ArrowUpRight className="h-3 w-3 inline mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 inline mr-1" />
                )}
                {Math.abs(data.value)}%
              </div>
              <div className="text-xs text-muted-foreground">
                {data.value >= 0 ? "+" : "-"}${Math.abs(data.change).toLocaleString()}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

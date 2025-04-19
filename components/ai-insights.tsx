import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

export function AiInsights() {
  const insights = [
    {
      asset: "BTC",
      prediction: "bullish",
      confidence: 78,
      timeframe: "24h",
      reason: "Increased institutional buying and positive market sentiment",
    },
    {
      asset: "ETH",
      prediction: "bullish",
      confidence: 65,
      timeframe: "24h",
      reason: "Technical breakout above resistance level",
    },
    {
      asset: "SOL",
      prediction: "bearish",
      confidence: 72,
      timeframe: "24h",
      reason: "Overbought conditions and potential profit-taking",
    },
  ]

  return (
    <div className="space-y-4">
      {insights.map((insight, index) => (
        <Card key={index} className="p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="font-bold">{insight.asset}</span>
              <Badge variant={insight.prediction === "bullish" ? "default" : "destructive"}>
                {insight.prediction === "bullish" ? (
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                )}
                {insight.prediction}
              </Badge>
            </div>
            <span className="text-sm">{insight.timeframe}</span>
          </div>
          <div className="mb-2">
            <div className="flex items-center justify-between text-sm">
              <span>Confidence</span>
              <span className="font-medium">{insight.confidence}%</span>
            </div>
            <div className="w-full h-2 bg-secondary rounded-full mt-1">
              <div
                className={`h-2 rounded-full ${insight.prediction === "bullish" ? "bg-green-500" : "bg-red-500"}`}
                style={{ width: `${insight.confidence}%` }}
              />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">{insight.reason}</p>
        </Card>
      ))}
      <div className="text-center mt-2">
        <Badge variant="outline" className="cursor-pointer">
          View All Insights
        </Badge>
      </div>
    </div>
  )
}

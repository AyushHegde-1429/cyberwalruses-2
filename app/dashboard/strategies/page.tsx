import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StrategyPerformance } from "@/components/strategy-performance"
import { Plus, Play, Pause, Settings, Trash2 } from "lucide-react"

export default function StrategiesPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">AI Strategies</h2>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create Strategy
          </Button>
        </div>
        <p className="text-muted-foreground">Manage your automated trading strategies</p>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="paused">Paused</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <StrategyCard
              title="Momentum Trader"
              description="Uses price momentum indicators to identify entry and exit points"
              status="active"
              performance="+12.5%"
              assets="BTC, ETH, SOL"
              timeframe="4h"
            />
            <StrategyCard
              title="Volatility Breakout"
              description="Identifies breakouts from periods of low volatility"
              status="active"
              performance="+8.3%"
              assets="BTC, ETH"
              timeframe="1h"
            />
          </div>
        </TabsContent>
        <TabsContent value="paused" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <StrategyCard
              title="Mean Reversion"
              description="Trades based on price returning to historical average"
              status="paused"
              performance="+3.7%"
              assets="BTC, ETH, ADA"
              timeframe="1d"
            />
          </div>
        </TabsContent>
        <TabsContent value="all" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <StrategyCard
              title="Momentum Trader"
              description="Uses price momentum indicators to identify entry and exit points"
              status="active"
              performance="+12.5%"
              assets="BTC, ETH, SOL"
              timeframe="4h"
            />
            <StrategyCard
              title="Volatility Breakout"
              description="Identifies breakouts from periods of low volatility"
              status="active"
              performance="+8.3%"
              assets="BTC, ETH"
              timeframe="1h"
            />
            <StrategyCard
              title="Mean Reversion"
              description="Trades based on price returning to historical average"
              status="paused"
              performance="+3.7%"
              assets="BTC, ETH, ADA"
              timeframe="1d"
            />
          </div>
        </TabsContent>
      </Tabs>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Strategy Performance</CardTitle>
          <CardDescription>30-day comparison</CardDescription>
        </CardHeader>
        <CardContent>
          <StrategyPerformance />
        </CardContent>
      </Card>
    </div>
  )
}

interface StrategyCardProps {
  title: string
  description: string
  status: "active" | "paused"
  performance: string
  assets: string
  timeframe: string
}

function StrategyCard({ title, description, status, performance, assets, timeframe }: StrategyCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <Badge variant={status === "active" ? "default" : "secondary"}>
            {status === "active" ? "Active" : "Paused"}
          </Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Performance</p>
            <p className={`text-lg font-bold ${performance.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
              {performance}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Assets</p>
            <p className="text-lg font-medium">{assets}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Timeframe</p>
            <p className="text-lg font-medium">{timeframe}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Last Trade</p>
            <p className="text-lg font-medium">2h ago</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {status === "active" ? (
          <Button variant="outline" size="sm">
            <Pause className="mr-2 h-4 w-4" /> Pause
          </Button>
        ) : (
          <Button variant="outline" size="sm">
            <Play className="mr-2 h-4 w-4" /> Activate
          </Button>
        )}
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

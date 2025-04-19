"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Maximize2, Minimize2 } from "lucide-react"

export function TradingViewChart() {
  const chartRef = useRef<HTMLDivElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Mock chart data
  const generateChartData = () => {
    const data = []
    let price = 30000
    const now = new Date()

    for (let i = 30; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(now.getDate() - i)

      // Random price movement
      const change = (Math.random() - 0.5) * 500
      price += change

      data.push({
        date: date.toISOString().split("T")[0],
        price: price,
      })
    }

    return data
  }

  const chartData = generateChartData()

  useEffect(() => {
    if (chartRef.current) {
      // In a real app, you would initialize a chart library here
      // For this example, we'll just create a simple canvas chart
      const canvas = document.createElement("canvas")
      canvas.width = chartRef.current.clientWidth
      canvas.height = 400
      chartRef.current.innerHTML = ""
      chartRef.current.appendChild(canvas)

      const ctx = canvas.getContext("2d")
      if (ctx) {
        // Draw chart
        ctx.fillStyle = "#0f172a"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Draw grid
        ctx.strokeStyle = "#334155"
        ctx.lineWidth = 0.5

        // Horizontal grid lines
        for (let i = 0; i < 5; i++) {
          const y = i * (canvas.height / 4)
          ctx.beginPath()
          ctx.moveTo(0, y)
          ctx.lineTo(canvas.width, y)
          ctx.stroke()
        }

        // Vertical grid lines
        for (let i = 0; i < 7; i++) {
          const x = i * (canvas.width / 6)
          ctx.beginPath()
          ctx.moveTo(x, 0)
          ctx.lineTo(x, canvas.height)
          ctx.stroke()
        }

        // Draw price line
        ctx.strokeStyle = "#22c55e"
        ctx.lineWidth = 2
        ctx.beginPath()

        const minPrice = Math.min(...chartData.map((d) => d.price))
        const maxPrice = Math.max(...chartData.map((d) => d.price))
        const priceRange = maxPrice - minPrice

        chartData.forEach((dataPoint, index) => {
          const x = (index / (chartData.length - 1)) * canvas.width
          const y =
            canvas.height - ((dataPoint.price - minPrice) / priceRange) * canvas.height * 0.8 - canvas.height * 0.1

          if (index === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        })

        ctx.stroke()

        // Add price labels
        ctx.fillStyle = "#e2e8f0"
        ctx.font = "12px sans-serif"
        ctx.textAlign = "right"

        for (let i = 0; i < 5; i++) {
          const price = minPrice + (priceRange * i) / 4
          const y = canvas.height - ((price - minPrice) / priceRange) * canvas.height * 0.8 - canvas.height * 0.1
          ctx.fillText(`$${Math.round(price).toLocaleString()}`, canvas.width - 10, y + 4)
        }

        // Add date labels
        ctx.textAlign = "center"
        for (let i = 0; i < 7; i++) {
          const index = Math.floor((i * (chartData.length - 1)) / 6)
          const x = i * (canvas.width / 6)
          ctx.fillText(chartData[index].date.slice(5), x, canvas.height - 10)
        }
      }
    }
  }, [chartData, isFullscreen])

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div className={`relative ${isFullscreen ? "fixed inset-0 z-50 bg-background p-6" : ""}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold">BTC/USDT</span>
          <span className="text-green-500">$31,245.67</span>
          <span className="text-xs text-green-500">+2.34%</span>
        </div>
        <div className="flex items-center gap-4">
          <Tabs defaultValue="1d">
            <TabsList>
              <TabsTrigger value="1h">1H</TabsTrigger>
              <TabsTrigger value="4h">4H</TabsTrigger>
              <TabsTrigger value="1d">1D</TabsTrigger>
              <TabsTrigger value="1w">1W</TabsTrigger>
              <TabsTrigger value="1m">1M</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      <div ref={chartRef} className="w-full h-[400px]" />
      <div className="flex justify-between mt-4">
        <Button variant="outline" className="gap-1">
          Buy <span className="text-green-500">$31,245.67</span>
        </Button>
        <Button variant="outline" className="gap-1">
          Sell <span className="text-red-500">$31,245.67</span>
        </Button>
      </div>
    </div>
  )
}

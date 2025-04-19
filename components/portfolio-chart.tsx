"use client"

import { useEffect, useRef } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function PortfolioChart() {
  const chartRef = useRef<HTMLDivElement>(null)

  // Mock portfolio data
  const generatePortfolioData = () => {
    const data = []
    let value = 10000
    const now = new Date()

    for (let i = 30; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(now.getDate() - i)

      // Random value movement
      const change = (Math.random() - 0.45) * 200 // Slightly biased towards positive
      value += change

      data.push({
        date: date.toISOString().split("T")[0],
        value: value,
      })
    }

    return data
  }

  const portfolioData = generatePortfolioData()

  useEffect(() => {
    if (chartRef.current) {
      // In a real app, you would initialize a chart library here
      // For this example, we'll just create a simple canvas chart
      const canvas = document.createElement("canvas")
      canvas.width = chartRef.current.clientWidth
      canvas.height = 300
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

        // Draw portfolio value line
        ctx.strokeStyle = "#22c55e"
        ctx.lineWidth = 2
        ctx.beginPath()

        const minValue = Math.min(...portfolioData.map((d) => d.value))
        const maxValue = Math.max(...portfolioData.map((d) => d.value))
        const valueRange = maxValue - minValue

        // Fill area under the line
        ctx.fillStyle = "rgba(34, 197, 94, 0.1)"
        ctx.beginPath()
        ctx.moveTo(0, canvas.height)

        portfolioData.forEach((dataPoint, index) => {
          const x = (index / (portfolioData.length - 1)) * canvas.width
          const y =
            canvas.height - ((dataPoint.value - minValue) / valueRange) * canvas.height * 0.8 - canvas.height * 0.1
          ctx.lineTo(x, y)
        })

        ctx.lineTo(canvas.width, canvas.height)
        ctx.closePath()
        ctx.fill()

        // Draw the line
        ctx.beginPath()
        portfolioData.forEach((dataPoint, index) => {
          const x = (index / (portfolioData.length - 1)) * canvas.width
          const y =
            canvas.height - ((dataPoint.value - minValue) / valueRange) * canvas.height * 0.8 - canvas.height * 0.1

          if (index === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        })
        ctx.stroke()

        // Add value labels
        ctx.fillStyle = "#e2e8f0"
        ctx.font = "12px sans-serif"
        ctx.textAlign = "right"

        for (let i = 0; i < 5; i++) {
          const value = minValue + (valueRange * i) / 4
          const y = canvas.height - ((value - minValue) / valueRange) * canvas.height * 0.8 - canvas.height * 0.1
          ctx.fillText(`$${Math.round(value).toLocaleString()}`, canvas.width - 10, y + 4)
        }

        // Add date labels
        ctx.textAlign = "center"
        for (let i = 0; i < 7; i++) {
          const index = Math.floor((i * (portfolioData.length - 1)) / 6)
          const x = i * (canvas.width / 6)
          ctx.fillText(portfolioData[index].date.slice(5), x, canvas.height - 10)
        }
      }
    }
  }, [portfolioData])

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-2xl font-bold">$12,345.67</div>
          <div className="text-sm text-green-500">+$245.89 (2.5%)</div>
        </div>
        <Tabs defaultValue="1m">
          <TabsList>
            <TabsTrigger value="1w">1W</TabsTrigger>
            <TabsTrigger value="1m">1M</TabsTrigger>
            <TabsTrigger value="3m">3M</TabsTrigger>
            <TabsTrigger value="1y">1Y</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div ref={chartRef} className="w-full h-[300px]" />
    </div>
  )
}

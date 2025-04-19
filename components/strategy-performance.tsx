"use client"

import { useEffect, useRef } from "react"

export function StrategyPerformance() {
  const chartRef = useRef<HTMLDivElement>(null)

  // Mock strategy performance data
  const generateStrategyData = () => {
    const strategies = [
      { name: "Momentum Trader", color: "#22c55e" },
      { name: "Volatility Breakout", color: "#3b82f6" },
      { name: "Mean Reversion", color: "#f59e0b" },
    ]

    const data = []
    const days = 30

    for (const strategy of strategies) {
      let value = 100 // Start at 100%
      const values = []

      for (let i = 0; i < days; i++) {
        // Random daily change
        const change = (Math.random() - 0.45) * 2 // Slightly biased towards positive
        value *= 1 + change / 100
        values.push(value)
      }

      data.push({
        name: strategy.name,
        color: strategy.color,
        values: values,
      })
    }

    return data
  }

  const strategyData = generateStrategyData()

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

        // Find min and max values across all strategies
        const allValues = strategyData.flatMap((s) => s.values)
        const minValue = Math.min(...allValues)
        const maxValue = Math.max(...allValues)
        const valueRange = maxValue - minValue

        // Draw strategy lines
        strategyData.forEach((strategy) => {
          ctx.strokeStyle = strategy.color
          ctx.lineWidth = 2
          ctx.beginPath()

          strategy.values.forEach((value, index) => {
            const x = (index / (strategy.values.length - 1)) * canvas.width
            const y = canvas.height - ((value - minValue) / valueRange) * canvas.height * 0.8 - canvas.height * 0.1

            if (index === 0) {
              ctx.moveTo(x, y)
            } else {
              ctx.lineTo(x, y)
            }
          })

          ctx.stroke()
        })

        // Add value labels
        ctx.fillStyle = "#e2e8f0"
        ctx.font = "12px sans-serif"
        ctx.textAlign = "right"

        for (let i = 0; i < 5; i++) {
          const value = minValue + (valueRange * i) / 4
          const y = canvas.height - ((value - minValue) / valueRange) * canvas.height * 0.8 - canvas.height * 0.1
          ctx.fillText(`${Math.round(value)}%`, canvas.width - 10, y + 4)
        }

        // Add date labels
        ctx.textAlign = "center"
        const now = new Date()
        for (let i = 0; i < 7; i++) {
          const daysAgo = Math.floor((i * 29) / 6)
          const date = new Date(now)
          date.setDate(now.getDate() - (29 - daysAgo))

          const x = i * (canvas.width / 6)
          ctx.fillText(date.toLocaleDateString().slice(0, 5), x, canvas.height - 10)
        }

        // Add legend
        const legendY = 20
        let legendX = 10

        strategyData.forEach((strategy) => {
          // Draw line
          ctx.strokeStyle = strategy.color
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(legendX, legendY)
          ctx.lineTo(legendX + 20, legendY)
          ctx.stroke()

          // Draw label
          ctx.fillStyle = "#e2e8f0"
          ctx.textAlign = "left"
          ctx.fillText(strategy.name, legendX + 25, legendY + 4)

          legendX += ctx.measureText(strategy.name).width + 50
        })
      }
    }
  }, [strategyData])

  return <div ref={chartRef} className="w-full h-[300px]" />
}

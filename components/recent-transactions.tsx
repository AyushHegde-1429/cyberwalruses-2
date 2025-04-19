import { Badge } from "@/components/ui/badge"

export function RecentTransactions() {
  const transactions = [
    {
      id: "tx1",
      type: "buy",
      asset: "BTC",
      amount: 0.05,
      price: 31245.67,
      total: 1562.28,
      time: "10:32 AM",
      status: "completed",
    },
    {
      id: "tx2",
      type: "sell",
      asset: "SOL",
      amount: 12.5,
      price: 102.45,
      total: 1280.63,
      time: "09:15 AM",
      status: "completed",
    },
    {
      id: "tx3",
      type: "buy",
      asset: "ETH",
      amount: 0.75,
      price: 1845.32,
      total: 1384.0,
      time: "Yesterday",
      status: "completed",
    },
    {
      id: "tx4",
      type: "buy",
      asset: "ADA",
      amount: 500,
      price: 0.45,
      total: 225.0,
      time: "Yesterday",
      status: "completed",
    },
    {
      id: "tx5",
      type: "sell",
      asset: "DOT",
      amount: 25,
      price: 6.32,
      total: 158.0,
      time: "Apr 18",
      status: "completed",
    },
  ]

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-xs text-muted-foreground">
            <th className="pb-2">Type</th>
            <th className="pb-2">Asset</th>
            <th className="pb-2">Amount</th>
            <th className="pb-2">Price</th>
            <th className="pb-2">Total</th>
            <th className="pb-2">Time</th>
            <th className="pb-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id} className="border-t border-border">
              <td className="py-3">
                <Badge variant={tx.type === "buy" ? "default" : "destructive"} className="capitalize">
                  {tx.type}
                </Badge>
              </td>
              <td className="py-3 font-medium">{tx.asset}</td>
              <td className="py-3">{tx.amount}</td>
              <td className="py-3">${tx.price.toLocaleString()}</td>
              <td className="py-3 font-medium">${tx.total.toLocaleString()}</td>
              <td className="py-3 text-muted-foreground">{tx.time}</td>
              <td className="py-3">
                <Badge variant="outline" className="capitalize">
                  {tx.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";

const recent = [
  { date: "03/04/2026", description: "Raw Market", amount: -500, type: "expense" },
  { date: "02/04/2026", description: "Freelancing Payment", amount: 5000, type: "income" },
  { date: "02/04/2026", description: "Product Sales", amount: 12000, type: "income" },
  { date: "01/04/2026", description: "Office Supplies", amount: -1200, type: "expense" },
  { date: "01/04/2026", description: "Wholesale Order", amount: 28000, type: "income" },
];

export default function RecentTransactions() {
  return (
    <div data-testid="page-recent-transactions">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Recent Transactions</h2>
        <p className="text-sm text-white/40 mt-1">Latest financial activity</p>
      </div>

      <div className="max-w-2xl">
        <div className="glass-card overflow-hidden">
          <div className="p-5 border-b border-white/6">
            <p className="text-sm font-semibold text-white">Last 5 Transactions</p>
          </div>

          <div className="divide-y divide-white/5">
            {recent.map((t, i) => (
              <div key={i} className="flex items-center justify-between p-5 hover:bg-white/[0.02] transition" data-testid={`row-recent-${i}`}>
                <div className="flex items-center gap-4">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm ${t.type === "income" ? "bg-green-500/15 text-green-400" : "bg-red-500/15 text-red-400"}`}>
                    {t.type === "income" ? "+" : "-"}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{t.description}</p>
                    <p className="text-xs text-white/40">{t.date}</p>
                  </div>
                </div>
                <span className={`font-bold text-sm ${t.type === "income" ? "text-green-400" : "text-red-400"}`}>
                  {t.amount > 0 ? "+" : ""}৳{Math.abs(t.amount).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="p-5 border-t border-white/6">
            <Link href="/transactions/all">
              <span className="flex items-center gap-1.5 text-sky-400 text-sm font-medium hover:text-sky-300 transition cursor-pointer" data-testid="link-view-all">
                View All Transactions <ArrowUpRight size={14} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

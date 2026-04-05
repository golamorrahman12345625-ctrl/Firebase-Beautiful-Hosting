import { ArrowUpRight, TrendingUp, TrendingDown } from "lucide-react";
import { Link } from "wouter";
import { useApp } from "@/context/AppContext";

export default function RecentTransactions() {
  const { transactions } = useApp();
  const recent = transactions.slice(0, 8);

  const todayIncome = transactions.filter(t => t.type === "income").slice(0, 3).reduce((s, t) => s + t.amount, 0);
  const todayExpense = transactions.filter(t => t.type === "expense").slice(0, 3).reduce((s, t) => s + t.amount, 0);

  return (
    <div data-testid="page-recent-transactions">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Recent Transactions</h2>
        <p className="text-sm text-white/40 mt-1">Latest financial activity</p>
      </div>

      {/* Quick summary */}
      <div className="grid grid-cols-2 gap-4 mb-6 max-w-2xl">
        <div className="glass-card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-500/15 flex items-center justify-center">
            <TrendingUp size={16} className="text-green-400" />
          </div>
          <div>
            <p className="text-xs text-white/40">Recent Income</p>
            <p className="text-base font-bold text-green-400">৳{todayIncome.toLocaleString()}</p>
          </div>
        </div>
        <div className="glass-card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-500/15 flex items-center justify-center">
            <TrendingDown size={16} className="text-red-400" />
          </div>
          <div>
            <p className="text-xs text-white/40">Recent Expense</p>
            <p className="text-base font-bold text-red-400">৳{todayExpense.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl">
        <div className="glass-card overflow-hidden">
          <div className="p-5 border-b border-white/6 flex items-center justify-between">
            <p className="text-sm font-semibold text-white">Recent {recent.length} Transactions</p>
            <Link href="/transactions/add">
              <button className="text-xs text-sky-400 hover:text-sky-300 transition">+ Add New</button>
            </Link>
          </div>

          <div className="divide-y divide-white/5">
            {recent.map((t, i) => (
              <div key={t.id} className="flex items-center justify-between p-4 hover:bg-white/[0.02] transition" data-testid={`row-recent-${i}`}>
                <div className="flex items-center gap-4">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${t.type === "income" ? "bg-green-500/15 text-green-400" : "bg-red-500/15 text-red-400"}`}>
                    {t.type === "income" ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{t.description}</p>
                    <p className="text-xs text-white/40">{t.date}</p>
                  </div>
                </div>
                <span className={`font-bold text-sm ${t.type === "income" ? "text-green-400" : "text-red-400"}`}>
                  {t.type === "income" ? "+" : "-"}৳{t.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {recent.length === 0 && (
            <div className="py-12 text-center text-white/30 text-sm">No transactions yet</div>
          )}

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

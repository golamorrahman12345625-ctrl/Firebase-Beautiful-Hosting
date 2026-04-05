import { useState } from "react";
import { Search, Filter, TrendingUp, TrendingDown } from "lucide-react";

const transactions = [
  { id: 1, date: "03/04/2026", description: "Monthly Salary", amount: 50000, type: "income" },
  { id: 2, date: "03/04/2026", description: "Internet Bill", amount: 1000, type: "expense" },
  { id: 3, date: "02/04/2026", description: "Freelancing Payment", amount: 5000, type: "income" },
  { id: 4, date: "02/04/2026", description: "Raw Materials", amount: 12000, type: "expense" },
  { id: 5, date: "01/04/2026", description: "Product Sales", amount: 28000, type: "income" },
  { id: 6, date: "01/04/2026", description: "Office Rent", amount: 8000, type: "expense" },
  { id: 7, date: "31/03/2026", description: "Wholesale Order", amount: 45000, type: "income" },
  { id: 8, date: "30/03/2026", description: "Electricity Bill", amount: 2500, type: "expense" },
];

export default function AllTransactions() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = transactions.filter(t => {
    const matchSearch = t.description.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || t.type === filter;
    return matchSearch && matchFilter;
  });

  const totalIncome = transactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div data-testid="page-all-transactions">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">All Transactions</h2>
        <p className="text-sm text-white/40 mt-1">Complete transaction history</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="glass-card p-4 text-center">
          <p className="text-xs text-white/40 mb-1">Total Income</p>
          <p className="text-lg font-bold text-green-400">৳{totalIncome.toLocaleString()}</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-xs text-white/40 mb-1">Total Expense</p>
          <p className="text-lg font-bold text-red-400">৳{totalExpense.toLocaleString()}</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-xs text-white/40 mb-1">Balance</p>
          <p className={`text-lg font-bold ${balance >= 0 ? "text-sky-400" : "text-red-400"}`}>৳{balance.toLocaleString()}</p>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-5 pb-4 border-b border-white/6">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search transactions..."
              className="form-input w-full pl-8 pr-3 py-2 rounded-lg text-sm text-white placeholder-white/25"
              data-testid="input-search"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={13} className="text-white/40" />
            {["all","income","expense"].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${filter === f ? "bg-sky-500 text-white" : "text-white/50 hover:text-white hover:bg-white/10"}`}
                data-testid={`filter-${f}`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="data-table w-full">
            <thead>
              <tr>
                <th className="text-left">#</th>
                <th className="text-left">Date</th>
                <th className="text-left">Description</th>
                <th className="text-right">Amount</th>
                <th className="text-center">Type</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t.id} data-testid={`row-transaction-${t.id}`}>
                  <td className="text-white/30 text-xs">{t.id}</td>
                  <td className="text-white/60 text-xs">{t.date}</td>
                  <td className="text-white/80">{t.description}</td>
                  <td className="text-right font-semibold">
                    <span className={t.type === "income" ? "text-green-400" : "text-red-400"}>
                      {t.type === "income" ? "+" : "-"}৳{t.amount.toLocaleString()}
                    </span>
                  </td>
                  <td className="text-center">
                    <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center justify-center gap-1 w-fit mx-auto ${t.type === "income" ? "badge-income" : "badge-expense"}`}>
                      {t.type === "income" ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                      {t.type === "income" ? "Income" : "Expense"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-white/30 text-sm">No transactions found</div>
          )}
        </div>
      </div>
    </div>
  );
}

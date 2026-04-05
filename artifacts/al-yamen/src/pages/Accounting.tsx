import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

const ledgerData = [
  { day: "Mon", income: 12000, expense: 5000 },
  { day: "Tue", income: 18000, expense: 8000 },
  { day: "Wed", income: 9000, expense: 6000 },
  { day: "Thu", income: 22000, expense: 10000 },
  { day: "Fri", income: 15000, expense: 7000 },
  { day: "Sat", income: 28000, expense: 12000 },
  { day: "Sun", income: 5000, expense: 3000 },
];

const expenses = [
  { category: "Office Rent", amount: 8000, pct: 32 },
  { category: "Employee Salaries", amount: 12500, pct: 50 },
  { category: "Utilities", amount: 2500, pct: 10 },
  { category: "Miscellaneous", amount: 2000, pct: 8 },
];

export default function Accounting() {
  const totalIncome = ledgerData.reduce((s, d) => s + d.income, 0);
  const totalExpense = ledgerData.reduce((s, d) => s + d.expense, 0);
  const profit = totalIncome - totalExpense;

  return (
    <div data-testid="page-accounting">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Accounting</h2>
        <p className="text-sm text-white/40 mt-1">Daily ledger and expense reports</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="glass-card p-4 flex items-center gap-4">
          <div className="p-2.5 bg-green-500/15 rounded-xl"><TrendingUp size={18} className="text-green-400" /></div>
          <div>
            <p className="text-xl font-bold text-green-400">৳{totalIncome.toLocaleString()}</p>
            <p className="text-xs text-white/40">Weekly Income</p>
          </div>
        </div>
        <div className="glass-card p-4 flex items-center gap-4">
          <div className="p-2.5 bg-red-500/15 rounded-xl"><TrendingDown size={18} className="text-red-400" /></div>
          <div>
            <p className="text-xl font-bold text-red-400">৳{totalExpense.toLocaleString()}</p>
            <p className="text-xs text-white/40">Weekly Expense</p>
          </div>
        </div>
        <div className="glass-card p-4 flex items-center gap-4">
          <div className="p-2.5 bg-sky-500/15 rounded-xl"><DollarSign size={18} className="text-sky-400" /></div>
          <div>
            <p className="text-xl font-bold text-sky-400">৳{profit.toLocaleString()}</p>
            <p className="text-xs text-white/40">Net Profit</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 glass-card p-5">
          <h3 className="font-semibold text-white text-sm mb-5">Daily Ledger (This Week)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={ledgerData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "rgba(255,255,255,0.4)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "rgba(255,255,255,0.4)" }} axisLine={false} tickLine={false} tickFormatter={v => `${v/1000}k`} />
              <Tooltip contentStyle={{ background: "rgba(10,18,32,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "white", fontSize: 12 }} />
              <Bar dataKey="income" fill="#22c55e" radius={[4, 4, 0, 0]} opacity={0.8} />
              <Bar dataKey="expense" fill="#ef4444" radius={[4, 4, 0, 0]} opacity={0.7} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-5">
          <h3 className="font-semibold text-white text-sm mb-5">Expense Breakdown</h3>
          <div className="space-y-4">
            {expenses.map(exp => (
              <div key={exp.category} data-testid={`expense-${exp.category}`}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-white/70">{exp.category}</span>
                  <span className="text-white font-medium">৳{exp.amount.toLocaleString()}</span>
                </div>
                <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-sky-500 to-violet-500 rounded-full transition-all duration-500" style={{ width: `${exp.pct}%` }} />
                </div>
                <p className="text-[10px] text-white/30 mt-0.5">{exp.pct}% of total</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

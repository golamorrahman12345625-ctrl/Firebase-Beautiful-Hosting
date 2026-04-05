import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, Legend
} from "recharts";
import { TrendingUp, TrendingDown, DollarSign, ArrowUpRight, Download } from "lucide-react";
import { useApp } from "@/context/AppContext";

const monthlyPL = [
  { month: "Oct", income: 42000, expense: 28000, profit: 14000 },
  { month: "Nov", income: 55000, expense: 32000, profit: 23000 },
  { month: "Dec", income: 68000, expense: 38000, profit: 30000 },
  { month: "Jan", income: 48000, expense: 30000, profit: 18000 },
  { month: "Feb", income: 71000, expense: 38000, profit: 33000 },
  { month: "Mar", income: 63000, expense: 35000, profit: 28000 },
  { month: "Apr", income: 82000, expense: 42000, profit: 40000 },
];

const weeklyLedger = [
  { day: "Sun", income: 5000, expense: 3000 },
  { day: "Mon", income: 12000, expense: 5000 },
  { day: "Tue", income: 18000, expense: 8000 },
  { day: "Wed", income: 9000, expense: 6000 },
  { day: "Thu", income: 22000, expense: 10000 },
  { day: "Fri", income: 15000, expense: 7000 },
  { day: "Sat", income: 28000, expense: 12000 },
];

const expenseCategories = [
  { category: "Employee Salaries", amount: 190000, pct: 52, color: "#8b5cf6" },
  { category: "Office Rent", amount: 48000, pct: 13, color: "#0ea5e9" },
  { category: "Raw Materials", amount: 72000, pct: 20, color: "#f59e0b" },
  { category: "Utilities", amount: 18000, pct: 5, color: "#22c55e" },
  { category: "Marketing", amount: 24000, pct: 7, color: "#ec4899" },
  { category: "Miscellaneous", amount: 12000, pct: 3, color: "#6b7280" },
];

type Tab = "overview" | "weekly" | "profit-loss";

export default function Accounting() {
  const { transactions } = useApp();
  const [tab, setTab] = useState<Tab>("overview");

  const totalIncome = transactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const profit = totalIncome - totalExpense;
  const profitMargin = totalIncome > 0 ? ((profit / totalIncome) * 100).toFixed(1) : "0.0";

  const weeklyIncome = weeklyLedger.reduce((s, d) => s + d.income, 0);
  const weeklyExpense = weeklyLedger.reduce((s, d) => s + d.expense, 0);

  return (
    <div data-testid="page-accounting">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Accounting</h2>
          <p className="text-sm text-white/40 mt-1">Financial reports and ledger</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-white/50 hover:text-white hover:bg-white/5 text-sm transition">
          <Download size={14} /> Export Report
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="glass-card p-4 flex items-center gap-4">
          <div className="p-2.5 bg-green-500/15 rounded-xl"><TrendingUp size={18} className="text-green-400" /></div>
          <div>
            <p className="text-xs text-white/40">Total Income</p>
            <p className="text-lg font-bold text-green-400">৳{totalIncome.toLocaleString()}</p>
          </div>
        </div>
        <div className="glass-card p-4 flex items-center gap-4">
          <div className="p-2.5 bg-red-500/15 rounded-xl"><TrendingDown size={18} className="text-red-400" /></div>
          <div>
            <p className="text-xs text-white/40">Total Expense</p>
            <p className="text-lg font-bold text-red-400">৳{totalExpense.toLocaleString()}</p>
          </div>
        </div>
        <div className="glass-card p-4 flex items-center gap-4">
          <div className="p-2.5 bg-sky-500/15 rounded-xl"><DollarSign size={18} className="text-sky-400" /></div>
          <div>
            <p className="text-xs text-white/40">Net Profit</p>
            <p className={`text-lg font-bold ${profit >= 0 ? "text-sky-400" : "text-red-400"}`}>৳{profit.toLocaleString()}</p>
          </div>
        </div>
        <div className="glass-card p-4 flex items-center gap-4">
          <div className="p-2.5 bg-violet-500/15 rounded-xl"><ArrowUpRight size={18} className="text-violet-400" /></div>
          <div>
            <p className="text-xs text-white/40">Profit Margin</p>
            <p className="text-lg font-bold text-violet-400">{profitMargin}%</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 border-b border-white/6 pb-3">
        {([
          { key: "overview", label: "Expense Overview" },
          { key: "weekly", label: "Weekly Ledger" },
          { key: "profit-loss", label: "P&L Chart" },
        ] as { key: Tab; label: string }[]).map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition ${tab === t.key ? "bg-sky-500 text-white" : "text-white/50 hover:text-white hover:bg-white/5"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 glass-card p-5">
            <h3 className="font-semibold text-white text-sm mb-5">Expense Breakdown by Category</h3>
            <div className="space-y-4">
              {expenseCategories.map(exp => (
                <div key={exp.category} data-testid={`expense-${exp.category}`}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-white/70 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ background: exp.color }} />
                      {exp.category}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-white/40">{exp.pct}%</span>
                      <span className="text-white font-medium">৳{exp.amount.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${exp.pct}%`, background: exp.color, opacity: 0.85 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-5">
            <h3 className="font-semibold text-white text-sm mb-4">Quick Balance Sheet</h3>
            <div className="space-y-3">
              {[
                { label: "Cash & Bank", value: "৳1,24,500", positive: true },
                { label: "Accounts Receivable", value: "৳38,200", positive: true },
                { label: "Inventory Value", value: "৳2,15,800", positive: true },
                { label: "Accounts Payable", value: "-৳42,000", positive: false },
                { label: "Outstanding Loans", value: "-৳75,000", positive: false },
              ].map(row => (
                <div key={row.label} className="flex justify-between py-2 border-b border-white/5 last:border-0">
                  <span className="text-xs text-white/50">{row.label}</span>
                  <span className={`text-sm font-medium ${row.positive ? "text-green-400" : "text-red-400"}`}>{row.value}</span>
                </div>
              ))}
              <div className="flex justify-between pt-2">
                <span className="text-sm font-bold text-white">Net Worth</span>
                <span className="text-sm font-bold text-sky-400">৳2,61,500</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "weekly" && (
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-white text-sm">Daily Ledger (This Week)</h3>
              <p className="text-xs text-white/40">Income ৳{weeklyIncome.toLocaleString()} · Expense ৳{weeklyExpense.toLocaleString()} · Net ৳{(weeklyIncome - weeklyExpense).toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-white/50">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-green-400" /> Income</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-400" /> Expense</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={weeklyLedger} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "rgba(255,255,255,0.4)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "rgba(255,255,255,0.4)" }} axisLine={false} tickLine={false} tickFormatter={v => `${v/1000}k`} />
              <Tooltip contentStyle={{ background: "rgba(10,18,32,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "white", fontSize: 12 }} formatter={(v: number) => [`৳${v.toLocaleString()}`, ""]} />
              <Bar dataKey="income" fill="#22c55e" radius={[4, 4, 0, 0]} opacity={0.85} />
              <Bar dataKey="expense" fill="#ef4444" radius={[4, 4, 0, 0]} opacity={0.75} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {tab === "profit-loss" && (
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-white text-sm">Monthly Profit & Loss</h3>
              <p className="text-xs text-white/40">Oct 2025 – Apr 2026</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthlyPL} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "rgba(255,255,255,0.4)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "rgba(255,255,255,0.4)" }} axisLine={false} tickLine={false} tickFormatter={v => `${v/1000}k`} />
              <Tooltip contentStyle={{ background: "rgba(10,18,32,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "white", fontSize: 12 }} formatter={(v: number) => [`৳${v.toLocaleString()}`, ""]} />
              <Legend wrapperStyle={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }} />
              <Line type="monotone" dataKey="income" stroke="#22c55e" strokeWidth={2} dot={{ fill: "#22c55e", r: 3 }} />
              <Line type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={2} dot={{ fill: "#ef4444", r: 3 }} />
              <Line type="monotone" dataKey="profit" stroke="#0ea5e9" strokeWidth={2.5} dot={{ fill: "#0ea5e9", r: 4 }} strokeDasharray="5 2" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import {
  TrendingUp, TrendingDown, ShoppingBag, Users, Package, DollarSign,
  ArrowUpRight, Bell, Activity
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import { useApp } from "@/context/AppContext";
import { Link } from "wouter";

const salesData = [
  { month: "Oct", sales: 42000, expense: 28000 },
  { month: "Nov", sales: 55000, expense: 32000 },
  { month: "Dec", sales: 68000, expense: 38000 },
  { month: "Jan", sales: 48000, expense: 30000 },
  { month: "Feb", sales: 71000, expense: 38000 },
  { month: "Mar", sales: 63000, expense: 35000 },
  { month: "Apr", sales: 82000, expense: 42000 },
];

const categoryData = [
  { name: "Clothing", value: 38, color: "#0ea5e9" },
  { name: "Jewelry", value: 24, color: "#8b5cf6" },
  { name: "Cosmetics", value: 22, color: "#22c55e" },
  { name: "Accessories", value: 16, color: "#f59e0b" },
];

const actions = [
  { title: "New Stock Update", desc: "Eid collection added to inventory. Check inventory.", date: "05 April, 2026", color: "sky" },
  { title: "Weekly Meeting", desc: "Zoom meeting with sales team tomorrow at 10 AM.", date: "04 April, 2026", color: "violet" },
  { title: "Payment Due", desc: "Supplier payment of ৳15,000 due by end of week.", date: "03 April, 2026", color: "amber" },
];

function StatCard({ icon, label, value, change, positive, color }: {
  icon: React.ReactNode; label: string; value: string; change: string; positive: boolean; color: string;
}) {
  return (
    <div className="stat-card" data-testid={`stat-card-${label.toLowerCase().replace(/\s/g, "-")}`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2.5 rounded-xl bg-${color}-500/15`}>
          {icon}
        </div>
        <span className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${positive ? "text-green-400 bg-green-500/10" : "text-red-400 bg-red-500/10"}`}>
          {positive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          {change}
        </span>
      </div>
      <div>
        <p className="text-2xl font-bold text-white mb-1">{value}</p>
        <p className="text-xs text-white/50 font-medium">{label}</p>
      </div>
    </div>
  );
}

function Clock() {
  const [time, setTime] = useState(new Date());
  const secRef = useRef<HTMLDivElement>(null);
  const minRef = useRef<HTMLDivElement>(null);
  const hourRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const s = time.getSeconds();
    const m = time.getMinutes();
    const h = time.getHours() % 12;
    if (secRef.current) secRef.current.style.transform = `translateX(-50%) rotate(${s * 6}deg)`;
    if (minRef.current) minRef.current.style.transform = `translateX(-50%) rotate(${m * 6}deg)`;
    if (hourRef.current) hourRef.current.style.transform = `translateX(-50%) rotate(${(h * 30) + (m * 0.5)}deg)`;
  }, [time]);

  return (
    <div className="glass-card p-4 text-center flex flex-col items-center gap-3">
      <p className="text-[10px] text-sky-400/70 font-bold uppercase tracking-widest">Live Clock</p>
      <div className="w-20 h-20 rounded-full border-2 border-white/15 relative" style={{ background: "rgba(0,0,0,0.3)" }}>
        <div ref={hourRef} className="absolute bottom-1/2 left-1/2 bg-white rounded-full" style={{ width: 3, height: 20, transformOrigin: "bottom", transform: "translateX(-50%)" }} />
        <div ref={minRef} className="absolute bottom-1/2 left-1/2 rounded-full" style={{ width: 2, height: 28, transformOrigin: "bottom", transform: "translateX(-50%)", background: "#e2e8f0" }} />
        <div ref={secRef} className="absolute bottom-1/2 left-1/2 bg-sky-400 rounded-full" style={{ width: 1.5, height: 33, transformOrigin: "bottom", transform: "translateX(-50%)" }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-sky-400" />
        </div>
      </div>
      <div className="text-center">
        <p className="text-lg font-bold text-white tabular-nums">
          {time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
        </p>
        <p className="text-[10px] text-white/40">{time.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" })}</p>
      </div>
    </div>
  );
}

function Calendar() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const monthName = now.toLocaleString("en-US", { month: "long", year: "numeric" }).toUpperCase();

  return (
    <div className="glass-card p-4">
      <p className="text-[10px] text-sky-400/70 font-bold uppercase tracking-widest mb-3">{monthName}</p>
      <div className="grid grid-cols-7 gap-0.5 text-center text-[10px] text-white/40 mb-1.5">
        {["S","M","T","W","T","F","S"].map((d, i) => <span key={i}>{d}</span>)}
      </div>
      <div className="grid grid-cols-7 gap-0.5 text-center text-[11px]">
        {days.map((d, i) => (
          <span key={i} className={`py-0.5 rounded-full ${d === today ? "bg-sky-500 text-white font-bold" : d ? "text-white/70 hover:bg-white/10 cursor-pointer" : ""}`}>{d || ""}</span>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { transactions, orders, stockItems } = useApp();

  const totalRevenue = transactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const totalStock = stockItems.reduce((s, i) => s + i.qty, 0);
  const uniqueCustomers = new Set(orders.map(o => o.customer)).size;
  const recentOrders = orders.slice(0, 5);
  const pendingCount = orders.filter(o => o.status === "pending").length;

  const statusClass = {
    delivered: "badge-delivered",
    pending: "badge-pending",
    cancelled: "badge-cancelled",
  };

  return (
    <div className="space-y-6" data-testid="page-dashboard">
      {/* Welcome */}
      <div className="flex flex-col lg:flex-row justify-between gap-6">
        <div>
          <h1 className="text-2xl font-light text-white">
            Welcome back, <span className="font-bold text-sky-400">Prince</span>
          </h1>
          <p className="text-sm text-white/40 mt-1">Management Information System Dashboard</p>
          {pendingCount > 0 && (
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-medium">
              <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
              {pendingCount} order{pendingCount > 1 ? "s" : ""} pending action
            </div>
          )}
        </div>
        <div className="flex gap-4">
          <Clock />
          <Calendar />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<DollarSign size={18} className="text-sky-400" />} label="Total Revenue" value={`৳${(totalRevenue).toLocaleString()}`} change="+12.5%" positive={true} color="sky" />
        <StatCard icon={<ShoppingBag size={18} className="text-violet-400" />} label="Total Orders" value={orders.length.toLocaleString()} change="+8.2%" positive={true} color="violet" />
        <StatCard icon={<Users size={18} className="text-emerald-400" />} label="Customers" value={uniqueCustomers.toString()} change="+15.3%" positive={true} color="emerald" />
        <StatCard icon={<Package size={18} className="text-amber-400" />} label="Stock Units" value={totalStock.toLocaleString()} change="-3.1%" positive={false} color="amber" />
      </div>

      {/* Quick income/expense summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card p-4 flex items-center gap-4">
          <div className="p-2.5 bg-green-500/15 rounded-xl"><TrendingUp size={16} className="text-green-400" /></div>
          <div>
            <p className="text-xs text-white/40">Total Income</p>
            <p className="text-lg font-bold text-green-400">৳{totalRevenue.toLocaleString()}</p>
          </div>
          <Link href="/transactions/add" className="ml-auto">
            <button className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 transition">Add <ArrowUpRight size={12} /></button>
          </Link>
        </div>
        <div className="glass-card p-4 flex items-center gap-4">
          <div className="p-2.5 bg-red-500/15 rounded-xl"><TrendingDown size={16} className="text-red-400" /></div>
          <div>
            <p className="text-xs text-white/40">Total Expense</p>
            <p className="text-lg font-bold text-red-400">৳{totalExpenses.toLocaleString()}</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-xs text-white/30">Net</p>
            <p className={`text-sm font-bold ${totalRevenue - totalExpenses >= 0 ? "text-sky-400" : "text-red-400"}`}>
              ৳{(totalRevenue - totalExpenses).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 glass-card p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-white text-sm">Sales & Expense Overview</h3>
              <p className="text-xs text-white/40 mt-0.5">Monthly performance 2025–2026</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-white/50">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-sky-400" /> Sales</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-violet-400" /> Expense</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={salesData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="sales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expense" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "rgba(255,255,255,0.4)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "rgba(255,255,255,0.4)" }} axisLine={false} tickLine={false} tickFormatter={v => `${v/1000}k`} />
              <Tooltip contentStyle={{ background: "rgba(10,18,32,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "white", fontSize: 12 }} formatter={(v: number) => [`৳${v.toLocaleString()}`, ""]} />
              <Area type="monotone" dataKey="sales" stroke="#0ea5e9" strokeWidth={2} fill="url(#sales)" />
              <Area type="monotone" dataKey="expense" stroke="#8b5cf6" strokeWidth={2} fill="url(#expense)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-5">
          <h3 className="font-semibold text-white text-sm mb-1">Category Split</h3>
          <p className="text-xs text-white/40 mb-4">By product category</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                {categoryData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "rgba(10,18,32,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "white", fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {categoryData.map(cat => (
              <div key={cat.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: cat.color }} />
                  <span className="text-white/60">{cat.name}</span>
                </span>
                <span className="text-white font-medium">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders + Company Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 glass-card overflow-hidden">
          <div className="flex items-center justify-between p-5 pb-3">
            <div>
              <h3 className="font-semibold text-white text-sm">Recent Orders</h3>
              <p className="text-xs text-white/40">Latest {recentOrders.length} orders</p>
            </div>
            <Link href="/sales/order-history">
              <button className="flex items-center gap-1 text-xs text-sky-400 hover:text-sky-300 transition">
                View All <ArrowUpRight size={12} />
              </button>
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table w-full">
              <thead>
                <tr>
                  <th className="text-left">Order ID</th>
                  <th className="text-left">Customer</th>
                  <th className="text-left hidden md:table-cell">Product</th>
                  <th className="text-right">Amount</th>
                  <th className="text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order.id} data-testid={`row-order-${order.id}`}>
                    <td className="text-sky-400 font-mono text-xs">{order.id}</td>
                    <td className="text-white/80">{order.customer}</td>
                    <td className="text-white/60 text-xs hidden md:table-cell">{order.product}</td>
                    <td className="text-right text-white font-medium">৳{order.total.toLocaleString()}</td>
                    <td className="text-center">
                      <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${statusClass[order.status]}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white text-sm">Company Notices</h3>
            <Bell size={14} className="text-sky-400" />
          </div>
          <div className="space-y-3">
            {actions.map((action, i) => (
              <div key={i} className={`p-3 rounded-xl border-l-4 ${
                action.color === "sky" ? "border-l-sky-500 bg-sky-500/5" :
                action.color === "violet" ? "border-l-violet-500 bg-violet-500/5" :
                "border-l-amber-500 bg-amber-500/5"
              }`} data-testid={`action-item-${i}`}>
                <h4 className="font-semibold text-white text-xs mb-1">{action.title}</h4>
                <p className="text-[11px] text-white/50 mb-1.5">{action.desc}</p>
                <span className="text-[10px] text-white/30">{action.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

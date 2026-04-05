import { useState } from "react";
import { Search, X, Phone, MapPin, ShoppingBag, TrendingUp } from "lucide-react";
import { useApp, Order } from "@/context/AppContext";

interface CustomerSummary {
  id: number;
  name: string;
  phone: string;
  address: string;
  orders: Order[];
  totalSpend: number;
  lastOrder: string;
}

export default function CustomerList() {
  const { orders } = useApp();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<CustomerSummary | null>(null);

  // Build customer list from real orders data
  const customerMap = new Map<string, CustomerSummary>();
  orders.forEach(o => {
    if (!customerMap.has(o.customer)) {
      customerMap.set(o.customer, {
        id: customerMap.size + 1,
        name: o.customer,
        phone: o.phone,
        address: o.address,
        orders: [],
        totalSpend: 0,
        lastOrder: o.date,
      });
    }
    const c = customerMap.get(o.customer)!;
    c.orders.push(o);
    c.totalSpend += o.total;
    // keep most recent date
    if (o.date > c.lastOrder) c.lastOrder = o.date;
  });

  const customers = Array.from(customerMap.values());

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search) ||
    c.address.toLowerCase().includes(search.toLowerCase())
  );

  const statusClass = {
    delivered: "badge-delivered",
    pending: "badge-pending",
    cancelled: "badge-cancelled",
  };

  const totalRevenue = customers.reduce((s, c) => s + c.totalSpend, 0);
  const topCustomer = customers.sort((a, b) => b.totalSpend - a.totalSpend)[0];

  return (
    <div data-testid="page-customer-list">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Customer List</h2>
          <p className="text-sm text-white/40 mt-1">All registered customers from orders</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="glass-card p-4 flex items-center gap-3">
          <div className="p-2.5 bg-sky-500/15 rounded-xl"><ShoppingBag size={16} className="text-sky-400" /></div>
          <div>
            <p className="text-xl font-bold text-white">{customers.length}</p>
            <p className="text-xs text-white/40">Total Customers</p>
          </div>
        </div>
        <div className="glass-card p-4 flex items-center gap-3">
          <div className="p-2.5 bg-green-500/15 rounded-xl"><TrendingUp size={16} className="text-green-400" /></div>
          <div>
            <p className="text-lg font-bold text-green-400">৳{totalRevenue.toLocaleString()}</p>
            <p className="text-xs text-white/40">Total Revenue</p>
          </div>
        </div>
        <div className="glass-card p-4 flex items-center gap-3">
          <div className="p-2.5 bg-violet-500/15 rounded-xl">
            <span className="text-violet-400 text-lg font-bold leading-none">#1</span>
          </div>
          <div>
            <p className="text-sm font-bold text-white truncate">{topCustomer?.name || "—"}</p>
            <p className="text-xs text-white/40">Top Customer</p>
          </div>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="flex items-center gap-3 p-5 pb-4 border-b border-white/6">
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search customers..." className="form-input w-full pl-8 pr-3 py-2 rounded-lg text-sm text-white placeholder-white/25" data-testid="input-search" />
          </div>
          <span className="text-xs text-white/40">{filtered.length} customer{filtered.length !== 1 ? "s" : ""}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="data-table w-full">
            <thead>
              <tr>
                <th className="text-left">Sl.</th>
                <th className="text-left">Name</th>
                <th className="text-left hidden md:table-cell">Phone</th>
                <th className="text-left hidden lg:table-cell">Location</th>
                <th className="text-center">Orders</th>
                <th className="text-right">Total Spent</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <tr key={c.name} className="cursor-pointer" onClick={() => setSelected(c)} data-testid={`row-customer-${i + 1}`}>
                  <td className="text-white/40 text-xs">{i + 1}</td>
                  <td>
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-sky-500 to-violet-500 flex items-center justify-center text-xs font-bold text-white shrink-0">
                        {c.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm text-white font-medium">{c.name}</p>
                        <p className="text-[10px] text-white/40">Last: {c.lastOrder}</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-white/60 text-xs font-mono hidden md:table-cell">{c.phone}</td>
                  <td className="text-white/60 text-xs hidden lg:table-cell">{c.address}</td>
                  <td className="text-center">
                    <span className="bg-sky-500/15 text-sky-400 text-xs px-2.5 py-1 rounded-full border border-sky-500/20">
                      {c.orders.length}
                    </span>
                  </td>
                  <td className="text-right font-semibold text-white">৳{c.totalSpend.toLocaleString()}</td>
                  <td className="text-center">
                    <button className="text-xs text-sky-400 hover:text-sky-300 px-2 py-1 hover:bg-sky-500/10 rounded transition" data-testid={`button-view-${i + 1}`}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-white/30 text-sm">No customers found</div>
          )}
        </div>
      </div>

      {/* Customer Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }} onClick={() => setSelected(null)}>
          <div className="glass-panel p-6 w-full max-w-md rounded-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-500 to-violet-500 flex items-center justify-center text-xl font-bold text-white">
                  {selected.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{selected.name}</h3>
                  <p className="text-xs text-white/40">Regular Customer</p>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="text-white/30 hover:text-white transition"><X size={16} /></button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="rounded-xl bg-sky-500/8 border border-sky-500/15 p-3 text-center">
                <p className="text-xl font-bold text-sky-400">{selected.orders.length}</p>
                <p className="text-xs text-white/40">Orders</p>
              </div>
              <div className="rounded-xl bg-green-500/8 border border-green-500/15 p-3 text-center">
                <p className="text-lg font-bold text-green-400">৳{selected.totalSpend.toLocaleString()}</p>
                <p className="text-xs text-white/40">Total Spent</p>
              </div>
            </div>

            <div className="space-y-2 mb-5">
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Phone size={13} className="text-sky-400" />{selected.phone}
              </div>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <MapPin size={13} className="text-sky-400" />{selected.address}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Order History</p>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {selected.orders.map(o => (
                  <div key={o.id} className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                    <div>
                      <p className="text-xs text-sky-400 font-mono">{o.id}</p>
                      <p className="text-xs text-white/50">{o.product} · {o.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-white">৳{o.total.toLocaleString()}</p>
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${statusClass[o.status]}`}>
                        {o.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => setSelected(null)} className="w-full mt-5 py-2.5 rounded-xl border border-white/10 text-white/60 hover:text-white hover:bg-white/5 text-sm transition">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import { Search } from "lucide-react";

const orders = [
  { id: "#ORD-1001", date: "04/04/2026", customer: "Abdul Rahim", product: "T-Shirt (2 pcs)", total: "৳1,000", status: "delivered" },
  { id: "#ORD-1002", date: "03/04/2026", customer: "Karim Mia", product: "Smartwatch (1 pc)", total: "৳2,500", status: "pending" },
  { id: "#ORD-1003", date: "01/04/2026", customer: "Shafiqul Islam", product: "Headphone (1 pc)", total: "৳800", status: "cancelled" },
  { id: "#ORD-1004", date: "01/04/2026", customer: "Nasrin Begum", product: "Saree (2 pcs)", total: "৳3,200", status: "delivered" },
  { id: "#ORD-1005", date: "31/03/2026", customer: "Rahim Ali", product: "Three-Piece (1 pc)", total: "৳1,800", status: "pending" },
];

export default function OrderHistory() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = orders.filter(o => {
    const matchSearch = o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.includes(search);
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const statusClass = {
    delivered: "badge-delivered",
    pending: "badge-pending",
    cancelled: "badge-cancelled",
  };

  return (
    <div data-testid="page-order-history">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Order History</h2>
        <p className="text-sm text-white/40 mt-1">All customer orders</p>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-5 pb-4 border-b border-white/6">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by order ID or customer..." className="form-input w-full pl-8 pr-3 py-2 rounded-lg text-sm text-white placeholder-white/25" data-testid="input-search" />
          </div>
          <div className="flex gap-2">
            {["all","delivered","pending","cancelled"].map(s => (
              <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition capitalize ${statusFilter === s ? "bg-sky-500 text-white" : "text-white/50 hover:text-white hover:bg-white/10"}`} data-testid={`filter-${s}`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="data-table w-full">
            <thead>
              <tr>
                <th className="text-left">Order ID</th>
                <th className="text-left">Date</th>
                <th className="text-left">Customer</th>
                <th className="text-left hidden lg:table-cell">Product</th>
                <th className="text-right">Total</th>
                <th className="text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(o => (
                <tr key={o.id} data-testid={`row-order-${o.id}`}>
                  <td className="text-sky-400 font-mono text-xs">{o.id}</td>
                  <td className="text-white/60 text-xs">{o.date}</td>
                  <td className="text-white/80">{o.customer}</td>
                  <td className="text-white/60 text-xs hidden lg:table-cell">{o.product}</td>
                  <td className="text-right font-semibold text-white">{o.total}</td>
                  <td className="text-center">
                    <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${statusClass[o.status as keyof typeof statusClass]}`}>
                      {o.status.charAt(0).toUpperCase() + o.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="py-12 text-center text-white/30 text-sm">No orders found</div>}
        </div>
      </div>
    </div>
  );
}

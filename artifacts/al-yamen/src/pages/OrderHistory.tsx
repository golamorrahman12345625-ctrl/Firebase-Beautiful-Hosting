import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { useApp, Order } from "@/context/AppContext";

const statusClass = {
  delivered: "badge-delivered",
  pending: "badge-pending",
  cancelled: "badge-cancelled",
};

export default function OrderHistory() {
  const { orders, updateOrderStatus } = useApp();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filtered = orders.filter(o => {
    const matchSearch = o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.includes(search);
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const stats = {
    total: orders.length,
    delivered: orders.filter(o => o.status === "delivered").length,
    pending: orders.filter(o => o.status === "pending").length,
    cancelled: orders.filter(o => o.status === "cancelled").length,
  };

  return (
    <div data-testid="page-order-history">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Order History</h2>
        <p className="text-sm text-white/40 mt-1">All customer orders ({orders.length} total)</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total", val: stats.total, color: "text-white" },
          { label: "Delivered", val: stats.delivered, color: "text-green-400" },
          { label: "Pending", val: stats.pending, color: "text-yellow-400" },
          { label: "Cancelled", val: stats.cancelled, color: "text-red-400" },
        ].map(s => (
          <div key={s.label} className="glass-card p-3 text-center">
            <p className="text-xs text-white/40 mb-1">{s.label}</p>
            <p className={`text-xl font-bold ${s.color}`}>{s.val}</p>
          </div>
        ))}
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
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(o => (
                <tr key={o.id} data-testid={`row-order-${o.id}`} className="cursor-pointer" onClick={() => setSelectedOrder(o)}>
                  <td className="text-sky-400 font-mono text-xs">{o.id}</td>
                  <td className="text-white/60 text-xs">{o.date}</td>
                  <td className="text-white/80">{o.customer}</td>
                  <td className="text-white/60 text-xs hidden lg:table-cell">{o.product}</td>
                  <td className="text-right font-semibold text-white">৳{o.total.toLocaleString()}</td>
                  <td className="text-center" onClick={e => e.stopPropagation()}>
                    <select
                      value={o.status}
                      onChange={e => updateOrderStatus(o.id, e.target.value as Order["status"])}
                      className={`text-[11px] font-medium px-2 py-1 rounded-full border-0 outline-none cursor-pointer ${statusClass[o.status]}`}
                      style={{ background: "transparent" }}
                      data-testid={`select-status-${o.id}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="text-center">
                    <button onClick={e => { e.stopPropagation(); setSelectedOrder(o); }} className="text-[11px] text-sky-400 hover:text-sky-300 px-2 py-1 rounded transition">
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="py-12 text-center text-white/30 text-sm">No orders found</div>}
        </div>
      </div>

      {/* Order detail modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }} onClick={() => setSelectedOrder(null)}>
          <div className="glass-panel p-6 w-full max-w-md rounded-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-xs text-sky-400 font-mono">{selectedOrder.id}</p>
                <h3 className="text-lg font-bold text-white">Order Details</h3>
              </div>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusClass[selectedOrder.status]}`}>
                {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
              </span>
            </div>
            <div className="space-y-3">
              {[
                { label: "Customer", val: selectedOrder.customer },
                { label: "Phone", val: selectedOrder.phone },
                { label: "Product", val: selectedOrder.product },
                { label: "Quantity", val: String(selectedOrder.quantity) },
                { label: "Total", val: `৳${selectedOrder.total.toLocaleString()}` },
                { label: "Address", val: selectedOrder.address },
                { label: "Order Date", val: selectedOrder.date },
              ].map(row => (
                <div key={row.label} className="flex items-start justify-between gap-4 py-2 border-b border-white/5 last:border-0">
                  <span className="text-xs text-white/40 shrink-0">{row.label}</span>
                  <span className="text-sm text-white text-right">{row.val}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setSelectedOrder(null)} className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/60 hover:text-white hover:bg-white/5 text-sm transition">Close</button>
              <button
                onClick={() => { updateOrderStatus(selectedOrder.id, "delivered"); setSelectedOrder(null); }}
                className="flex-1 py-2.5 rounded-xl bg-green-500/15 border border-green-500/20 text-green-400 hover:bg-green-500/25 text-sm font-medium transition"
                disabled={selectedOrder.status === "delivered"}
              >
                Mark Delivered
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

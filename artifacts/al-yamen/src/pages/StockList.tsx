import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { Link } from "wouter";

const statusClass = {
  "in-stock": "badge-in-stock",
  "low-stock": "badge-low-stock",
  "out-of-stock": "badge-out-of-stock",
};

const statusLabel = {
  "in-stock": "In Stock",
  "low-stock": "Low Stock",
  "out-of-stock": "Out of Stock",
};

export default function StockList() {
  const { stockItems } = useApp();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = stockItems.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.code.includes(search) ||
      s.category.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || s.status === filter;
    return matchSearch && matchFilter;
  });

  const totalValue = stockItems.reduce((sum, s) => sum + s.qty * s.price, 0);

  return (
    <div data-testid="page-stock-list">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Stock Inventory</h2>
          <p className="text-sm text-white/40 mt-1">Current inventory levels ({stockItems.length} products)</p>
        </div>
        <Link href="/inventory/add-product">
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 rounded-xl text-xs font-medium border border-emerald-500/20 transition" data-testid="button-add-product">
            <Plus size={13} /> Add Product
          </button>
        </Link>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="glass-card p-4 text-center">
          <p className="text-xs text-white/40 mb-1">In Stock</p>
          <p className="text-xl font-bold text-green-400">{stockItems.filter(s => s.status === "in-stock").length}</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-xs text-white/40 mb-1">Low Stock</p>
          <p className="text-xl font-bold text-yellow-400">{stockItems.filter(s => s.status === "low-stock").length}</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-xs text-white/40 mb-1">Out of Stock</p>
          <p className="text-xl font-bold text-red-400">{stockItems.filter(s => s.status === "out-of-stock").length}</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-xs text-white/40 mb-1">Total Value</p>
          <p className="text-sm font-bold text-sky-400">৳{totalValue.toLocaleString()}</p>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-5 pb-4 border-b border-white/6">
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search stock..." className="form-input w-full pl-8 pr-3 py-2 rounded-lg text-sm text-white placeholder-white/25" data-testid="input-search" />
          </div>
          <div className="flex gap-2">
            {["all","in-stock","low-stock","out-of-stock"].map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition capitalize ${filter === f ? "bg-sky-500 text-white" : "text-white/50 hover:text-white hover:bg-white/10"}`}>
                {f === "all" ? "All" : statusLabel[f as keyof typeof statusLabel]}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="data-table w-full">
            <thead>
              <tr>
                <th className="text-left">Code</th>
                <th className="text-left">Product Name</th>
                <th className="text-left hidden md:table-cell">Category</th>
                <th className="text-center">Qty</th>
                <th className="text-right">Price</th>
                <th className="text-right hidden md:table-cell">Value</th>
                <th className="text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item.code} data-testid={`row-stock-${item.code}`}>
                  <td className="text-sky-400 font-mono text-xs">{item.code}</td>
                  <td className="text-white font-medium">{item.name}</td>
                  <td className="text-white/60 text-xs hidden md:table-cell">{item.category}</td>
                  <td className="text-center">
                    <span className={`font-bold text-sm ${item.qty === 0 ? "text-red-400" : item.qty < 10 ? "text-yellow-400" : "text-white"}`}>{item.qty}</span>
                  </td>
                  <td className="text-right text-white">৳{item.price.toLocaleString()}</td>
                  <td className="text-right text-white/60 text-xs hidden md:table-cell">৳{(item.qty * item.price).toLocaleString()}</td>
                  <td className="text-center">
                    <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${statusClass[item.status as keyof typeof statusClass]}`}>
                      {statusLabel[item.status as keyof typeof statusLabel]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="py-12 text-center text-white/30 text-sm">No items found</div>}
        </div>
      </div>
    </div>
  );
}

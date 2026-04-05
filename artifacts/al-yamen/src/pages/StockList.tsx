import { useState } from "react";
import { Search, Plus } from "lucide-react";

const stockItems = [
  { code: "#P-001", name: "Cotton Saree", category: "Clothing", qty: 25, price: 800, status: "in-stock" },
  { code: "#P-002", name: "Leather Belt", category: "Accessories", qty: 5, price: 350, status: "low-stock" },
  { code: "#P-003", name: "Panjabi", category: "Clothing", qty: 0, price: 1200, status: "out-of-stock" },
  { code: "#P-004", name: "Gold Necklace", category: "Jewelry", qty: 12, price: 5500, status: "in-stock" },
  { code: "#P-005", name: "Foundation Cream", category: "Cosmetics", qty: 3, price: 450, status: "low-stock" },
  { code: "#P-006", name: "Three-Piece Set", category: "Clothing", qty: 18, price: 1800, status: "in-stock" },
];

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
  const [search, setSearch] = useState("");

  const filtered = stockItems.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.code.includes(search) ||
    s.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div data-testid="page-stock-list">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Stock Inventory</h2>
        <p className="text-sm text-white/40 mt-1">Current inventory levels</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
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
      </div>

      <div className="glass-card overflow-hidden">
        <div className="flex items-center justify-between gap-3 p-5 pb-4 border-b border-white/6">
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search stock..." className="form-input w-full pl-8 pr-3 py-2 rounded-lg text-sm text-white placeholder-white/25" data-testid="input-search" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 rounded-xl text-xs font-medium border border-emerald-500/20 transition" data-testid="button-add-item">
            <Plus size={13} /> Add Item
          </button>
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
                  <td className="text-center">
                    <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${statusClass[item.status as keyof typeof statusClass]}`}>
                      {statusLabel[item.status as keyof typeof statusLabel]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Search, Plus, Edit2, Trash2, X } from "lucide-react";
import { useApp, StockItem } from "@/context/AppContext";
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

const blankForm = { name: "", category: "", qty: "", price: "", status: "in-stock" as StockItem["status"] };

export default function StockList() {
  const { stockItems, updateStockItem, removeStockItem } = useApp();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [editTarget, setEditTarget] = useState<StockItem | null>(null);
  const [form, setForm] = useState(blankForm);
  const [deleteTarget, setDeleteTarget] = useState<StockItem | null>(null);

  const filtered = stockItems.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.code.includes(search) ||
      s.category.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || s.status === filter;
    return matchSearch && matchFilter;
  });

  const totalValue = stockItems.reduce((sum, s) => sum + s.qty * s.price, 0);

  function openEdit(item: StockItem) {
    setEditTarget(item);
    setForm({ name: item.name, category: item.category, qty: String(item.qty), price: String(item.price), status: item.status });
  }

  function handleEditSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!editTarget) return;
    const qty = parseInt(form.qty) || 0;
    const autoStatus: StockItem["status"] = qty === 0 ? "out-of-stock" : qty < 10 ? "low-stock" : "in-stock";
    updateStockItem(editTarget.code, {
      name: form.name,
      category: form.category,
      qty,
      price: parseFloat(form.price) || 0,
      status: form.status || autoStatus,
    });
    setEditTarget(null);
  }

  function handleDelete() {
    if (deleteTarget) removeStockItem(deleteTarget.code);
    setDeleteTarget(null);
  }

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
                <th className="text-center">Actions</th>
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
                  <td className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => openEdit(item)}
                        className="p-1.5 text-sky-400/60 hover:text-sky-400 hover:bg-sky-500/10 rounded-lg transition"
                        data-testid={`button-edit-${item.code}`}
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(item)}
                        className="p-1.5 text-red-400/50 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
                        data-testid={`button-delete-${item.code}`}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="py-12 text-center text-white/30 text-sm">No items found</div>}
        </div>
      </div>

      {/* Edit Modal */}
      {editTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}>
          <div className="glass-panel p-6 w-full max-w-md rounded-2xl">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-xs text-sky-400 font-mono">{editTarget.code}</p>
                <h3 className="text-lg font-bold text-white">Edit Product</h3>
              </div>
              <button onClick={() => setEditTarget(null)} className="text-white/30 hover:text-white transition"><X size={18} /></button>
            </div>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-white/60 mb-1.5">Product Name</label>
                <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required className="form-input w-full py-2.5 px-3 rounded-lg text-sm text-white" />
              </div>
              <div>
                <label className="block text-xs font-medium text-white/60 mb-1.5">Category</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required className="form-input w-full py-2.5 px-3 rounded-lg text-sm text-white">
                  <option value="">Select category</option>
                  {["Clothing","Cosmetics","Jewelry","Accessories","Electronics","Food","Other"].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-white/60 mb-1.5">Quantity</label>
                  <input type="number" value={form.qty} onChange={e => setForm({ ...form, qty: e.target.value })} min="0" required className="form-input w-full py-2.5 px-3 rounded-lg text-sm text-white" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/60 mb-1.5">Unit Price (৳)</label>
                  <input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} min="0" required className="form-input w-full py-2.5 px-3 rounded-lg text-sm text-white" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-white/60 mb-1.5">Stock Status</label>
                <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as StockItem["status"] })} className="form-input w-full py-2.5 px-3 rounded-lg text-sm text-white">
                  <option value="in-stock">In Stock</option>
                  <option value="low-stock">Low Stock</option>
                  <option value="out-of-stock">Out of Stock</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setEditTarget(null)} className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/60 hover:text-white hover:bg-white/5 text-sm transition">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold transition shadow-lg shadow-sky-500/25" data-testid="button-save-edit">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}>
          <div className="glass-panel p-6 w-full max-w-sm rounded-2xl text-center">
            <div className="w-12 h-12 rounded-full bg-red-500/15 flex items-center justify-center mx-auto mb-4">
              <Trash2 size={20} className="text-red-400" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Delete Product?</h3>
            <p className="text-sm text-white/40 mb-1">
              <span className="text-white font-medium">{deleteTarget.name}</span> ({deleteTarget.code})
            </p>
            <p className="text-sm text-white/30 mb-5">This will permanently remove it from inventory.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)} className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/60 hover:text-white hover:bg-white/5 text-sm transition">Cancel</button>
              <button onClick={handleDelete} className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-400 text-white text-sm font-semibold transition" data-testid="button-confirm-delete">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

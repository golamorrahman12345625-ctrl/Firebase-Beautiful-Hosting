import { useState } from "react";
import { Plus, Edit2, Trash2, X, CheckCircle, Tag, BarChart2 } from "lucide-react";

interface Category {
  id: string;
  name: string;
  namebn: string;
  count: number;
  color: string;
}

const COLORS = ["#0ea5e9","#8b5cf6","#22c55e","#f59e0b","#ec4899","#ef4444","#14b8a6","#f97316"];

const initialCategories: Category[] = [
  { id: "#C-01", name: "Saree", namebn: "শাড়ি", count: 125, color: "#0ea5e9" },
  { id: "#C-02", name: "Three-Piece", namebn: "থ্রি-পিস", count: 80, color: "#8b5cf6" },
  { id: "#C-03", name: "Cosmetics", namebn: "কসমেটিকস", count: 45, color: "#ec4899" },
  { id: "#C-04", name: "Jewelry", namebn: "গয়না", count: 60, color: "#f59e0b" },
  { id: "#C-05", name: "Accessories", namebn: "এক্সেসরিজ", count: 33, color: "#22c55e" },
  { id: "#C-06", name: "Electronics", namebn: "ইলেকট্রনিক্স", count: 18, color: "#ef4444" },
];

const blank = { name: "", namebn: "", count: "", color: COLORS[0] };

type ModalMode = "add" | "edit" | "delete" | null;

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [mode, setMode] = useState<ModalMode>(null);
  const [target, setTarget] = useState<Category | null>(null);
  const [form, setForm] = useState(blank);
  const [nextNum, setNextNum] = useState(7);
  const [toast, setToast] = useState("");

  const totalProducts = categories.reduce((s, c) => s + c.count, 0);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  }

  function openAdd() {
    setForm(blank);
    setTarget(null);
    setMode("add");
  }

  function openEdit(cat: Category) {
    setForm({ name: cat.name, namebn: cat.namebn, count: String(cat.count), color: cat.color });
    setTarget(cat);
    setMode("edit");
  }

  function openDelete(cat: Category) {
    setTarget(cat);
    setMode("delete");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (mode === "add") {
      const id = `#C-0${nextNum}`;
      setCategories(prev => [...prev, {
        id,
        name: form.name,
        namebn: form.namebn,
        count: parseInt(form.count) || 0,
        color: form.color,
      }]);
      setNextNum(n => n + 1);
      showToast("Category added successfully!");
    } else if (mode === "edit" && target) {
      setCategories(prev => prev.map(c => c.id === target.id ? {
        ...c,
        name: form.name,
        namebn: form.namebn,
        count: parseInt(form.count) || c.count,
        color: form.color,
      } : c));
      showToast("Category updated!");
    }
    setMode(null);
  }

  function handleDelete() {
    if (target) {
      setCategories(prev => prev.filter(c => c.id !== target.id));
      showToast("Category deleted.");
    }
    setMode(null);
  }

  const maxCount = Math.max(...categories.map(c => c.count));

  return (
    <div data-testid="page-categories">
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl bg-green-500/15 border border-green-500/25 text-green-400 text-sm font-medium backdrop-blur-xl">
          <CheckCircle size={15} /> {toast}
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Categories</h2>
          <p className="text-sm text-white/40 mt-1">Manage your product categories</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 rounded-xl text-sm font-medium border border-amber-500/20 transition" data-testid="button-add-category">
          <Plus size={14} /> New Category
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="glass-card p-4 flex items-center gap-3">
          <div className="p-2.5 bg-amber-500/15 rounded-xl"><Tag size={16} className="text-amber-400" /></div>
          <div>
            <p className="text-xl font-bold text-white">{categories.length}</p>
            <p className="text-xs text-white/40">Total Categories</p>
          </div>
        </div>
        <div className="glass-card p-4 flex items-center gap-3">
          <div className="p-2.5 bg-sky-500/15 rounded-xl"><BarChart2 size={16} className="text-sky-400" /></div>
          <div>
            <p className="text-xl font-bold text-white">{totalProducts}</p>
            <p className="text-xs text-white/40">Total Products</p>
          </div>
        </div>
        <div className="glass-card p-4 flex items-center gap-3">
          <div className="p-2.5 bg-violet-500/15 rounded-xl">
            <span className="text-violet-400 text-sm font-bold">#1</span>
          </div>
          <div>
            <p className="text-sm font-bold text-white truncate">{categories.sort((a,b) => b.count - a.count)[0]?.name}</p>
            <p className="text-xs text-white/40">Top Category</p>
          </div>
        </div>
      </div>

      {/* Category cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {categories.map(cat => (
          <div key={cat.id} className="glass-card p-5 flex flex-col gap-3" data-testid={`card-category-${cat.id}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${cat.color}20` }}>
                  <Tag size={18} style={{ color: cat.color }} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{cat.name}</h4>
                  <p className="text-xs text-white/40">{cat.namebn}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => openEdit(cat)} className="p-1.5 text-sky-400/60 hover:text-sky-400 hover:bg-sky-500/10 rounded-lg transition" data-testid={`button-edit-${cat.id}`}>
                  <Edit2 size={13} />
                </button>
                <button onClick={() => openDelete(cat)} className="p-1.5 text-red-400/60 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition" data-testid={`button-delete-${cat.id}`}>
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-white/40">{cat.id}</span>
                <span className="font-medium" style={{ color: cat.color }}>{cat.count} products</span>
              </div>
              <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.round((cat.count / maxCount) * 100)}%`, background: cat.color, opacity: 0.85 }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table view */}
      <div className="glass-card overflow-hidden">
        <div className="p-5 pb-3 border-b border-white/6">
          <h3 className="font-semibold text-white text-sm">All Categories</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table w-full">
            <thead>
              <tr>
                <th className="text-left" style={{ background: "rgba(245,158,11,0.08)", color: "#f59e0b" }}>ID</th>
                <th className="text-left" style={{ background: "rgba(245,158,11,0.08)", color: "#f59e0b" }}>Category Name</th>
                <th className="text-left hidden md:table-cell" style={{ background: "rgba(245,158,11,0.08)", color: "#f59e0b" }}>Bengali</th>
                <th className="text-center" style={{ background: "rgba(245,158,11,0.08)", color: "#f59e0b" }}>Products</th>
                <th className="text-center" style={{ background: "rgba(245,158,11,0.08)", color: "#f59e0b" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(cat => (
                <tr key={cat.id} data-testid={`row-category-${cat.id}`}>
                  <td className="font-mono text-xs" style={{ color: cat.color }}>{cat.id}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: cat.color }} />
                      <span className="text-white font-medium">{cat.name}</span>
                    </div>
                  </td>
                  <td className="text-white/50 hidden md:table-cell">{cat.namebn}</td>
                  <td className="text-center">
                    <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: `${cat.color}15`, color: cat.color }}>
                      {cat.count} items
                    </span>
                  </td>
                  <td className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => openEdit(cat)} className="p-1.5 text-sky-400 hover:bg-sky-500/10 rounded-lg transition" data-testid={`table-edit-${cat.id}`}>
                        <Edit2 size={13} />
                      </button>
                      <button onClick={() => openDelete(cat)} className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition" data-testid={`table-delete-${cat.id}`}>
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {(mode === "add" || mode === "edit") && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}>
          <div className="glass-panel p-6 w-full max-w-md rounded-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-white">{mode === "add" ? "Add New Category" : "Edit Category"}</h3>
              <button onClick={() => setMode(null)} className="text-white/30 hover:text-white transition"><X size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-white/60 mb-1.5">Category Name (English)</label>
                <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g., Clothing" required className="form-input w-full py-2.5 px-3 rounded-lg text-sm text-white placeholder-white/25" />
              </div>
              <div>
                <label className="block text-xs font-medium text-white/60 mb-1.5">Category Name (বাংলা)</label>
                <input type="text" value={form.namebn} onChange={e => setForm({ ...form, namebn: e.target.value })} placeholder="e.g., পোশাক" className="form-input w-full py-2.5 px-3 rounded-lg text-sm text-white placeholder-white/25" />
              </div>
              <div>
                <label className="block text-xs font-medium text-white/60 mb-1.5">Product Count</label>
                <input type="number" value={form.count} onChange={e => setForm({ ...form, count: e.target.value })} placeholder="0" min="0" className="form-input w-full py-2.5 px-3 rounded-lg text-sm text-white placeholder-white/25" />
              </div>
              <div>
                <label className="block text-xs font-medium text-white/60 mb-2">Category Color</label>
                <div className="flex flex-wrap gap-2">
                  {COLORS.map(c => (
                    <button key={c} type="button" onClick={() => setForm({ ...form, color: c })}
                      className="w-7 h-7 rounded-full border-2 transition-transform hover:scale-110"
                      style={{ background: c, borderColor: form.color === c ? "white" : "transparent" }} />
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setMode(null)} className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/60 hover:text-white hover:bg-white/5 text-sm transition">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-white text-sm font-semibold transition shadow-lg shadow-amber-500/25">
                  {mode === "add" ? "Add Category" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {mode === "delete" && target && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}>
          <div className="glass-panel p-6 w-full max-w-sm rounded-2xl text-center">
            <div className="w-12 h-12 rounded-full bg-red-500/15 flex items-center justify-center mx-auto mb-4">
              <Trash2 size={20} className="text-red-400" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Delete Category?</h3>
            <p className="text-sm text-white/40 mb-5">
              Are you sure you want to delete <span className="text-white font-medium">{target.name}</span>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setMode(null)} className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/60 hover:text-white hover:bg-white/5 text-sm transition">Cancel</button>
              <button onClick={handleDelete} className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-400 text-white text-sm font-semibold transition">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

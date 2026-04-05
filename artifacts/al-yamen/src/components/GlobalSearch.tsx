import { useState, useRef, useEffect } from "react";
import { Search, X, ArrowRight, ShoppingBag, ArrowLeftRight, Package, Users } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useLocation } from "wouter";

interface Result {
  type: string;
  label: string;
  sub: string;
  path: string;
  icon: React.ReactNode;
}

export default function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { orders, transactions, stockItems } = useApp();
  const [, setLocation] = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") { e.preventDefault(); setOpen(v => !v); }
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const q = query.toLowerCase().trim();

  const results: Result[] = [];

  if (q.length >= 1) {
    // Orders
    orders.filter(o => o.customer.toLowerCase().includes(q) || o.id.includes(q)).slice(0, 3).forEach(o => {
      results.push({ type: "Order", label: `${o.id} — ${o.customer}`, sub: `${o.product} · ৳${o.total.toLocaleString()}`, path: "/sales/order-history", icon: <ShoppingBag size={13} className="text-violet-400" /> });
    });
    // Transactions
    transactions.filter(t => t.description.toLowerCase().includes(q)).slice(0, 3).forEach(t => {
      results.push({ type: "Transaction", label: t.description, sub: `${t.type === "income" ? "+" : "-"}৳${t.amount.toLocaleString()} · ${t.date}`, path: "/transactions/all", icon: <ArrowLeftRight size={13} className="text-sky-400" /> });
    });
    // Stock
    stockItems.filter(s => s.name.toLowerCase().includes(q) || s.code.includes(q)).slice(0, 3).forEach(s => {
      results.push({ type: "Stock", label: s.name, sub: `${s.code} · ${s.qty} units · ৳${s.price.toLocaleString()}`, path: "/inventory/stock-list", icon: <Package size={13} className="text-amber-400" /> });
    });

    // Static nav pages
    const pages = [
      { label: "Dashboard", path: "/" },
      { label: "Add Transaction", path: "/transactions/add" },
      { label: "All Transactions", path: "/transactions/all" },
      { label: "New Order", path: "/sales/new-order" },
      { label: "Order History", path: "/sales/order-history" },
      { label: "Customer List", path: "/sales/customers" },
      { label: "Add Product", path: "/inventory/add-product" },
      { label: "Stock List", path: "/inventory/stock-list" },
      { label: "Categories", path: "/inventory/categories" },
      { label: "HR Management", path: "/hr" },
      { label: "Accounting", path: "/accounting" },
      { label: "Settings", path: "/settings" },
    ];
    pages.filter(p => p.label.toLowerCase().includes(q)).slice(0, 3).forEach(p => {
      results.push({ type: "Page", label: p.label, sub: "Navigate to page", path: p.path, icon: <ArrowRight size={13} className="text-white/40" /> });
    });
  }

  function go(path: string) {
    setLocation(path);
    setOpen(false);
    setQuery("");
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/8 bg-white/[0.04] hover:bg-white/[0.07] text-white/40 hover:text-white/60 text-xs transition"
        data-testid="button-global-search"
      >
        <Search size={12} />
        <span className="hidden sm:inline">Search...</span>
        <kbd className="hidden sm:inline px-1.5 py-0.5 rounded text-[9px] bg-white/10 text-white/30 font-mono">⌘K</kbd>
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[10vh] px-4" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(12px)" }}>
          <div ref={panelRef} className="w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl" style={{ background: "rgba(8,15,28,0.97)", border: "1px solid rgba(255,255,255,0.1)" }}>
            {/* Search input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/8">
              <Search size={16} className="text-white/40 shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search orders, transactions, products, pages..."
                className="flex-1 bg-transparent text-white text-sm outline-none placeholder-white/25"
                data-testid="input-global-search"
              />
              <button onClick={() => { setOpen(false); setQuery(""); }} className="text-white/30 hover:text-white transition">
                <X size={15} />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto">
              {q.length === 0 && (
                <div className="px-5 py-4">
                  <p className="text-xs text-white/30 mb-3 uppercase tracking-wider font-semibold">Quick Navigate</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: "Dashboard", path: "/", icon: <ArrowRight size={12} /> },
                      { label: "New Order", path: "/sales/new-order", icon: <ShoppingBag size={12} className="text-violet-400" /> },
                      { label: "Add Transaction", path: "/transactions/add", icon: <ArrowLeftRight size={12} className="text-sky-400" /> },
                      { label: "Stock List", path: "/inventory/stock-list", icon: <Package size={12} className="text-amber-400" /> },
                      { label: "HR Management", path: "/hr", icon: <Users size={12} className="text-green-400" /> },
                      { label: "Accounting", path: "/accounting", icon: <ArrowRight size={12} /> },
                    ].map(p => (
                      <button key={p.path} onClick={() => go(p.path)} className="flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-white/[0.06] text-white/60 hover:text-white text-xs transition text-left">
                        {p.icon} {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {q.length > 0 && results.length === 0 && (
                <div className="py-10 text-center text-white/30 text-sm">No results for "{query}"</div>
              )}

              {results.length > 0 && (
                <div className="p-2">
                  {results.map((r, i) => (
                    <button key={i} onClick={() => go(r.path)} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/[0.06] text-left transition group">
                      <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center shrink-0">
                        {r.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white group-hover:text-sky-400 transition truncate">{r.label}</p>
                        <p className="text-xs text-white/40 truncate">{r.sub}</p>
                      </div>
                      <span className="text-[10px] text-white/25 shrink-0 border border-white/10 px-1.5 py-0.5 rounded">{r.type}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="px-5 py-3 border-t border-white/6 flex items-center gap-4 text-[10px] text-white/25">
              <span><kbd className="font-mono">↑↓</kbd> Navigate</span>
              <span><kbd className="font-mono">Enter</kbd> Select</span>
              <span><kbd className="font-mono">Esc</kbd> Close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

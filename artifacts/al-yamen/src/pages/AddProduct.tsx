import { useState } from "react";
import { PlusCircle, CheckCircle } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { Link } from "wouter";

export default function AddProduct() {
  const { addStockItem } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", category: "", quantity: "", price: "", status: "in-stock" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const qty = parseInt(form.quantity);
    const autoStatus: "in-stock" | "low-stock" | "out-of-stock" =
      qty === 0 ? "out-of-stock" : qty < 10 ? "low-stock" : "in-stock";
    addStockItem({
      name: form.name,
      category: form.category,
      qty,
      price: parseFloat(form.price),
      status: form.status as "in-stock" | "low-stock" | "out-of-stock" || autoStatus,
    });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: "", category: "", quantity: "", price: "", status: "in-stock" });
  };

  return (
    <div className="max-w-lg mx-auto" data-testid="page-add-product">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Add Product</h2>
        <p className="text-sm text-white/40 mt-1">Add a new item to inventory</p>
      </div>

      {submitted && (
        <div className="flex items-center justify-between gap-3 p-4 rounded-xl mb-5 bg-green-500/10 border border-green-500/20 text-green-400">
          <div className="flex items-center gap-3">
            <CheckCircle size={18} />
            <span className="text-sm font-medium">Product added to inventory!</span>
          </div>
          <Link href="/inventory/stock-list">
            <button className="text-xs text-sky-400 hover:text-sky-300 transition underline underline-offset-2">View Stock</button>
          </Link>
        </div>
      )}

      <div className="glass-card p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Product Name</label>
            <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Enter product name" required className="form-input w-full py-2.5 px-3 rounded-lg text-sm text-white placeholder-white/25" data-testid="input-name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Category</label>
            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required className="form-input w-full py-2.5 px-3 rounded-lg text-sm text-white" data-testid="select-category">
              <option value="">Select category</option>
              <option value="Clothing">Clothing (পোশাক)</option>
              <option value="Cosmetics">Cosmetics (কসমেটিকস)</option>
              <option value="Jewelry">Jewelry (গয়না)</option>
              <option value="Accessories">Accessories (এক্সেসরিজ)</option>
              <option value="Electronics">Electronics (ইলেকট্রনিক্স)</option>
              <option value="Food">Food (খাদ্য)</option>
              <option value="Other">Other (অন্যান্য)</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Quantity</label>
              <input type="number" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} placeholder="0" min="0" required className="form-input w-full py-2.5 px-3 rounded-lg text-sm text-white placeholder-white/25" data-testid="input-quantity" />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Unit Price (৳)</label>
              <input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="0.00" min="1" required className="form-input w-full py-2.5 px-3 rounded-lg text-sm text-white placeholder-white/25" data-testid="input-price" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Stock Status</label>
            <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="form-input w-full py-2.5 px-3 rounded-lg text-sm text-white" data-testid="select-status">
              <option value="in-stock">In Stock (স্টকে আছে)</option>
              <option value="low-stock">Low Stock (অল্প আছে)</option>
              <option value="out-of-stock">Out of Stock (স্টক শেষ)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Description (optional)</label>
            <textarea rows={2} placeholder="Additional product details..." className="form-input w-full py-2.5 px-3 rounded-lg text-sm text-white placeholder-white/25 resize-none" />
          </div>
          <button type="submit" className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-semibold text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 mt-2" data-testid="button-submit">
            <PlusCircle size={16} />
            Add to Inventory
          </button>
        </form>
      </div>
    </div>
  );
}

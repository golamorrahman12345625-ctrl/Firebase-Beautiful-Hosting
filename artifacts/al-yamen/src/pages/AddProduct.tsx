import { useState } from "react";
import { PlusCircle, CheckCircle } from "lucide-react";

export default function AddProduct() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", category: "", quantity: "", price: "", status: "in-stock" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
        <div className="flex items-center gap-3 p-4 rounded-xl mb-5 bg-green-500/10 border border-green-500/20 text-green-400">
          <CheckCircle size={18} />
          <span className="text-sm font-medium">Product added to inventory!</span>
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
              <option value="saree">Saree (শাড়ি)</option>
              <option value="three-piece">Three-Piece (থ্রি-পিস)</option>
              <option value="cosmetics">Cosmetics (কসমেটিকস)</option>
              <option value="jewelry">Jewelry (গয়না)</option>
              <option value="accessories">Accessories (এক্সেসরিজ)</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Quantity</label>
              <input type="number" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} placeholder="0" min="0" required className="form-input w-full py-2.5 px-3 rounded-lg text-sm text-white placeholder-white/25" data-testid="input-quantity" />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Purchase Price (৳)</label>
              <input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="0.00" required className="form-input w-full py-2.5 px-3 rounded-lg text-sm text-white placeholder-white/25" data-testid="input-price" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Status</label>
            <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="form-input w-full py-2.5 px-3 rounded-lg text-sm text-white" data-testid="select-status">
              <option value="in-stock">In Stock (স্টকে আছে)</option>
              <option value="low-stock">Low Stock (অল্প আছে)</option>
              <option value="out-of-stock">Out of Stock (স্টক শেষ)</option>
            </select>
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

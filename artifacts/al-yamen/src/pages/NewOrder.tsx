import { useState } from "react";
import { ShoppingCart, CheckCircle } from "lucide-react";

export default function NewOrder() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ customer: "", phone: "", product: "", quantity: "", price: "", address: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ customer: "", phone: "", product: "", quantity: "", price: "", address: "" });
  };

  return (
    <div className="max-w-lg mx-auto" data-testid="page-new-order">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">New Order</h2>
        <p className="text-sm text-white/40 mt-1">Place a new customer order</p>
      </div>

      {submitted && (
        <div className="flex items-center gap-3 p-4 rounded-xl mb-5 bg-green-500/10 border border-green-500/20 text-green-400">
          <CheckCircle size={18} />
          <span className="text-sm font-medium">Order confirmed successfully!</span>
        </div>
      )}

      <div className="glass-card p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Customer Name</label>
            <input type="text" value={form.customer} onChange={e => setForm({ ...form, customer: e.target.value })} placeholder="Enter customer name" required className="form-input w-full py-2.5 px-3 rounded-lg text-sm text-white placeholder-white/25" data-testid="input-customer-name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Phone Number</label>
            <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="01XXXXXXXXX" required className="form-input w-full py-2.5 px-3 rounded-lg text-sm text-white placeholder-white/25" data-testid="input-phone" />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Product Name</label>
            <input type="text" value={form.product} onChange={e => setForm({ ...form, product: e.target.value })} placeholder="What are they ordering?" required className="form-input w-full py-2.5 px-3 rounded-lg text-sm text-white placeholder-white/25" data-testid="input-product" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Quantity</label>
              <input type="number" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} placeholder="1" min="1" required className="form-input w-full py-2.5 px-3 rounded-lg text-sm text-white placeholder-white/25" data-testid="input-quantity" />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Total Price (৳)</label>
              <input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="0.00" required className="form-input w-full py-2.5 px-3 rounded-lg text-sm text-white placeholder-white/25" data-testid="input-price" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Delivery Address</label>
            <textarea value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} rows={3} placeholder="Full address for delivery" required className="form-input w-full py-2.5 px-3 rounded-lg text-sm text-white placeholder-white/25 resize-none" data-testid="input-address" />
          </div>
          <button type="submit" className="w-full py-3 bg-sky-500 hover:bg-sky-400 text-white rounded-xl font-semibold text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25 mt-2" data-testid="button-place-order">
            <ShoppingCart size={16} />
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}

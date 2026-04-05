import { useState } from "react";
import { ShoppingCart, CheckCircle } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { Link } from "wouter";

export default function NewOrder() {
  const { addOrder } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [lastOrderId, setLastOrderId] = useState("");
  const [form, setForm] = useState({ customer: "", phone: "", product: "", quantity: "1", price: "", address: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const qty = parseInt(form.quantity) || 1;
    const total = parseFloat(form.price) || 0;
    addOrder({
      customer: form.customer,
      phone: form.phone,
      product: `${form.product} (${qty} ${qty === 1 ? "pc" : "pcs"})`,
      quantity: qty,
      total,
      address: form.address,
    });
    setLastOrderId(`#ORD-${Date.now().toString().slice(-4)}`);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ customer: "", phone: "", product: "", quantity: "1", price: "", address: "" });
  };

  return (
    <div className="max-w-lg mx-auto" data-testid="page-new-order">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">New Order</h2>
        <p className="text-sm text-white/40 mt-1">Place a new customer order</p>
      </div>

      {submitted && (
        <div className="flex items-center justify-between gap-3 p-4 rounded-xl mb-5 bg-green-500/10 border border-green-500/20 text-green-400">
          <div className="flex items-center gap-3">
            <CheckCircle size={18} />
            <span className="text-sm font-medium">Order confirmed! Check Order History.</span>
          </div>
          <Link href="/sales/order-history">
            <button className="text-xs text-sky-400 hover:text-sky-300 transition underline underline-offset-2">View Orders</button>
          </Link>
        </div>
      )}

      <div className="glass-card p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-white/70 mb-2">Customer Name</label>
              <input type="text" value={form.customer} onChange={e => setForm({ ...form, customer: e.target.value })} placeholder="Enter customer name" required className="form-input w-full py-2.5 px-3 rounded-lg text-sm text-white placeholder-white/25" data-testid="input-customer-name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Phone Number</label>
              <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="01XXXXXXXXX" required className="form-input w-full py-2.5 px-3 rounded-lg text-sm text-white placeholder-white/25" data-testid="input-phone" />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Product Name</label>
              <input type="text" value={form.product} onChange={e => setForm({ ...form, product: e.target.value })} placeholder="Product being ordered" required className="form-input w-full py-2.5 px-3 rounded-lg text-sm text-white placeholder-white/25" data-testid="input-product" />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Quantity</label>
              <input type="number" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} placeholder="1" min="1" required className="form-input w-full py-2.5 px-3 rounded-lg text-sm text-white placeholder-white/25" data-testid="input-quantity" />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Total Price (৳)</label>
              <input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="0.00" min="1" required className="form-input w-full py-2.5 px-3 rounded-lg text-sm text-white placeholder-white/25" data-testid="input-price" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Delivery Address</label>
            <textarea value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} rows={3} placeholder="Full address for delivery" required className="form-input w-full py-2.5 px-3 rounded-lg text-sm text-white placeholder-white/25 resize-none" data-testid="input-address" />
          </div>

          {form.price && form.quantity && (
            <div className="rounded-xl bg-sky-500/8 border border-sky-500/15 p-3 text-sm text-white/60">
              Order Total: <span className="text-sky-400 font-bold">৳{parseFloat(form.price || "0").toLocaleString()}</span>
            </div>
          )}

          <button type="submit" className="w-full py-3 bg-sky-500 hover:bg-sky-400 text-white rounded-xl font-semibold text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25 mt-2" data-testid="button-place-order">
            <ShoppingCart size={16} />
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}

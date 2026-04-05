import { useState } from "react";
import { PlusCircle, CheckCircle } from "lucide-react";

export default function AddTransaction() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ date: "", description: "", amount: "", type: "income" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ date: "", description: "", amount: "", type: "income" });
  };

  return (
    <div className="max-w-lg mx-auto" data-testid="page-add-transaction">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Add Transaction</h2>
        <p className="text-sm text-white/40 mt-1">Record a new income or expense entry</p>
      </div>

      {submitted && (
        <div className="flex items-center gap-3 p-4 rounded-xl mb-5 bg-green-500/10 border border-green-500/20 text-green-400">
          <CheckCircle size={18} />
          <span className="text-sm font-medium">Transaction added successfully!</span>
        </div>
      )}

      <div className="glass-card p-6 space-y-5">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Date</label>
            <input
              type="date"
              value={form.date}
              onChange={e => setForm({ ...form, date: e.target.value })}
              required
              className="form-input w-full py-2.5 px-3 rounded-lg text-sm text-white"
              data-testid="input-date"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Description</label>
            <input
              type="text"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="e.g., Salary, Market Expense"
              required
              className="form-input w-full py-2.5 px-3 rounded-lg text-sm text-white placeholder-white/25"
              data-testid="input-description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Amount (৳)</label>
            <input
              type="number"
              value={form.amount}
              onChange={e => setForm({ ...form, amount: e.target.value })}
              placeholder="0.00"
              required
              className="form-input w-full py-2.5 px-3 rounded-lg text-sm text-white placeholder-white/25"
              data-testid="input-amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Type</label>
            <select
              value={form.type}
              onChange={e => setForm({ ...form, type: e.target.value })}
              className="form-input w-full py-2.5 px-3 rounded-lg text-sm text-white"
              data-testid="select-type"
            >
              <option value="income">Income (আয়)</option>
              <option value="expense">Expense (ব্যয়)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-sky-500 hover:bg-sky-400 text-white rounded-xl font-semibold text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25"
            data-testid="button-submit"
          >
            <PlusCircle size={16} />
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
}

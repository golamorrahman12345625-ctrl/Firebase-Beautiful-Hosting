import { useState } from "react";
import { Search, Eye } from "lucide-react";

const customers = [
  { id: 1, name: "Abdul Rahim", phone: "01711XXXXXX", address: "Mirpur, Dhaka", orders: 3 },
  { id: 2, name: "Karim Mia", phone: "01912XXXXXX", address: "Dhanmondi, Dhaka", orders: 1 },
  { id: 3, name: "Shafiqul Islam", phone: "01816XXXXXX", address: "Cumilla", orders: 5 },
  { id: 4, name: "Nasrin Begum", phone: "01615XXXXXX", address: "Chittagong", orders: 2 },
  { id: 5, name: "Rahim Ali", phone: "01519XXXXXX", address: "Sylhet", orders: 4 },
];

export default function CustomerList() {
  const [search, setSearch] = useState("");

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search) ||
    c.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div data-testid="page-customer-list">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Customer List</h2>
        <p className="text-sm text-white/40 mt-1">All registered customers</p>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="flex items-center gap-3 p-5 pb-4 border-b border-white/6">
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search customers..." className="form-input w-full pl-8 pr-3 py-2 rounded-lg text-sm text-white placeholder-white/25" data-testid="input-search" />
          </div>
          <span className="text-xs text-white/40">{filtered.length} customers</span>
        </div>

        <div className="overflow-x-auto">
          <table className="data-table w-full">
            <thead>
              <tr>
                <th className="text-left">Sl.</th>
                <th className="text-left">Name</th>
                <th className="text-left">Phone</th>
                <th className="text-left hidden md:table-cell">Address</th>
                <th className="text-center">Orders</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id} data-testid={`row-customer-${c.id}`}>
                  <td className="text-white/40 text-xs">{c.id}</td>
                  <td className="text-white font-medium">{c.name}</td>
                  <td className="text-white/60 text-xs font-mono">{c.phone}</td>
                  <td className="text-white/60 text-xs hidden md:table-cell">{c.address}</td>
                  <td className="text-center">
                    <span className="bg-sky-500/15 text-sky-400 text-xs px-2.5 py-1 rounded-full border border-sky-500/20">
                      {c.orders}
                    </span>
                  </td>
                  <td className="text-center">
                    <button className="text-sky-400 hover:text-sky-300 transition p-1.5 hover:bg-sky-500/10 rounded-lg" data-testid={`button-view-${c.id}`}>
                      <Eye size={14} />
                    </button>
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

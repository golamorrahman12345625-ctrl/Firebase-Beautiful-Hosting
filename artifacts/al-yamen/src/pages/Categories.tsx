import { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";

const initialCategories = [
  { id: "#C-01", name: "Saree (শাড়ি)", count: 125 },
  { id: "#C-02", name: "Three-Piece (থ্রি-পিস)", count: 80 },
  { id: "#C-03", name: "Cosmetics (কসমেটিকস)", count: 45 },
  { id: "#C-04", name: "Jewelry (গয়না)", count: 60 },
];

export default function Categories() {
  const [categories, setCategories] = useState(initialCategories);

  const handleDelete = (id: string) => {
    setCategories(cats => cats.filter(c => c.id !== id));
  };

  return (
    <div data-testid="page-categories">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Categories</h2>
          <p className="text-sm text-white/40 mt-1">Product category management</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 rounded-xl text-sm font-medium border border-amber-500/20 transition" data-testid="button-add-category">
          <Plus size={14} /> New Category
        </button>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table w-full">
            <thead>
              <tr>
                <th className="text-left" style={{ background: "rgba(245,158,11,0.1)", color: "#f59e0b" }}>ID</th>
                <th className="text-left" style={{ background: "rgba(245,158,11,0.1)", color: "#f59e0b" }}>Category Name</th>
                <th className="text-center" style={{ background: "rgba(245,158,11,0.1)", color: "#f59e0b" }}>Total Products</th>
                <th className="text-center" style={{ background: "rgba(245,158,11,0.1)", color: "#f59e0b" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(cat => (
                <tr key={cat.id} data-testid={`row-category-${cat.id}`}>
                  <td className="text-amber-400/80 font-mono text-xs">{cat.id}</td>
                  <td className="text-white font-medium">{cat.name}</td>
                  <td className="text-center">
                    <span className="bg-white/10 text-white/70 text-xs px-3 py-1 rounded-full">
                      {cat.count} items
                    </span>
                  </td>
                  <td className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1.5 text-sky-400 hover:bg-sky-500/10 rounded-lg transition" data-testid={`button-edit-${cat.id}`}>
                        <Edit2 size={13} />
                      </button>
                      <button onClick={() => handleDelete(cat.id)} className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition" data-testid={`button-delete-${cat.id}`}>
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
    </div>
  );
}

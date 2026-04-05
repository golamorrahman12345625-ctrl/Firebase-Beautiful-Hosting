import { useState } from "react";
import { Users, Clock, DollarSign, PlusCircle, X, Search, CheckCircle, Briefcase } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface Employee {
  id: string;
  name: string;
  role: string;
  dept: string;
  salary: number;
  phone: string;
  email: string;
  joinDate: string;
  attendance: number;
  status: "active" | "on-leave" | "inactive";
}

const INITIAL_EMPLOYEES: Employee[] = [
  { id: "EMP-001", name: "Rahim Ahmed", role: "Sales Manager", dept: "Sales", salary: 45000, phone: "01711XXXXXX", email: "rahim@al-yamen.com", joinDate: "01/01/2023", attendance: 95, status: "active" },
  { id: "EMP-002", name: "Karim Hossain", role: "Accountant", dept: "Finance", salary: 38000, phone: "01912XXXXXX", email: "karim@al-yamen.com", joinDate: "15/03/2022", attendance: 98, status: "active" },
  { id: "EMP-003", name: "Nasrin Akter", role: "HR Officer", dept: "HR", salary: 35000, phone: "01816XXXXXX", email: "nasrin@al-yamen.com", joinDate: "01/06/2023", attendance: 92, status: "active" },
  { id: "EMP-004", name: "Faruk Ali", role: "Warehouse Manager", dept: "Operations", salary: 42000, phone: "01615XXXXXX", email: "faruk@al-yamen.com", joinDate: "10/09/2021", attendance: 88, status: "active" },
  { id: "EMP-005", name: "Sumaiya Begum", role: "Customer Support", dept: "Sales", salary: 30000, phone: "01519XXXXXX", email: "sumaiya@al-yamen.com", joinDate: "20/11/2023", attendance: 96, status: "on-leave" },
];

const attendanceData = [
  { month: "Oct", present: 22, absent: 1 },
  { month: "Nov", present: 20, absent: 2 },
  { month: "Dec", present: 21, absent: 2 },
  { month: "Jan", present: 23, absent: 0 },
  { month: "Feb", present: 20, absent: 3 },
  { month: "Mar", present: 22, absent: 1 },
  { month: "Apr", present: 4, absent: 1 },
];

const DEPT_COLORS: Record<string, string> = {
  Sales: "#0ea5e9",
  Finance: "#8b5cf6",
  HR: "#22c55e",
  Operations: "#f59e0b",
  IT: "#ef4444",
};

const blankForm = { name: "", role: "", dept: "", salary: "", phone: "", email: "", joinDate: "" };

export default function HRManagement() {
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [search, setSearch] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState(blankForm);
  const [selected, setSelected] = useState<Employee | null>(null);
  const [added, setAdded] = useState(false);
  const [nextNum, setNextNum] = useState(6);

  const filtered = employees.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.role.toLowerCase().includes(search.toLowerCase()) ||
    e.dept.toLowerCase().includes(search.toLowerCase())
  );

  const totalPayroll = employees.reduce((s, e) => s + e.salary, 0);
  const active = employees.filter(e => e.status === "active").length;
  const onLeave = employees.filter(e => e.status === "on-leave").length;

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const id = `EMP-00${nextNum}`;
    const newEmp: Employee = {
      id,
      name: form.name,
      role: form.role,
      dept: form.dept,
      salary: parseFloat(form.salary) || 0,
      phone: form.phone,
      email: form.email,
      joinDate: form.joinDate ? new Date(form.joinDate).toLocaleDateString("en-GB") : new Date().toLocaleDateString("en-GB"),
      attendance: 100,
      status: "active",
    };
    setEmployees(prev => [...prev, newEmp]);
    setNextNum(n => n + 1);
    setForm(blankForm);
    setAdded(true);
    setTimeout(() => { setAdded(false); setAddOpen(false); }, 1800);
  }

  const statusBadge = (s: Employee["status"]) => ({
    active: "badge-in-stock",
    "on-leave": "badge-pending",
    inactive: "badge-out-of-stock",
  }[s]);

  return (
    <div data-testid="page-hr">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">HR Management</h2>
          <p className="text-sm text-white/40 mt-1">Employee directory, payroll & attendance</p>
        </div>
        <button onClick={() => setAddOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-sky-500/15 hover:bg-sky-500/25 text-sky-400 rounded-xl text-xs font-medium border border-sky-500/20 transition" data-testid="button-add-employee">
          <PlusCircle size={13} /> Add Employee
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="glass-card p-4 flex items-center gap-4">
          <div className="p-2.5 bg-sky-500/15 rounded-xl"><Users size={18} className="text-sky-400" /></div>
          <div>
            <p className="text-2xl font-bold text-white">{employees.length}</p>
            <p className="text-xs text-white/40">Total Staff</p>
          </div>
        </div>
        <div className="glass-card p-4 flex items-center gap-4">
          <div className="p-2.5 bg-green-500/15 rounded-xl"><Clock size={18} className="text-green-400" /></div>
          <div>
            <p className="text-2xl font-bold text-white">{active}</p>
            <p className="text-xs text-white/40">Active Today</p>
          </div>
        </div>
        <div className="glass-card p-4 flex items-center gap-4">
          <div className="p-2.5 bg-yellow-500/15 rounded-xl"><Briefcase size={18} className="text-yellow-400" /></div>
          <div>
            <p className="text-2xl font-bold text-white">{onLeave}</p>
            <p className="text-xs text-white/40">On Leave</p>
          </div>
        </div>
        <div className="glass-card p-4 flex items-center gap-4">
          <div className="p-2.5 bg-violet-500/15 rounded-xl"><DollarSign size={18} className="text-violet-400" /></div>
          <div>
            <p className="text-xl font-bold text-white">৳{totalPayroll.toLocaleString()}</p>
            <p className="text-xs text-white/40">Monthly Payroll</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        {/* Employee Table */}
        <div className="lg:col-span-2 glass-card overflow-hidden">
          <div className="flex items-center gap-3 p-5 pb-4 border-b border-white/6">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search employee..." className="form-input w-full pl-8 pr-3 py-2 rounded-lg text-sm text-white placeholder-white/25" />
            </div>
            <span className="text-xs text-white/40">{filtered.length} of {employees.length}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table w-full">
              <thead>
                <tr>
                  <th className="text-left">Name</th>
                  <th className="text-left hidden md:table-cell">Role</th>
                  <th className="text-left hidden lg:table-cell">Dept</th>
                  <th className="text-right hidden lg:table-cell">Salary</th>
                  <th className="text-center hidden md:table-cell">Attendance</th>
                  <th className="text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(e => (
                  <tr key={e.id} className="cursor-pointer" onClick={() => setSelected(e)} data-testid={`row-employee-${e.id}`}>
                    <td>
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                          style={{ background: DEPT_COLORS[e.dept] || "#0ea5e9" }}>
                          {e.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm text-white font-medium">{e.name}</p>
                          <p className="text-[10px] text-white/40">{e.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-white/70 text-xs hidden md:table-cell">{e.role}</td>
                    <td className="hidden lg:table-cell">
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${DEPT_COLORS[e.dept] || "#0ea5e9"}20`, color: DEPT_COLORS[e.dept] || "#0ea5e9" }}>
                        {e.dept}
                      </span>
                    </td>
                    <td className="text-right text-white hidden lg:table-cell">৳{e.salary.toLocaleString()}</td>
                    <td className="text-center hidden md:table-cell">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-14 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${e.attendance}%`, background: e.attendance >= 90 ? "#22c55e" : e.attendance >= 75 ? "#f59e0b" : "#ef4444" }} />
                        </div>
                        <span className="text-xs text-white/60">{e.attendance}%</span>
                      </div>
                    </td>
                    <td className="text-center">
                      <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${statusBadge(e.status)}`}>
                        {e.status === "active" ? "Active" : e.status === "on-leave" ? "On Leave" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Attendance chart */}
        <div className="glass-card p-5">
          <h3 className="font-semibold text-white text-sm mb-1">Monthly Attendance</h3>
          <p className="text-xs text-white/40 mb-4">Present vs Absent (days)</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={attendanceData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "rgba(255,255,255,0.4)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "rgba(255,255,255,0.4)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "rgba(10,18,32,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "white", fontSize: 12 }} />
              <Bar dataKey="present" fill="#22c55e" radius={[3, 3, 0, 0]} opacity={0.8} />
              <Bar dataKey="absent" fill="#ef4444" radius={[3, 3, 0, 0]} opacity={0.7} />
            </BarChart>
          </ResponsiveContainer>
          {/* Payroll breakdown */}
          <div className="mt-4 space-y-2 border-t border-white/6 pt-4">
            <p className="text-xs font-semibold text-white/50 uppercase tracking-wider">Dept Payroll</p>
            {Object.entries(
              employees.reduce((acc, e) => { acc[e.dept] = (acc[e.dept] || 0) + e.salary; return acc; }, {} as Record<string, number>)
            ).map(([dept, total]) => (
              <div key={dept} className="flex justify-between text-xs">
                <span style={{ color: DEPT_COLORS[dept] || "#0ea5e9" }}>{dept}</span>
                <span className="text-white/70">৳{total.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Employee Modal */}
      {addOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}>
          <div className="glass-panel p-6 w-full max-w-lg rounded-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-white">Add New Employee</h3>
              <button onClick={() => setAddOpen(false)} className="text-white/30 hover:text-white transition"><X size={18} /></button>
            </div>
            {added ? (
              <div className="flex flex-col items-center justify-center py-8 gap-3">
                <CheckCircle size={40} className="text-green-400" />
                <p className="text-white font-medium">Employee added successfully!</p>
              </div>
            ) : (
              <form onSubmit={handleAdd} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-white/60 mb-1.5">Full Name</label>
                    <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Employee full name" required className="form-input w-full py-2 px-3 rounded-lg text-sm text-white placeholder-white/25" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/60 mb-1.5">Job Role</label>
                    <input type="text" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} placeholder="e.g., Sales Manager" required className="form-input w-full py-2 px-3 rounded-lg text-sm text-white placeholder-white/25" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/60 mb-1.5">Department</label>
                    <select value={form.dept} onChange={e => setForm({ ...form, dept: e.target.value })} required className="form-input w-full py-2 px-3 rounded-lg text-sm text-white">
                      <option value="">Select dept</option>
                      <option value="Sales">Sales</option>
                      <option value="Finance">Finance</option>
                      <option value="HR">HR</option>
                      <option value="Operations">Operations</option>
                      <option value="IT">IT</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/60 mb-1.5">Monthly Salary (৳)</label>
                    <input type="number" value={form.salary} onChange={e => setForm({ ...form, salary: e.target.value })} placeholder="35000" required className="form-input w-full py-2 px-3 rounded-lg text-sm text-white placeholder-white/25" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/60 mb-1.5">Phone</label>
                    <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="01XXXXXXXXX" className="form-input w-full py-2 px-3 rounded-lg text-sm text-white placeholder-white/25" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/60 mb-1.5">Email</label>
                    <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="email@al-yamen.com" className="form-input w-full py-2 px-3 rounded-lg text-sm text-white placeholder-white/25" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/60 mb-1.5">Join Date</label>
                    <input type="date" value={form.joinDate} onChange={e => setForm({ ...form, joinDate: e.target.value })} className="form-input w-full py-2 px-3 rounded-lg text-sm text-white" />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setAddOpen(false)} className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/60 hover:text-white hover:bg-white/5 text-sm transition">Cancel</button>
                  <button type="submit" className="flex-1 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold transition shadow-lg shadow-sky-500/25">Add Employee</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Employee Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }} onClick={() => setSelected(null)}>
          <div className="glass-panel p-6 w-full max-w-sm rounded-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white" style={{ background: DEPT_COLORS[selected.dept] || "#0ea5e9" }}>
                  {selected.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{selected.name}</h3>
                  <p className="text-xs text-white/50">{selected.role}</p>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="text-white/30 hover:text-white transition"><X size={16} /></button>
            </div>
            <div className="space-y-2.5">
              {[
                { label: "Employee ID", val: selected.id },
                { label: "Department", val: selected.dept },
                { label: "Phone", val: selected.phone },
                { label: "Email", val: selected.email },
                { label: "Monthly Salary", val: `৳${selected.salary.toLocaleString()}` },
                { label: "Joined", val: selected.joinDate },
                { label: "Attendance", val: `${selected.attendance}%` },
              ].map(row => (
                <div key={row.label} className="flex justify-between py-2 border-b border-white/5 last:border-0">
                  <span className="text-xs text-white/40">{row.label}</span>
                  <span className="text-sm text-white">{row.val}</span>
                </div>
              ))}
            </div>
            <button onClick={() => setSelected(null)} className="w-full mt-5 py-2.5 rounded-xl border border-white/10 text-white/60 hover:text-white hover:bg-white/5 text-sm transition">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

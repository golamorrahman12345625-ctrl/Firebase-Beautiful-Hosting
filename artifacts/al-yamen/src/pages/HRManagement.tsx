import { Users, Clock, DollarSign } from "lucide-react";

const employees = [
  { id: "EMP-001", name: "Rahim Ahmed", role: "Sales Manager", dept: "Sales", salary: 45000, attendance: "95%", status: "active" },
  { id: "EMP-002", name: "Karim Hossain", role: "Accountant", dept: "Finance", salary: 38000, attendance: "98%", status: "active" },
  { id: "EMP-003", name: "Nasrin Akter", role: "HR Officer", dept: "HR", salary: 35000, attendance: "92%", status: "active" },
  { id: "EMP-004", name: "Faruk Ali", role: "Warehouse Manager", dept: "Operations", salary: 42000, attendance: "88%", status: "active" },
  { id: "EMP-005", name: "Sumaiya Begum", role: "Customer Support", dept: "Sales", salary: 30000, attendance: "96%", status: "on-leave" },
];

export default function HRManagement() {
  return (
    <div data-testid="page-hr">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">HR Management</h2>
        <p className="text-sm text-white/40 mt-1">Employee information and payroll</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="glass-card p-4 flex items-center gap-4">
          <div className="p-2.5 bg-sky-500/15 rounded-xl"><Users size={18} className="text-sky-400" /></div>
          <div>
            <p className="text-2xl font-bold text-white">{employees.length}</p>
            <p className="text-xs text-white/40">Total Employees</p>
          </div>
        </div>
        <div className="glass-card p-4 flex items-center gap-4">
          <div className="p-2.5 bg-green-500/15 rounded-xl"><Clock size={18} className="text-green-400" /></div>
          <div>
            <p className="text-2xl font-bold text-white">{employees.filter(e => e.status === "active").length}</p>
            <p className="text-xs text-white/40">Active Today</p>
          </div>
        </div>
        <div className="glass-card p-4 flex items-center gap-4">
          <div className="p-2.5 bg-violet-500/15 rounded-xl"><DollarSign size={18} className="text-violet-400" /></div>
          <div>
            <p className="text-2xl font-bold text-white">৳{employees.reduce((s, e) => s + e.salary, 0).toLocaleString()}</p>
            <p className="text-xs text-white/40">Monthly Payroll</p>
          </div>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-5 pb-4 border-b border-white/6">
          <h3 className="font-semibold text-white text-sm">Employee Directory</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table w-full">
            <thead>
              <tr>
                <th className="text-left">ID</th>
                <th className="text-left">Name</th>
                <th className="text-left">Role</th>
                <th className="text-left hidden md:table-cell">Department</th>
                <th className="text-right hidden lg:table-cell">Salary</th>
                <th className="text-center hidden md:table-cell">Attendance</th>
                <th className="text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(e => (
                <tr key={e.id} data-testid={`row-employee-${e.id}`}>
                  <td className="text-sky-400 font-mono text-xs">{e.id}</td>
                  <td className="text-white font-medium">{e.name}</td>
                  <td className="text-white/70 text-xs">{e.role}</td>
                  <td className="text-white/60 text-xs hidden md:table-cell">{e.dept}</td>
                  <td className="text-right text-white hidden lg:table-cell">৳{e.salary.toLocaleString()}</td>
                  <td className="text-center hidden md:table-cell">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-sky-400 rounded-full" style={{ width: e.attendance }} />
                      </div>
                      <span className="text-xs text-white/60">{e.attendance}</span>
                    </div>
                  </td>
                  <td className="text-center">
                    <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${e.status === "active" ? "badge-in-stock" : "badge-pending"}`}>
                      {e.status === "active" ? "Active" : "On Leave"}
                    </span>
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

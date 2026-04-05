import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Home, ArrowLeftRight, ShoppingCart, Package, Users, Calculator, Settings,
  ChevronDown, Box, LifeBuoy, Menu
} from "lucide-react";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path?: string;
  children?: { label: string; path: string }[];
}

const navItems: NavItem[] = [
  { icon: <Home size={16} />, label: "Dashboard", path: "/" },
  {
    icon: <ArrowLeftRight size={16} />, label: "Transactions",
    children: [
      { label: "Add Transaction", path: "/transactions/add" },
      { label: "All Transactions", path: "/transactions/all" },
      { label: "Recent Transactions", path: "/transactions/recent" },
    ]
  },
  {
    icon: <ShoppingCart size={16} />, label: "Sales & Orders",
    children: [
      { label: "New Order", path: "/sales/new-order" },
      { label: "Order History", path: "/sales/order-history" },
      { label: "Customer List", path: "/sales/customers" },
    ]
  },
  {
    icon: <Package size={16} />, label: "Inventory",
    children: [
      { label: "Add Product", path: "/inventory/add-product" },
      { label: "Stock List", path: "/inventory/stock-list" },
      { label: "Categories", path: "/inventory/categories" },
    ]
  },
  {
    icon: <Users size={16} />, label: "HR Management",
    children: [
      { label: "Employee Info", path: "/hr" },
      { label: "Payroll / Salary", path: "/hr" },
      { label: "Attendance", path: "/hr" },
    ]
  },
  {
    icon: <Calculator size={16} />, label: "Accounting",
    children: [
      { label: "Daily Ledger", path: "/accounting" },
      { label: "Expense Report", path: "/accounting" },
    ]
  },
  {
    icon: <Settings size={16} />, label: "Settings",
    children: [
      { label: "System Config", path: "/settings" },
      { label: "User Roles", path: "/settings" },
    ]
  },
];

function NavMenu({ item, isOpen, onToggle }: { item: NavItem; isOpen: boolean; onToggle: () => void }) {
  const [location] = useLocation();

  if (!item.children) {
    const isActive = location === item.path;
    return (
      <Link href={item.path || "/"}>
        <div className={`menu-btn ${isActive ? "active" : ""}`} data-testid={`nav-${item.label.toLowerCase().replace(/\s/g, "-")}`}>
          <div className="flex items-center gap-3">
            <span className="opacity-70">{item.icon}</span>
            <span>{item.label}</span>
          </div>
        </div>
      </Link>
    );
  }

  const isChildActive = item.children.some(c => location === c.path);

  return (
    <div>
      <div
        className={`menu-btn ${isChildActive ? "active" : ""}`}
        onClick={onToggle}
        data-testid={`nav-${item.label.toLowerCase().replace(/\s/g, "-")}`}
      >
        <div className="flex items-center gap-3">
          <span className="opacity-70">{item.icon}</span>
          <span>{item.label}</span>
        </div>
        <ChevronDown
          size={14}
          className="opacity-50 transition-transform duration-300"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </div>
      <div className={`sub-menu ${isOpen ? "open" : ""}`}>
        {item.children.map((child) => (
          <Link key={child.path + child.label} href={child.path}>
            <span
              className={`sub-link ${location === child.path ? "active" : ""}`}
              data-testid={`subnav-${child.label.toLowerCase().replace(/\s/g, "-")}`}
            >
              {child.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [openMenus, setOpenMenus] = useState<Set<string>>(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [location] = useLocation();

  const toggleMenu = (label: string) => {
    setOpenMenus(prev => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  const currentPage = navItems.find(item => {
    if (item.path === location) return true;
    return item.children?.some(c => c.path === location);
  });

  const currentPageLabel = currentPage?.children?.find(c => c.path === location)?.label || currentPage?.label || "Dashboard";

  return (
    <div className="flex h-screen w-screen bg-gradient-dark overflow-hidden" data-testid="layout">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl" />
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative z-30 flex flex-col h-full
          w-[270px] py-5 px-4 overflow-y-auto
          border-r border-white/8
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
        style={{ background: "rgba(10, 18, 32, 0.85)", backdropFilter: "blur(25px)" }}
        data-testid="sidebar"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="bg-sky-500 p-2.5 rounded-xl shadow-lg shadow-sky-500/25">
            <Box size={22} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-wider uppercase text-white">AL-YAMEN</h2>
            <p className="text-[10px] text-sky-400/70 tracking-widest">Management System</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <NavMenu
              key={item.label}
              item={item}
              isOpen={openMenus.has(item.label)}
              onToggle={() => toggleMenu(item.label)}
            />
          ))}
        </nav>

        {/* Support */}
        <div className="mt-6 p-4 glass-panel text-center">
          <p className="text-[10px] text-sky-400 font-bold uppercase tracking-widest mb-2">Support</p>
          <button
            className="text-xs bg-sky-500/15 hover:bg-sky-500/30 w-full py-2.5 rounded-xl border border-sky-500/25 transition text-sky-300"
            data-testid="button-contact-admin"
          >
            <LifeBuoy size={12} className="inline mr-1.5" />
            Contact Admin
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        {/* Header */}
        <header className="h-14 flex items-center justify-between px-4 lg:px-6 border-b border-white/8" style={{ background: "rgba(0,0,0,0.15)", backdropFilter: "blur(12px)" }}>
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition"
              onClick={() => setSidebarOpen(true)}
              data-testid="button-menu-toggle"
            >
              <Menu size={18} />
            </button>
            <h3 className="font-medium text-base text-white/90">{currentPageLabel}</h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-white">Prince Admin</p>
                <p className="text-[10px] text-sky-400/80">Super User</p>
              </div>
              <img
                src="https://ui-avatars.com/api/?name=Prince+Admin&background=0ea5e9&color=fff&bold=true"
                className="w-8 h-8 rounded-full border-2 border-sky-500/40"
                alt="Admin"
                data-testid="img-avatar"
              />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6" data-testid="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}

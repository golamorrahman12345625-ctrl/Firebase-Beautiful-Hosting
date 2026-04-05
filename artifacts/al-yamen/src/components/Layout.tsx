import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Home, ArrowLeftRight, ShoppingCart, Package, Users, Calculator, Settings,
  ChevronDown, Box, Menu, Bell, LogOut
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import NotificationsPanel from "./NotificationsPanel";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path?: string;
  children?: { label: string; path: string }[];
}

const NAV: NavItem[] = [
  { icon: <Home size={18} />, label: "Dashboard", path: "/" },
  {
    icon: <ArrowLeftRight size={18} />, label: "Transactions",
    children: [
      { label: "Add Transaction", path: "/transactions/add" },
      { label: "All Transactions", path: "/transactions/all" },
      { label: "Recent Transactions", path: "/transactions/recent" },
    ],
  },
  {
    icon: <ShoppingCart size={18} />, label: "Sales & Orders",
    children: [
      { label: "New Order", path: "/sales/new-order" },
      { label: "Order History", path: "/sales/order-history" },
      { label: "Customer List", path: "/sales/customers" },
    ],
  },
  {
    icon: <Package size={18} />, label: "Inventory",
    children: [
      { label: "Add Product", path: "/inventory/add-product" },
      { label: "Stock List", path: "/inventory/stock-list" },
      { label: "Categories", path: "/inventory/categories" },
    ],
  },
  { icon: <Users size={18} />, label: "HR Management", path: "/hr" },
  {
    icon: <Calculator size={18} />, label: "Accounting",
    children: [
      { label: "Overview", path: "/accounting" },
    ],
  },
  {
    icon: <Settings size={18} />, label: "Settings",
    children: [
      { label: "General", path: "/settings" },
    ],
  },
];

function isActive(path: string, location: string) {
  return location === path || (path !== "/" && location.startsWith(path));
}

function isGroupActive(children: { path: string }[], location: string) {
  return children.some(c => isActive(c.path, location));
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState<string[]>(() => {
    return NAV.filter(n => n.children && isGroupActive(n.children, location)).map(n => n.label);
  });
  const [notifOpen, setNotifOpen] = useState(false);
  const { unreadCount, logout } = useApp();

  function toggleMenu(label: string) {
    setOpenMenus(prev =>
      prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
    );
  }

  return (
    <div className="flex h-screen bg-gradient-dark overflow-hidden">
      {/* Sidebar */}
      <aside
        className="shrink-0 flex flex-col h-full transition-all duration-300 border-r border-white/[0.06] relative z-20"
        style={{
          width: sidebarOpen ? "264px" : "72px",
          background: "rgba(8,15,28,0.85)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8 px-4 pt-6">
          <div className="bg-sky-500 p-2.5 rounded-xl shadow-lg shadow-sky-500/25 shrink-0">
            <Box size={22} className="text-white" />
          </div>
          {sidebarOpen && (
            <div className="overflow-hidden">
              <h2 className="text-xl font-bold tracking-wider uppercase text-white whitespace-nowrap">AL-YAMEN</h2>
              <p className="text-[10px] text-sky-400/70 tracking-widest">Management System</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 space-y-1 scrollbar-thin">
          {NAV.map(item => {
            if (!item.children) {
              const active = isActive(item.path!, location);
              return (
                <Link key={item.label} href={item.path!}>
                  <button
                    title={!sidebarOpen ? item.label : undefined}
                    className={`menu-btn w-full ${active ? "active" : ""} ${!sidebarOpen ? "justify-center px-2" : ""}`}
                  >
                    <span className="shrink-0">{item.icon}</span>
                    {sidebarOpen && <span className="truncate">{item.label}</span>}
                  </button>
                </Link>
              );
            }

            const groupActive = isGroupActive(item.children, location);
            const isOpen = openMenus.includes(item.label);

            return (
              <div key={item.label}>
                <button
                  onClick={() => sidebarOpen ? toggleMenu(item.label) : setSidebarOpen(true)}
                  title={!sidebarOpen ? item.label : undefined}
                  className={`menu-btn w-full ${groupActive ? "active" : ""} ${!sidebarOpen ? "justify-center px-2" : ""}`}
                >
                  <span className="shrink-0">{item.icon}</span>
                  {sidebarOpen && (
                    <>
                      <span className="flex-1 text-left truncate">{item.label}</span>
                      <ChevronDown size={14} className={`transition-transform shrink-0 ${isOpen ? "rotate-180" : ""}`} />
                    </>
                  )}
                </button>
                {sidebarOpen && isOpen && (
                  <div className="ml-4 mt-1 space-y-0.5 border-l border-white/[0.07] pl-3">
                    {item.children.map(child => {
                      const childActive = isActive(child.path, location);
                      return (
                        <Link key={child.path} href={child.path}>
                          <button className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-all ${
                            childActive
                              ? "text-sky-400 bg-sky-500/10 font-medium"
                              : "text-white/50 hover:text-white/80 hover:bg-white/[0.04]"
                          }`}>
                            {child.label}
                          </button>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Support & Logout */}
        <div className="p-3 border-t border-white/[0.06] space-y-2">
          {sidebarOpen && (
            <div className="text-[10px] text-sky-400/60 font-semibold tracking-widest px-2 uppercase mb-1">Support</div>
          )}
          <button
            onClick={logout}
            title={!sidebarOpen ? "Logout" : undefined}
            className={`menu-btn w-full text-red-400/70 hover:text-red-400 hover:bg-red-500/10 ${!sidebarOpen ? "justify-center px-2" : ""}`}
            data-testid="button-logout"
          >
            <LogOut size={16} className="shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-16 shrink-0 flex items-center justify-between px-6 border-b border-white/[0.06]"
          style={{ background: "rgba(8,15,28,0.7)", backdropFilter: "blur(12px)" }}>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(v => !v)}
              className="text-white/40 hover:text-white/80 p-1.5 rounded-lg hover:bg-white/5 transition"
              data-testid="button-toggle-sidebar"
            >
              <Menu size={20} />
            </button>
            <span className="text-sm font-semibold text-white/80 capitalize">
              {NAV.flatMap(n => n.path ? [{ label: n.label, path: n.path }] : (n.children || []))
                .find(n => isActive(n.path, location))?.label ?? "Dashboard"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications bell */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(v => !v)}
                className="relative text-white/40 hover:text-white/80 p-2 rounded-lg hover:bg-white/5 transition"
                data-testid="button-notifications"
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-sky-400 rounded-full border border-background" />
                )}
              </button>
              <NotificationsPanel open={notifOpen} onClose={() => setNotifOpen(false)} />
            </div>

            {/* User avatar */}
            <div className="flex items-center gap-2.5 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-white leading-tight">Prince Admin</p>
                <p className="text-[10px] text-sky-400/70">Super User</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-500 to-violet-500 flex items-center justify-center text-sm font-bold text-white shadow-lg">
                PA
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

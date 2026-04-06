import { createContext, useContext, useState, useCallback } from "react";

export interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  type: "income" | "expense";
}

export interface Order {
  id: string;
  date: string;
  customer: string;
  phone: string;
  product: string;
  quantity: number;
  total: number;
  address: string;
  status: "delivered" | "pending" | "cancelled";
}

export interface StockItem {
  code: string;
  name: string;
  category: string;
  qty: number;
  price: number;
  status: "in-stock" | "low-stock" | "out-of-stock";
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "info" | "success" | "warning" | "error";
}

interface AppContextType {
  transactions: Transaction[];
  addTransaction: (t: Omit<Transaction, "id">) => void;
  removeTransaction: (id: number) => void;
  orders: Order[];
  addOrder: (o: Omit<Order, "id" | "date" | "status">) => void;
  updateOrderStatus: (id: string, status: Order["status"]) => void;
  stockItems: StockItem[];
  addStockItem: (s: Omit<StockItem, "code">) => void;
  updateStockItem: (code: string, s: Omit<StockItem, "code">) => void;
  removeStockItem: (code: string) => void;
  notifications: Notification[];
  markNotificationRead: (id: number) => void;
  markAllRead: () => void;
  unreadCount: number;
  isLoggedIn: boolean;
  login: (user: string, pass: string) => boolean;
  logout: () => void;
}

const defaultTransactions: Transaction[] = [
  { id: 1, date: "03/04/2026", description: "Monthly Salary", amount: 50000, type: "income" },
  { id: 2, date: "03/04/2026", description: "Internet Bill", amount: 1000, type: "expense" },
  { id: 3, date: "02/04/2026", description: "Freelancing Payment", amount: 5000, type: "income" },
  { id: 4, date: "02/04/2026", description: "Raw Materials", amount: 12000, type: "expense" },
  { id: 5, date: "01/04/2026", description: "Product Sales", amount: 28000, type: "income" },
  { id: 6, date: "01/04/2026", description: "Office Rent", amount: 8000, type: "expense" },
  { id: 7, date: "31/03/2026", description: "Wholesale Order", amount: 45000, type: "income" },
  { id: 8, date: "30/03/2026", description: "Electricity Bill", amount: 2500, type: "expense" },
];

const defaultOrders: Order[] = [
  { id: "#ORD-1001", date: "04/04/2026", customer: "Abdul Rahim", phone: "01711XXXXXX", product: "T-Shirt (2 pcs)", quantity: 2, total: 1000, address: "Mirpur, Dhaka", status: "delivered" },
  { id: "#ORD-1002", date: "03/04/2026", customer: "Karim Mia", phone: "01912XXXXXX", product: "Smartwatch (1 pc)", quantity: 1, total: 2500, address: "Dhanmondi, Dhaka", status: "pending" },
  { id: "#ORD-1003", date: "01/04/2026", customer: "Shafiqul Islam", phone: "01816XXXXXX", product: "Headphone (1 pc)", quantity: 1, total: 800, address: "Cumilla", status: "cancelled" },
  { id: "#ORD-1004", date: "01/04/2026", customer: "Nasrin Begum", phone: "01615XXXXXX", product: "Saree (2 pcs)", quantity: 2, total: 3200, address: "Chittagong", status: "delivered" },
  { id: "#ORD-1005", date: "31/03/2026", customer: "Rahim Ali", phone: "01519XXXXXX", product: "Three-Piece (1 pc)", quantity: 1, total: 1800, address: "Sylhet", status: "pending" },
];

const defaultStock: StockItem[] = [
  { code: "#P-001", name: "Cotton Saree", category: "Clothing", qty: 25, price: 800, status: "in-stock" },
  { code: "#P-002", name: "Leather Belt", category: "Accessories", qty: 5, price: 350, status: "low-stock" },
  { code: "#P-003", name: "Panjabi", category: "Clothing", qty: 0, price: 1200, status: "out-of-stock" },
  { code: "#P-004", name: "Gold Necklace", category: "Jewelry", qty: 12, price: 5500, status: "in-stock" },
  { code: "#P-005", name: "Foundation Cream", category: "Cosmetics", qty: 3, price: 450, status: "low-stock" },
  { code: "#P-006", name: "Three-Piece Set", category: "Clothing", qty: 18, price: 1800, status: "in-stock" },
];

const defaultNotifications: Notification[] = [
  { id: 1, title: "New Order", message: "Order #ORD-1006 placed by Sumaiya Begum", time: "2 min ago", read: false, type: "success" },
  { id: 2, title: "Low Stock Alert", message: "Foundation Cream is running low (3 units)", time: "1 hr ago", read: false, type: "warning" },
  { id: 3, title: "Payment Received", message: "৳2,500 received for order #ORD-1002", time: "3 hr ago", read: false, type: "info" },
  { id: 4, title: "Server Maintenance", message: "Scheduled maintenance tonight 12am-2am", time: "Yesterday", read: true, type: "info" },
  { id: 5, title: "Out of Stock", message: "Panjabi is now out of stock", time: "Yesterday", read: true, type: "error" },
];

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("al_yamen_auth") === "true";
  });
  const [transactions, setTransactions] = useState<Transaction[]>(defaultTransactions);
  const [orders, setOrders] = useState<Order[]>(defaultOrders);
  const [stockItems, setStockItems] = useState<StockItem[]>(defaultStock);
  const [notifications, setNotifications] = useState<Notification[]>(defaultNotifications);
  const [nextTxId, setNextTxId] = useState(9);
  const [nextOrdNum, setNextOrdNum] = useState(1006);
  const [nextStockNum, setNextStockNum] = useState(7);

  const login = useCallback((user: string, pass: string) => {
    if ((user === "admin" || user === "prince") && pass === "admin123") {
      setIsLoggedIn(true);
      localStorage.setItem("al_yamen_auth", "true");
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    localStorage.removeItem("al_yamen_auth");
  }, []);

  const addTransaction = useCallback((t: Omit<Transaction, "id">) => {
    setTransactions(prev => [{ ...t, id: nextTxId }, ...prev]);
    setNextTxId(n => n + 1);
    setNotifications(prev => [{
      id: Date.now(),
      title: t.type === "income" ? "Income Recorded" : "Expense Recorded",
      message: `${t.description}: ৳${t.amount.toLocaleString()}`,
      time: "Just now",
      read: false,
      type: t.type === "income" ? "success" : "info",
    }, ...prev]);
  }, [nextTxId]);

  const removeTransaction = useCallback((id: number) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  }, []);

  const addOrder = useCallback((o: Omit<Order, "id" | "date" | "status">) => {
    const id = `#ORD-${nextOrdNum}`;
    const today = new Date().toLocaleDateString("en-GB").replace(/\//g, "/");
    setOrders(prev => [{ ...o, id, date: today, status: "pending" }, ...prev]);
    setNextOrdNum(n => n + 1);
    setNotifications(prev => [{
      id: Date.now(),
      title: "New Order Placed",
      message: `${id} by ${o.customer} for ৳${o.total.toLocaleString()}`,
      time: "Just now",
      read: false,
      type: "success",
    }, ...prev]);
  }, [nextOrdNum]);

  const updateOrderStatus = useCallback((id: string, status: Order["status"]) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  }, []);

  const addStockItem = useCallback((s: Omit<StockItem, "code">) => {
    const code = `#P-${String(nextStockNum).padStart(3, "0")}`;
    setStockItems(prev => [{ ...s, code }, ...prev]);
    setNextStockNum(n => n + 1);
  }, [nextStockNum]);

  const updateStockItem = useCallback((code: string, s: Omit<StockItem, "code">) => {
    setStockItems(prev => prev.map(item => item.code === code ? { ...s, code } : item));
  }, []);

  const removeStockItem = useCallback((code: string) => {
    setStockItems(prev => prev.filter(item => item.code !== code));
  }, []);

  const markNotificationRead = useCallback((id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider value={{
      transactions, addTransaction, removeTransaction,
      orders, addOrder, updateOrderStatus,
      stockItems, addStockItem, updateStockItem, removeStockItem,
      notifications, markNotificationRead, markAllRead, unreadCount,
      isLoggedIn, login, logout,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

import { useState } from "react";
import { useLocation } from "wouter";
import { useApp } from "@/context/AppContext";
import { Eye, EyeOff, Box, AlertCircle } from "lucide-react";
import screenshot from "@assets/Screenshot_2026-04-06_234113_1775508084378.png";

export default function Login() {
  const { login } = useApp();
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    const ok = login(username.trim(), password);
    setLoading(false);
    if (!ok) {
      setError("Invalid credentials. Try admin / admin123");
    } else {
      setLocation("/");
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-gradient-dark relative overflow-hidden" data-testid="page-login">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-sky-500/6 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-violet-500/6 rounded-full blur-[80px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-sky-400/3 rounded-full blur-[60px]" />
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(rgba(14,165,233,1) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />
      </div>

      {/* Left panel - branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative">
        <div className="flex items-center gap-3">
          <div className="bg-sky-500 p-2.5 rounded-xl shadow-lg shadow-sky-500/30">
            <Box size={22} className="text-white" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-wider uppercase text-white">AL-YAMEN</span>
            <p className="text-[10px] text-sky-400/70 tracking-widest">Management System</p>
          </div>
        </div>

        <div className="relative mt-8 max-w-xl">
          <img
            src={screenshot}
            alt="Security scan issue screenshot"
            className="w-full rounded-2xl border border-white/10 shadow-2xl shadow-black/40"
          />
        </div>

        <div>
          <h1 className="text-5xl font-bold text-white leading-tight mb-6">
            Smart Business<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-violet-400">
              Management
            </span><br />
            Platform
          </h1>
          <p className="text-white/50 text-lg leading-relaxed max-w-md">
            Track transactions, manage inventory, handle orders and oversee your entire business from one beautiful dashboard.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-3 mt-8">
            {["Real-time Analytics", "Inventory Control", "Order Management", "HR & Payroll", "Financial Reports"].map(f => (
              <span key={f} className="px-3 py-1.5 rounded-full text-xs font-medium border border-sky-500/20 bg-sky-500/8 text-sky-300">
                {f}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            {["A","B","C","D"].map((l, i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-background flex items-center justify-center text-xs font-bold text-white"
                style={{ background: ["#0ea5e9","#8b5cf6","#22c55e","#f59e0b"][i] }}>
                {l}
              </div>
            ))}
          </div>
          <p className="text-sm text-white/40">Trusted by 200+ businesses across Bangladesh</p>
        </div>
      </div>

      {/* Right panel - login form */}
      <div className="flex-1 flex items-center justify-center p-6 relative">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <div className="bg-sky-500 p-2 rounded-xl shadow-lg shadow-sky-500/30">
              <Box size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-wider uppercase text-white">AL-YAMEN</span>
          </div>

          <div className="glass-panel p-8 md:p-10">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Welcome back</h2>
              <p className="text-sm text-white/40">Sign in to your admin dashboard</p>
            </div>

            {error && (
              <div className="flex items-center gap-3 p-3.5 rounded-xl mb-6 bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                <AlertCircle size={15} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="admin"
                  required
                  autoComplete="username"
                  className="form-input w-full py-3 px-4 rounded-xl text-sm text-white placeholder-white/20"
                  data-testid="input-username"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-white/60">Password</label>
                  <span className="text-xs text-sky-400/60 cursor-pointer hover:text-sky-400 transition">Forgot password?</span>
                </div>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                    className="form-input w-full py-3 pl-4 pr-11 rounded-xl text-sm text-white placeholder-white/20"
                    data-testid="input-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition p-1"
                    data-testid="button-toggle-password"
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-sky-500 hover:bg-sky-400 disabled:opacity-60 text-white rounded-xl font-semibold text-sm transition-all shadow-lg shadow-sky-500/30 mt-2 relative overflow-hidden"
                data-testid="button-login"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Signing in...
                  </span>
                ) : "Sign In"}
              </button>
            </form>

            <div className="mt-6 p-4 rounded-xl bg-white/3 border border-white/6">
              <p className="text-xs text-white/40 text-center mb-1">Demo credentials</p>
              <div className="flex justify-center gap-6 text-xs">
                <span className="text-white/50">Username: <span className="text-sky-400 font-mono">admin</span></span>
                <span className="text-white/50">Password: <span className="text-sky-400 font-mono">admin123</span></span>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-white/25 mt-6">
            &copy; 2026 AL-YAMEN Management System. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

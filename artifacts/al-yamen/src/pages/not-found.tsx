import { Link } from "wouter";
import { Home, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center" data-testid="page-not-found">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-amber-500/15 rounded-2xl">
            <AlertTriangle size={40} className="text-amber-400" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-white mb-3">404</h1>
        <h2 className="text-xl font-medium text-white/70 mb-2">Page Not Found</h2>
        <p className="text-sm text-white/40 mb-8">The page you are looking for does not exist.</p>
        <Link href="/">
          <span className="inline-flex items-center gap-2 px-6 py-3 bg-sky-500 hover:bg-sky-400 text-white rounded-xl font-semibold text-sm transition cursor-pointer" data-testid="link-home">
            <Home size={16} /> Back to Dashboard
          </span>
        </Link>
      </div>
    </div>
  );
}

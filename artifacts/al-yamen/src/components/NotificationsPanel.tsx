import { useRef, useEffect } from "react";
import { Bell, CheckCheck, Info, CheckCircle, AlertTriangle, XCircle, X } from "lucide-react";
import { useApp } from "@/context/AppContext";

const typeIcon = {
  info: <Info size={13} className="text-sky-400" />,
  success: <CheckCircle size={13} className="text-green-400" />,
  warning: <AlertTriangle size={13} className="text-yellow-400" />,
  error: <XCircle size={13} className="text-red-400" />,
};

const typeBg = {
  info: "bg-sky-500/10 border-sky-500/15",
  success: "bg-green-500/10 border-green-500/15",
  warning: "bg-yellow-500/10 border-yellow-500/15",
  error: "bg-red-500/10 border-red-500/15",
};

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function NotificationsPanel({ open, onClose }: Props) {
  const { notifications, markNotificationRead, markAllRead, unreadCount } = useApp();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    if (open) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className="absolute top-full right-0 mt-2 w-80 z-50 rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
      style={{ background: "rgba(10, 18, 32, 0.97)", backdropFilter: "blur(24px)" }}
      data-testid="notifications-panel"
    >
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
        <div className="flex items-center gap-2">
          <Bell size={14} className="text-sky-400" />
          <span className="font-semibold text-white text-sm">Notifications</span>
          {unreadCount > 0 && (
            <span className="bg-sky-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{unreadCount}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="text-[11px] text-sky-400 hover:text-sky-300 flex items-center gap-1 transition" data-testid="button-mark-all-read">
              <CheckCheck size={12} /> Mark all read
            </button>
          )}
          <button onClick={onClose} className="text-white/30 hover:text-white/60 transition ml-1" data-testid="button-close-notifications">
            <X size={14} />
          </button>
        </div>
      </div>

      <div className="max-h-[420px] overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="py-10 text-center text-white/30 text-sm">No notifications</div>
        ) : (
          notifications.map(n => (
            <div
              key={n.id}
              onClick={() => markNotificationRead(n.id)}
              className={`px-5 py-4 border-b border-white/5 cursor-pointer hover:bg-white/[0.03] transition ${!n.read ? "bg-white/[0.02]" : ""}`}
              data-testid={`notification-${n.id}`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 p-1.5 rounded-lg border ${typeBg[n.type]}`}>
                  {typeIcon[n.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <p className={`text-sm font-medium truncate ${!n.read ? "text-white" : "text-white/60"}`}>{n.title}</p>
                    {!n.read && <div className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />}
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed">{n.message}</p>
                  <p className="text-[10px] text-white/25 mt-1">{n.time}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

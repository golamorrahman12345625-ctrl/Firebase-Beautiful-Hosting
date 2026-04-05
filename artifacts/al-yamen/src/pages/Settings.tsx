import { useState } from "react";
import { Settings as SettingsIcon, Shield, Bell, Globe, User, Check } from "lucide-react";

export default function Settings() {
  const [saved, setSaved] = useState(false);
  const [notifications, setNotifications] = useState({ email: true, sms: false, push: true });
  const [profile, setProfile] = useState({ name: "Prince Admin", email: "admin@alyamen.com", company: "AL-YAMEN" });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div data-testid="page-settings">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Settings</h2>
        <p className="text-sm text-white/40 mt-1">System configuration and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Profile */}
        <div className="lg:col-span-2 glass-card p-6 space-y-5">
          <div className="flex items-center gap-2 mb-2">
            <User size={16} className="text-sky-400" />
            <h3 className="font-semibold text-white text-sm">Profile Settings</h3>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">Full Name</label>
            <input value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} className="form-input w-full py-2.5 px-3 rounded-lg text-sm text-white" data-testid="input-name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">Email Address</label>
            <input type="email" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} className="form-input w-full py-2.5 px-3 rounded-lg text-sm text-white" data-testid="input-email" />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">Company Name</label>
            <input value={profile.company} onChange={e => setProfile({ ...profile, company: e.target.value })} className="form-input w-full py-2.5 px-3 rounded-lg text-sm text-white" data-testid="input-company" />
          </div>

          {saved && (
            <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm">
              <Check size={14} /> Settings saved successfully!
            </div>
          )}

          <button onClick={handleSave} className="px-6 py-2.5 bg-sky-500 hover:bg-sky-400 text-white rounded-xl font-semibold text-sm transition shadow-lg shadow-sky-500/25" data-testid="button-save">
            Save Changes
          </button>
        </div>

        {/* Preferences */}
        <div className="space-y-4">
          {/* Notifications */}
          <div className="glass-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Bell size={14} className="text-sky-400" />
              <h3 className="font-semibold text-white text-sm">Notifications</h3>
            </div>
            <div className="space-y-3">
              {[
                { key: "email", label: "Email Alerts" },
                { key: "sms", label: "SMS Alerts" },
                { key: "push", label: "Push Notifications" },
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between">
                  <span className="text-sm text-white/70">{item.label}</span>
                  <button
                    onClick={() => setNotifications(n => ({ ...n, [item.key]: !n[item.key as keyof typeof n] }))}
                    className={`w-10 h-5.5 rounded-full transition relative ${notifications[item.key as keyof typeof notifications] ? "bg-sky-500" : "bg-white/10"}`}
                    style={{ height: "22px" }}
                    data-testid={`toggle-${item.key}`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${notifications[item.key as keyof typeof notifications] ? "translate-x-5" : "translate-x-0.5"}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Security */}
          <div className="glass-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Shield size={14} className="text-violet-400" />
              <h3 className="font-semibold text-white text-sm">Security</h3>
            </div>
            <button className="w-full py-2 text-sm text-white/60 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl border border-white/8 transition mb-2" data-testid="button-change-password">
              Change Password
            </button>
            <button className="w-full py-2 text-sm text-white/60 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl border border-white/8 transition" data-testid="button-2fa">
              Enable 2FA
            </button>
          </div>

          {/* Language */}
          <div className="glass-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Globe size={14} className="text-emerald-400" />
              <h3 className="font-semibold text-white text-sm">Language</h3>
            </div>
            <select className="form-input w-full py-2 px-3 rounded-lg text-sm text-white" data-testid="select-language">
              <option value="en">English</option>
              <option value="bn">বাংলা</option>
              <option value="ar">العربية</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

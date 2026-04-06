import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  User, 
  Bell, 
  Shield, 
  Moon, 
  HelpCircle, 
  ChevronRight,
  Check,
  Smartphone,
  Globe,
  Lock
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('English');

  const SettingItem = ({ icon: Icon, label, value, onClick, color }: any) => (
    <button 
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm active:scale-98 transition-all group"
    >
      <div className="flex items-center space-x-3">
        <div className={`w-10 h-10 ${color || 'bg-slate-50 text-slate-600'} rounded-xl flex items-center justify-center`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="text-left">
          <span className="text-sm font-bold text-slate-900 block">{label}</span>
          {value && <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{value}</span>}
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition-colors" />
    </button>
  );

  const ToggleItem = ({ icon: Icon, label, active, onToggle, color }: any) => (
    <div className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
      <div className="flex items-center space-x-3">
        <div className={`w-10 h-10 ${color || 'bg-slate-50 text-slate-600'} rounded-xl flex items-center justify-center`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-sm font-bold text-slate-900">{label}</span>
      </div>
      <button 
        onClick={onToggle}
        className={`w-12 h-6 rounded-full transition-colors relative ${active ? 'bg-indigo-600' : 'bg-slate-200'}`}
      >
        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${active ? 'left-7' : 'left-1'}`} />
      </button>
    </div>
  );

  return (
    <div className="space-y-6 pb-20">
      <header className="flex items-center space-x-4">
        <Link to="/profile" className="p-2 bg-white rounded-xl border border-slate-100 text-slate-400 hover:text-indigo-600 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-500 text-sm">Customize your Huntrix experience.</p>
        </div>
      </header>

      {/* Account Section */}
      <section className="space-y-3">
        <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Account</h2>
        <SettingItem 
          icon={User} 
          label="Edit Profile" 
          value="Personal information" 
          color="bg-indigo-50 text-indigo-600"
        />
        <SettingItem 
          icon={Lock} 
          label="Security" 
          value="Password & Auth" 
          color="bg-emerald-50 text-emerald-600"
        />
      </section>

      {/* Preferences Section */}
      <section className="space-y-3">
        <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Preferences</h2>
        <ToggleItem 
          icon={Bell} 
          label="Push Notifications" 
          active={notifications} 
          onToggle={() => setNotifications(!notifications)}
          color="bg-amber-50 text-amber-600"
        />
        <ToggleItem 
          icon={Moon} 
          label="Dark Mode" 
          active={darkMode} 
          onToggle={() => setDarkMode(!darkMode)}
          color="bg-slate-900 text-slate-100"
        />
        <SettingItem 
          icon={Globe} 
          label="Language" 
          value={language} 
          color="bg-blue-50 text-blue-600"
        />
      </section>

      {/* Support Section */}
      <section className="space-y-3">
        <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Support</h2>
        <SettingItem 
          icon={HelpCircle} 
          label="Help Center" 
          value="FAQs & Support" 
          color="bg-purple-50 text-purple-600"
        />
        <SettingItem 
          icon={Smartphone} 
          label="App Version" 
          value="v1.0.4 (Stable)" 
          color="bg-rose-50 text-rose-600"
        />
      </section>

      <div className="text-center pt-8 pb-4">
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
          Huntrix Sovereign • Made with ❤️
        </p>
      </div>
    </div>
  );
}

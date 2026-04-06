import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Heart, 
  Wallet, 
  Briefcase, 
  Users, 
  Bell,
  Menu,
  Search,
  User,
  BookOpen,
  Zap,
  FileText,
  Calendar,
  Loader2
} from 'lucide-react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from './firebase';
import Dashboard from './pages/Dashboard';
import Wellness from './pages/Wellness';
import Finance from './pages/Finance';
import Academics from './pages/Academics';
import StudentJobs from './pages/StudentJobs';
import CVBuilder from './pages/CVBuilder';
import Profile from './pages/Profile';
import Community from './pages/Community';
import Timetable from './pages/Timetable';
import Login from './pages/Login';

function NavItem({ to, icon: Icon, label, active }: { to: string, icon: any, label: string, active: boolean }) {
  return (
    <Link 
      to={to} 
      className={`flex flex-col items-center justify-center space-y-1 transition-all duration-300 ${
        active ? 'text-indigo-600 scale-110' : 'text-slate-400 hover:text-slate-600'
      }`}
    >
      <div className={`p-1 rounded-xl ${active ? 'bg-indigo-50' : ''}`}>
        <Icon className="w-6 h-6" />
      </div>
      <span className={`text-[8px] font-black uppercase tracking-widest ${active ? 'opacity-100' : 'opacity-60'}`}>
        {label}
      </span>
    </Link>
  );
}

function Layout({ children, user }: { children: React.ReactNode, user: FirebaseUser | null }) {
  const location = useLocation();
  
  if (!user) return <>{children}</>;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto relative shadow-2xl shadow-slate-200">
      {/* Top Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-lg">H</span>
          </div>
          <span className="font-black text-slate-900 tracking-tight text-lg">HUNTRIX</span>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 px-6 py-6 overflow-y-auto">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="sticky bottom-0 z-40 bg-white/90 backdrop-blur-lg border-t border-slate-100 px-2 py-3 flex justify-between items-center safe-area-bottom">
        <NavItem 
          to="/" 
          icon={LayoutDashboard} 
          label="Home" 
          active={location.pathname === '/'} 
        />
        <NavItem 
          to="/timetable" 
          icon={Calendar} 
          label="Schedule" 
          active={location.pathname === '/timetable'} 
        />
        <NavItem 
          to="/community" 
          icon={Users} 
          label="Hub" 
          active={location.pathname === '/community'} 
        />
        <NavItem 
          to="/student-jobs" 
          icon={Zap} 
          label="Jobs" 
          active={location.pathname === '/student-jobs'} 
        />
        <NavItem 
          to="/profile" 
          icon={User} 
          label="Profile" 
          active={location.pathname === '/profile'} 
        />
      </nav>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <Router>
      <Layout user={user}>
        <Routes>
          {!user ? (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/academics" element={<Academics />} />
              <Route path="/wellness" element={<Wellness />} />
              <Route path="/finance" element={<Finance />} />
              <Route path="/student-jobs" element={<StudentJobs />} />
              <Route path="/cv-builder" element={<CVBuilder />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/community" element={<Community />} />
              <Route path="/timetable" element={<Timetable />} />
              <Route path="/login" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>
      </Layout>
    </Router>
  );
}

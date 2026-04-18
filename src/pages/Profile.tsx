import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User as UserIcon, 
  Settings, 
  LogOut, 
  Award, 
  CheckCircle2, 
  Briefcase, 
  FileText, 
  ChevronRight, 
  Star, 
  ShieldCheck,
  Zap,
  Calendar,
  Users,
  AlertTriangle,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { auth, logout } from '../firebase';

export default function Profile() {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const user = auth.currentUser;
  const cvData = JSON.parse(localStorage.getItem('cv_draft') || '{}');
  const cvProgress = cvData.progress || 0;

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Your Profile</h1>
        <Link to="/settings" className="p-2 bg-slate-100 rounded-full text-slate-600 hover:bg-slate-200 transition-colors">
          <Settings className="w-5 h-5" />
        </Link>
      </header>

      {/* User Info Card */}
      <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 border-4 border-white shadow-xl overflow-hidden">
            {user?.photoURL ? (
              <img src={user.photoURL} alt={user.displayName || 'User'} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <UserIcon className="w-12 h-12" />
            )}
          </div>
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center text-white">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>
        <h2 className="text-xl font-black text-slate-900 tracking-tight">{user?.displayName || 'Student User'}</h2>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{user?.email}</p>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Computer Science • Year 3</p>
        
        <div className="flex space-x-3 w-full">
          <div className="flex-1 bg-slate-50 p-3 rounded-2xl">
            <span className="text-lg font-black text-slate-900 block">4.2</span>
            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">GPA</span>
          </div>
          <div className="flex-1 bg-slate-50 p-3 rounded-2xl">
            <span className="text-lg font-black text-slate-900 block">12</span>
            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Skills</span>
          </div>
          <div className="flex-1 bg-slate-50 p-3 rounded-2xl">
            <span className="text-lg font-black text-slate-900 block">85%</span>
            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Readiness</span>
          </div>
        </div>
      </section>

      {/* Career Readiness Progress */}
      <section className="bg-indigo-600 p-6 rounded-3xl text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center space-x-2 mb-1">
            <Zap className="w-4 h-4 text-indigo-200" />
            <span className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest">Career Readiness</span>
          </div>
          <h2 className="text-lg font-bold mb-4">Your CV is {cvProgress}% Complete</h2>
          
          <div className="w-full bg-indigo-700 h-2 rounded-full mb-6">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${cvProgress}%` }}
              className="bg-white h-full rounded-full" 
            />
          </div>
          
          <Link 
            to="/cv-builder"
            className="w-full py-3 bg-white text-indigo-600 rounded-xl text-xs font-bold flex items-center justify-center transition-all active:scale-95"
          >
            {cvProgress > 0 ? 'Continue Building' : 'Start Building CV'}
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <FileText className="absolute bottom-[-20px] right-[-20px] w-32 h-32 text-white/10 rotate-12" />
      </section>

      {/* Achievements / Badges */}
      <section>
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Recent Achievements</h2>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Fast Learner', icon: Zap, color: 'bg-amber-50 text-amber-600' },
            { label: 'Consistent', icon: CheckCircle2, color: 'bg-emerald-50 text-emerald-600' },
            { label: 'Pro CV', icon: Award, color: 'bg-indigo-50 text-indigo-600' },
          ].map((badge, i) => (
            <div key={i} className="flex flex-col items-center justify-center p-3 bg-white rounded-2xl border border-slate-100 shadow-sm text-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${badge.color}`}>
                <badge.icon className="w-5 h-5" />
              </div>
              <span className="text-[8px] font-bold text-slate-900 uppercase tracking-tighter leading-tight">{badge.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="space-y-2">
        <Link to="/student-jobs" className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm group">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-slate-900">Student Jobs</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition-colors" />
        </Link>
        <Link to="/timetable" className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm group">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-slate-900">My Timetable</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition-colors" />
        </Link>
        <Link to="/community" className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm group">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-slate-900">Student Hub</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition-colors" />
        </Link>
      </section>

      {/* Logout */}
      <button 
        onClick={() => setShowLogoutConfirm(true)}
        className="w-full py-4 bg-rose-50 text-rose-600 rounded-2xl font-bold flex items-center justify-center border border-rose-100 mt-4 active:scale-95 transition-all"
      >
        <LogOut className="w-5 h-5 mr-2" />
        Log Out
      </button>

      <div className="text-center pt-8 pb-4">
        <p className="text-[10px] text-indigo-600 font-black uppercase tracking-[0.2em]">
          Created by Team Huntrix
        </p>
      </div>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLogoutConfirm(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xs bg-white rounded-[2.5rem] p-8 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-rose-500" />
              
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500">
                  <AlertTriangle className="w-8 h-8" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">Wait, leaving?</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Are you sure you want to log out of your student hub?
                  </p>
                </div>

                <div className="w-full space-y-3 pt-2">
                  <button 
                    onClick={handleLogout}
                    className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-bold transition-all active:scale-95 shadow-lg shadow-rose-100"
                  >
                    Yes, Log Me Out
                  </button>
                  <button 
                    onClick={() => setShowLogoutConfirm(false)}
                    className="w-full py-4 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-2xl font-bold transition-all active:scale-95"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

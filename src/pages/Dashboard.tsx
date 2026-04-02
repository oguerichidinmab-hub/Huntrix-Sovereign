import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  CheckCircle2, 
  Circle, 
  TrendingUp, 
  Smile, 
  Frown, 
  Meh, 
  Plus,
  ArrowRight,
  Clock,
  Users
} from 'lucide-react';
import { Habit, MoodEntry } from '../types';
import { generateRoutine } from '../services/geminiService';

export default function Dashboard() {
  const [mood, setMood] = useState<MoodEntry | null>(null);
  const [habits, setHabits] = useState<Habit[]>([
    { id: '1', title: 'Morning Study Session', category: 'academic', completed: false, streak: 5 },
    { id: '2', title: 'Daily Budget Check', category: 'finance', completed: true, streak: 12 },
    { id: '3', title: '15min Meditation', category: 'wellness', completed: false, streak: 3 },
  ]);
  const [routine, setRoutine] = useState<any[]>([]);
  const [loadingRoutine, setLoadingRoutine] = useState(false);

  const toggleHabit = (id: string) => {
    setHabits(habits.map(h => h.id === id ? { ...h, completed: !h.completed } : h));
  };

  const handleMood = (m: MoodEntry['mood']) => {
    setMood({ id: Date.now().toString(), timestamp: new Date().toISOString(), mood: m });
  };

  const loadAIRoutine = async () => {
    setLoadingRoutine(true);
    try {
      const newRoutine = await generateRoutine("Computer Science student, 2nd year", "Improve coding skills and maintain mental health");
      setRoutine(newRoutine);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingRoutine(false);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Hello, Chidinma</h1>
          <p className="text-slate-500 text-sm">Thursday, March 19</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
          OC
        </div>
      </header>

      {/* Three Pillars Overview */}
      <section className="grid grid-cols-1 gap-4">
        {/* Academic Overview */}
        <Link to="/academics" className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group active:scale-98 transition-all">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-sm uppercase tracking-tight">Academic Overview</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">2 tasks due tomorrow</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 transition-colors" />
        </Link>

        {/* My Timetable */}
        <Link to="/timetable" className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group active:scale-98 transition-all">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-sm uppercase tracking-tight">My Timetable</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Check your free periods</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-amber-600 transition-colors" />
        </Link>

        {/* Student Hub */}
        <Link to="/community" className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group active:scale-98 transition-all">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-sm uppercase tracking-tight">Student Hub</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Connect with your tribe</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-purple-600 transition-colors" />
        </Link>

        {/* Financial Opportunities */}
        <Link to="/student-jobs" className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group active:scale-98 transition-all">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-sm uppercase tracking-tight">Student Jobs</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">5 new jobs around UniAbuja</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-600 transition-colors" />
        </Link>
      </section>

      {/* Career Readiness Card */}
      <section className="bg-indigo-600 p-6 rounded-3xl text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center space-x-2 mb-1">
            <CheckCircle2 className="w-4 h-4 text-indigo-200" />
            <span className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest">Career Readiness</span>
          </div>
          <h2 className="text-xl font-black mb-4">Your CV is 65% Complete</h2>
          
          <div className="w-full bg-indigo-700 h-2 rounded-full mb-6">
            <div className="bg-white h-full rounded-full" style={{ width: '65%' }} />
          </div>
          
          <Link 
            to="/cv-builder"
            className="w-full py-3 bg-white text-indigo-600 rounded-xl text-xs font-bold flex items-center justify-center transition-all active:scale-95"
          >
            Continue Building
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
        <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-indigo-400/20 rounded-full blur-3xl" />
      </section>

      {/* Daily Habits */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Daily Habits</h2>
          <button className="text-indigo-600 text-[10px] font-black uppercase tracking-widest flex items-center">
            View All <ArrowRight className="w-3 h-3 ml-1" />
          </button>
        </div>
        <div className="space-y-3">
          {habits.map((habit) => (
            <motion.div 
              key={habit.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleHabit(habit.id)}
              className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                {habit.completed ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                ) : (
                  <Circle className="w-6 h-6 text-slate-300" />
                )}
                <div>
                  <h3 className={`text-sm font-bold ${habit.completed ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
                    {habit.title}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-medium">{habit.streak} day streak</p>
                </div>
              </div>
              <div className={`w-2 h-2 rounded-full ${
                habit.category === 'academic' ? 'bg-indigo-400' : 
                habit.category === 'finance' ? 'bg-emerald-400' : 
                'bg-rose-400'
              }`} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* AI Routine */}
      <section className="bg-slate-900 text-white p-6 rounded-3xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-xs font-medium text-indigo-300 uppercase tracking-widest">AI Sovereign Coach</span>
          </div>
          <h2 className="text-xl font-bold mb-4">Personalized Routine</h2>
          
          {routine.length > 0 ? (
            <div className="space-y-4">
              {routine.slice(0, 3).map((item, index) => (
                <div key={index} className="flex items-start space-x-3 border-l-2 border-indigo-500/30 pl-4 py-1">
                  <span className="text-xs font-mono text-indigo-300">{item.time}</span>
                  <p className="text-sm font-medium">{item.activity}</p>
                </div>
              ))}
              <button 
                onClick={loadAIRoutine}
                className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-medium transition-colors"
              >
                Refresh Routine
              </button>
            </div>
          ) : (
            <div>
              <p className="text-slate-400 text-sm mb-4">Let AI generate a routine based on your current academic and personal goals.</p>
              <button 
                onClick={loadAIRoutine}
                disabled={loadingRoutine}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-sm font-bold transition-colors flex items-center justify-center"
              >
                {loadingRoutine ? 'Generating...' : 'Generate Daily Routine'}
              </button>
            </div>
          )}
        </div>
        {/* Abstract background shapes */}
        <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-10%] w-40 h-40 bg-purple-600/20 rounded-full blur-3xl" />
      </section>
    </div>
  );
}

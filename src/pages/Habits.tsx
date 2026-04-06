import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Circle, 
  Plus, 
  ArrowLeft,
  Search,
  Filter,
  TrendingUp,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Habit } from '../types';

export default function Habits() {
  const [habits, setHabits] = useState<Habit[]>([
    { id: '1', title: 'Morning Study Session', category: 'academic', completed: false, streak: 5 },
    { id: '2', title: 'Daily Budget Check', category: 'finance', completed: true, streak: 12 },
    { id: '3', title: '15min Meditation', category: 'wellness', completed: false, streak: 3 },
    { id: '4', title: 'Drink 2L Water', category: 'wellness', completed: true, streak: 8 },
    { id: '5', title: 'Review Lecture Notes', category: 'academic', completed: false, streak: 2 },
    { id: '6', title: 'No Impulse Spending', category: 'finance', completed: false, streak: 1 },
  ]);

  const toggleHabit = (id: string) => {
    setHabits(habits.map(h => h.id === id ? { ...h, completed: !h.completed } : h));
  };

  const categories = ['all', 'academic', 'finance', 'wellness'];
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredHabits = habits.filter(h => activeCategory === 'all' || h.category === activeCategory);

  return (
    <div className="space-y-6 pb-20">
      <header className="flex items-center space-x-4">
        <Link to="/" className="p-2 bg-white rounded-xl border border-slate-100 text-slate-400 hover:text-indigo-600 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Daily Habits</h1>
          <p className="text-slate-500 text-sm">Consistency is your superpower.</p>
        </div>
      </header>

      {/* Stats Overview */}
      <section className="grid grid-cols-2 gap-4">
        <div className="bg-indigo-600 p-5 rounded-3xl text-white shadow-lg shadow-indigo-100">
          <TrendingUp className="w-6 h-6 text-indigo-200 mb-2" />
          <h3 className="text-2xl font-bold">85%</h3>
          <p className="text-[10px] text-indigo-200 uppercase font-black tracking-widest">Completion Rate</p>
        </div>
        <div className="bg-emerald-600 p-5 rounded-3xl text-white shadow-lg shadow-emerald-100">
          <Award className="w-6 h-6 text-emerald-200 mb-2" />
          <h3 className="text-2xl font-bold">12</h3>
          <p className="text-[10px] text-emerald-200 uppercase font-black tracking-widest">Best Streak</p>
        </div>
      </section>

      {/* Filters */}
      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat) => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
              activeCategory === cat 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                : 'bg-white text-slate-400 border border-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Habits List */}
      <div className="space-y-3">
        {filteredHabits.map((habit) => (
          <motion.div 
            key={habit.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => toggleHabit(habit.id)}
            className="flex items-center justify-between p-5 bg-white rounded-2xl border border-slate-100 shadow-sm cursor-pointer hover:shadow-md transition-all"
          >
            <div className="flex items-center space-x-4">
              {habit.completed ? (
                <div className="w-8 h-8 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              ) : (
                <div className="w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                  <Circle className="w-6 h-6" />
                </div>
              )}
              <div>
                <h3 className={`text-sm font-bold ${habit.completed ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
                  {habit.title}
                </h3>
                <div className="flex items-center space-x-2 mt-0.5">
                  <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${
                    habit.category === 'academic' ? 'bg-indigo-50 text-indigo-600' : 
                    habit.category === 'finance' ? 'bg-emerald-50 text-emerald-600' : 
                    'bg-rose-50 text-rose-600'
                  }`}>
                    {habit.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">{habit.streak} day streak</span>
                </div>
              </div>
            </div>
            <Plus className="w-4 h-4 text-slate-300" />
          </motion.div>
        ))}
      </div>

      {/* Add Habit Button */}
      <button className="fixed bottom-24 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-xl shadow-indigo-200 flex items-center justify-center active:scale-90 transition-all z-40">
        <Plus className="w-8 h-8" />
      </button>
    </div>
  );
}

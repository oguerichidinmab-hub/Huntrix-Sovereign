import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  ArrowRight, 
  PieChart, 
  CreditCard, 
  DollarSign, 
  ShoppingBag, 
  Coffee, 
  BookOpen, 
  Bus,
  Zap,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { Transaction } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function Finance() {
  const [balance, setBalance] = useState(12500);
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', amount: 450, category: 'Food', type: 'expense', date: '2026-03-18', description: 'Lunch at Cafeteria' },
    { id: '2', amount: 1200, category: 'Transport', type: 'expense', date: '2026-03-17', description: 'Monthly Bus Pass' },
    { id: '3', amount: 5000, category: 'Allowance', type: 'income', date: '2026-03-15', description: 'Monthly Allowance' },
    { id: '4', amount: 300, category: 'Entertainment', type: 'expense', date: '2026-03-14', description: 'Movie Night' },
  ]);

  const data = [
    { name: 'Mon', amount: 450 },
    { name: 'Tue', amount: 1200 },
    { name: 'Wed', amount: 300 },
    { name: 'Thu', amount: 800 },
    { name: 'Fri', amount: 600 },
    { name: 'Sat', amount: 1500 },
    { name: 'Sun', amount: 200 },
  ];

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'food': return <Coffee className="w-4 h-4" />;
      case 'transport': return <Bus className="w-4 h-4" />;
      case 'allowance': return <DollarSign className="w-4 h-4" />;
      case 'books': return <BookOpen className="w-4 h-4" />;
      default: return <ShoppingBag className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Finance</h1>
          <p className="text-slate-500 text-sm">Track your student budget.</p>
        </div>
        <button className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
          <Plus className="w-6 h-6" />
        </button>
      </header>

      {/* Balance Card */}
      <section className="bg-emerald-600 p-6 rounded-3xl text-white shadow-lg shadow-emerald-100 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center space-x-2 mb-1">
            <Wallet className="w-4 h-4 text-emerald-200" />
            <span className="text-xs font-medium text-emerald-200 uppercase tracking-widest">Total Balance</span>
          </div>
          <h2 className="text-3xl font-bold mb-6">₦{balance.toLocaleString()}</h2>
          
          <div className="flex space-x-4">
            <div className="flex-1 bg-white/10 p-3 rounded-2xl">
              <div className="flex items-center space-x-1 mb-1">
                <TrendingUp className="w-3 h-3 text-emerald-300" />
                <span className="text-[10px] text-emerald-200 uppercase">Income</span>
              </div>
              <p className="text-sm font-bold">₦5,000</p>
            </div>
            <div className="flex-1 bg-white/10 p-3 rounded-2xl">
              <div className="flex items-center space-x-1 mb-1">
                <TrendingDown className="w-3 h-3 text-rose-300" />
                <span className="text-[10px] text-emerald-200 uppercase">Expenses</span>
              </div>
              <p className="text-sm font-bold">₦2,150</p>
            </div>
          </div>
        </div>
        <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-emerald-400/20 rounded-full blur-3xl" />
      </section>

      {/* Financial Support Pillars */}
      <section className="grid grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center group active:scale-95 transition-all">
          <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-3">
            <PieChart className="w-6 h-6" />
          </div>
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-tighter">Budgeting Basics</h3>
          <p className="text-[8px] text-slate-400 mt-1 font-bold uppercase tracking-widest">Master your money</p>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center group active:scale-95 transition-all">
          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-3">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-tighter">Side Hustles</h3>
          <p className="text-[8px] text-slate-400 mt-1 font-bold uppercase tracking-widest">Earn extra income</p>
        </div>
      </section>

      {/* Spending Chart */}
      <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Weekly Spending</h2>
          <div className="flex items-center space-x-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <Calendar className="w-3 h-3" />
            <span>Mar 13 - Mar 19</span>
          </div>
        </div>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 'bold' }} 
              />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', fontSize: '12px' }}
              />
              <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 5 ? '#10b981' : '#e2e8f0'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Side Hustle Ideas */}
      <section className="bg-indigo-900 p-6 rounded-3xl text-white relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-lg font-bold mb-2">Student Side Hustles</h2>
          <p className="text-indigo-200 text-xs mb-4 leading-relaxed">
            Need extra cash? Explore these student-friendly income ideas.
          </p>
          <div className="space-y-2">
            {[
              { title: 'Online Tutoring', pay: '₦5k - 15k/hr' },
              { title: 'Freelance Design', pay: '₦20k+ /project' },
              { title: 'Campus Delivery', pay: '₦500 - 2k /trip' },
            ].map((hustle, i) => (
              <div key={i} className="flex items-center justify-between bg-white/10 p-3 rounded-xl border border-white/10">
                <span className="text-xs font-bold">{hustle.title}</span>
                <span className="text-[10px] font-black text-indigo-300 uppercase">{hustle.pay}</span>
              </div>
            ))}
          </div>
        </div>
        <DollarSign className="absolute bottom-[-20px] right-[-20px] w-32 h-32 text-white/10 rotate-12" />
      </section>

      {/* Recent Transactions */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Recent Activity</h2>
          <button className="text-emerald-600 text-[10px] font-black uppercase tracking-widest flex items-center">
            View All <ArrowRight className="w-3 h-3 ml-1" />
          </button>
        </div>
        <div className="space-y-3">
          {transactions.map((t) => (
            <div key={t.id} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm transition-all active:scale-98">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  t.type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-600'
                }`}>
                  {getCategoryIcon(t.category)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{t.description}</h3>
                  <p className="text-[10px] text-slate-400 font-medium">{t.category} • {t.date}</p>
                </div>
              </div>
              <p className={`font-black text-sm ${t.type === 'income' ? 'text-emerald-600' : 'text-slate-900'}`}>
                {t.type === 'income' ? '+' : '-'}₦{t.amount.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Financial Support Tips */}
      <section className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100">
        <h2 className="text-sm font-bold text-emerald-900 uppercase tracking-wider mb-4">Financial Support Tips</h2>
        <div className="space-y-4">
          {[
            "Use student discounts whenever possible—always carry your ID.",
            "Track every expense for a week to see where your money goes.",
            "Consider buying used textbooks or using the library.",
            "Save a small portion of your allowance for emergencies."
          ].map((tip, i) => (
            <div key={i} className="flex items-start space-x-3">
              <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                <CheckCircle2 className="w-3 h-3" />
              </div>
              <p className="text-xs text-emerald-800 leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

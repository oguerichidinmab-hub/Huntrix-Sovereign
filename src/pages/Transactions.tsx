import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft,
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  Coffee,
  Bus,
  DollarSign,
  BookOpen,
  ShoppingBag,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Transaction } from '../types';

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', amount: 450, category: 'Food', type: 'expense', date: '2026-03-18', description: 'Lunch at Cafeteria' },
    { id: '2', amount: 1200, category: 'Transport', type: 'expense', date: '2026-03-17', description: 'Monthly Bus Pass' },
    { id: '3', amount: 5000, category: 'Allowance', type: 'income', date: '2026-03-15', description: 'Monthly Allowance' },
    { id: '4', amount: 300, category: 'Entertainment', type: 'expense', date: '2026-03-14', description: 'Movie Night' },
    { id: '5', amount: 2500, category: 'Books', type: 'expense', date: '2026-03-12', description: 'Calculus Textbook' },
    { id: '6', amount: 1500, category: 'Food', type: 'expense', date: '2026-03-10', description: 'Dinner with Friends' },
  ]);

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
      <header className="flex items-center space-x-4">
        <Link to="/finance" className="p-2 bg-white rounded-xl border border-slate-100 text-slate-400 hover:text-emerald-600 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Transactions</h1>
          <p className="text-slate-500 text-sm">Every naira counts.</p>
        </div>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
          <div className="flex items-center space-x-2 mb-1">
            <TrendingUp className="w-3 h-3 text-emerald-600" />
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Total Income</span>
          </div>
          <p className="text-lg font-black text-slate-900">₦5,000</p>
        </div>
        <div className="bg-rose-50 p-4 rounded-2xl border border-rose-100">
          <div className="flex items-center space-x-2 mb-1">
            <TrendingDown className="w-3 h-3 text-rose-600" />
            <span className="text-[10px] font-bold text-rose-600 uppercase tracking-widest">Total Spent</span>
          </div>
          <p className="text-lg font-black text-slate-900">₦6,450</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search transactions..."
          className="w-full bg-white border border-slate-100 rounded-2xl pl-12 pr-4 py-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* List */}
      <div className="space-y-3">
        {transactions.map((t) => (
          <motion.div 
            key={t.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm"
          >
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
          </motion.div>
        ))}
      </div>
    </div>
  );
}

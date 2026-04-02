import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Heart, 
  MessageCircle, 
  Sparkles, 
  Brain, 
  Wind, 
  Moon, 
  Sun,
  Send,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { getWellnessAdvice } from '../services/geminiService';

export default function Wellness() {
  const [note, setNote] = useState('');
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);

  const handleCheckIn = async () => {
    if (!note) return;
    setLoading(true);
    try {
      const resp = await getWellnessAdvice('neutral', note);
      setAdvice(resp);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Mental Wellness</h1>
        <p className="text-slate-500 text-sm">Your safe space for emotional growth.</p>
      </header>

      {/* Mood Check-in */}
      <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">How are you feeling?</h2>
        <div className="flex justify-between items-center">
          {[
            { emoji: '😔', label: 'Bad', color: 'bg-rose-50 text-rose-600' },
            { emoji: '😐', label: 'Neutral', color: 'bg-slate-50 text-slate-600' },
            { emoji: '🙂', label: 'Good', color: 'bg-emerald-50 text-emerald-600' },
            { emoji: '🤩', label: 'Great', color: 'bg-amber-50 text-amber-600' },
          ].map((m, i) => (
            <button key={i} className="flex flex-col items-center space-y-1 group">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all group-active:scale-90 ${m.color}`}>
                {m.emoji}
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{m.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* AI Wellness Coach */}
      <section className="bg-indigo-900 p-6 rounded-3xl text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold">Wellness Journal</h2>
              <p className="text-xs text-indigo-200">Share your thoughts freely.</p>
            </div>
          </div>

          <div className="space-y-4">
            <textarea 
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What's on your mind today?"
              className="w-full p-4 bg-white/10 rounded-2xl text-sm border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 min-h-[120px] placeholder:text-white/30"
            />
            <button 
              onClick={handleCheckIn}
              disabled={loading || !note}
              className="w-full py-3 bg-white text-indigo-900 disabled:bg-white/50 rounded-xl text-sm font-bold transition-all flex items-center justify-center active:scale-95"
            >
              {loading ? 'Processing...' : 'Save Entry'}
              <Send className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
        <Heart className="absolute top-[-20px] right-[-20px] w-32 h-32 text-white/5 rotate-12" />
      </section>

      {/* Calming Exercises */}
      <section>
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Calming Exercises</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: <Wind className="w-6 h-6 text-blue-500" />, title: 'Box Breathing', desc: '4-4-4-4 rhythm', color: 'bg-blue-50' },
            { icon: <Brain className="w-6 h-6 text-purple-500" />, title: 'Body Scan', desc: 'Relax each muscle', color: 'bg-purple-50' },
            { icon: <Moon className="w-6 h-6 text-indigo-500" />, title: 'Sleep Story', desc: 'Restful sleep', color: 'bg-indigo-50' },
            { icon: <Sun className="w-6 h-6 text-amber-500" />, title: 'Morning Affirm', desc: 'Start strong', color: 'bg-amber-50' },
          ].map((tool, i) => (
            <motion.div 
              key={i}
              whileTap={{ scale: 0.95 }}
              className={`${tool.color} p-5 rounded-3xl border border-white shadow-sm cursor-pointer hover:shadow-md transition-shadow`}
            >
              <div className="mb-3">{tool.icon}</div>
              <h3 className="font-bold text-slate-900 text-sm">{tool.title}</h3>
              <p className="text-[10px] text-slate-500 font-medium">{tool.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Wellness Tips */}
      <section className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Student Wellness Tips</h2>
        <div className="space-y-4">
          {[
            "Take a 5-minute break every hour of studying.",
            "Stay hydrated—your brain needs water to focus.",
            "It's okay to say no to social events if you're tired.",
            "Reach out to a friend if you're feeling lonely."
          ].map((tip, i) => (
            <div key={i} className="flex items-start space-x-3">
              <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 mt-0.5">
                <CheckCircle2 className="w-3 h-3" />
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Emergency Support */}
      <section className="bg-rose-50 p-5 rounded-2xl border border-rose-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-6 h-6 text-rose-500" />
            <div>
              <h3 className="font-bold text-rose-900 text-sm">Low Moment?</h3>
              <p className="text-[10px] text-rose-600">Immediate support is available.</p>
            </div>
          </div>
          <button 
            onClick={() => setShowEmergency(true)}
            className="px-4 py-2 bg-rose-500 text-white text-xs font-bold rounded-lg shadow-sm"
          >
            Help Now
          </button>
        </div>
      </section>

      {showEmergency && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center p-4">
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            className="bg-white w-full max-w-md rounded-t-[2.5rem] p-8 space-y-6"
          >
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-2" />
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-900">You're not alone.</h2>
              <p className="text-slate-500 text-sm mt-2">We're here to help you through this moment.</p>
            </div>
            
            <div className="space-y-3">
              <button className="w-full py-4 bg-rose-600 text-white rounded-2xl font-bold flex items-center justify-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                Call Campus Emergency
              </button>
              <button className="w-full py-4 bg-slate-100 text-slate-900 rounded-2xl font-bold flex items-center justify-center">
                <MessageCircle className="w-5 h-5 mr-2" />
                Text a Crisis Counselor
              </button>
              <button 
                onClick={() => setShowEmergency(false)}
                className="w-full py-4 text-slate-400 font-medium"
              >
                I'm feeling better now
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

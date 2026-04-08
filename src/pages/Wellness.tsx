import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  CheckCircle2,
  X,
  User,
  Bot
} from 'lucide-react';
import { getWellnessAdvice, chatWithFriend } from '../services/geminiService';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function Wellness() {
  const [note, setNote] = useState('');
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hey there! I\'m your AI friend. How are you feeling today? I\'m here to listen and support you. (I\'m not a professional counselor, but I\'m a great listener!)' }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (showChat) scrollToBottom();
  }, [messages, showChat]);

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

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const history = [...messages, userMsg];
      const response = await chatWithFriend(history);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm sorry, I'm having a bit of trouble connecting right now. But I'm still here for you!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Emotional Support</h1>
        <p className="text-slate-500 text-sm">A calm, safe space for your well-being.</p>
      </header>

      {/* Mood Check-in */}
      <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">How are you feeling right now?</h2>
        <div className="grid grid-cols-4 gap-2">
          {[
            { emoji: '😊', label: 'Happy', color: 'bg-emerald-50 text-emerald-600' },
            { emoji: '😔', label: 'Sad', color: 'bg-blue-50 text-blue-600' },
            { emoji: '😫', label: 'Stressed', color: 'bg-rose-50 text-rose-600' },
            { emoji: '🤯', label: 'Overwhelmed', color: 'bg-amber-50 text-amber-600' },
          ].map((m, i) => (
            <button key={i} className="flex flex-col items-center space-y-1 group">
              <div className={`w-full aspect-square rounded-2xl flex items-center justify-center text-2xl transition-all group-active:scale-90 ${m.color}`}>
                {m.emoji}
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{m.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Text a Friend AI Support */}
      <section className="bg-indigo-600 p-6 rounded-3xl text-white relative overflow-hidden shadow-xl shadow-indigo-100">
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <MessageCircle className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Text a Friend</h2>
              <p className="text-xs text-indigo-100">AI peer support, anytime.</p>
            </div>
          </div>
          <p className="text-sm text-indigo-50 mb-6 leading-relaxed">
            Need someone to talk to? Our AI friend is here to listen, encourage you, and help you find balance.
          </p>
          <button 
            onClick={() => setShowChat(true)}
            className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-bold flex items-center justify-center transition-all active:scale-95 shadow-lg"
          >
            Start Chatting
            <Sparkles className="w-4 h-4 ml-2" />
          </button>
        </div>
        <Heart className="absolute bottom-[-20px] right-[-20px] w-40 h-40 text-white/10 rotate-12" />
      </section>

      {/* Encouraging Message */}
      <section className="bg-amber-50 p-6 rounded-3xl border border-amber-100 text-center">
        <Sparkles className="w-8 h-8 text-amber-500 mx-auto mb-3" />
        <h3 className="text-amber-900 font-bold mb-1 italic">"You've survived 100% of your hardest days. You're doing better than you think."</h3>
        <p className="text-amber-700 text-[10px] font-bold uppercase tracking-widest">Daily Affirmation</p>
      </section>

      {/* Vent / Journal Section */}
      <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <Brain className="w-5 h-5 text-indigo-600" />
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Vent it Out</h2>
        </div>
        <textarea 
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write down what's bothering you. Let it all out..."
          className="w-full p-4 bg-slate-50 rounded-2xl text-sm border border-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[120px] mb-4"
        />
        <button 
          onClick={handleCheckIn}
          disabled={loading || !note}
          className="w-full py-3 bg-indigo-50 text-indigo-600 rounded-xl text-sm font-bold flex items-center justify-center active:scale-95 transition-all"
        >
          {loading ? 'Processing...' : 'Release & Get Advice'}
          <Send className="w-4 h-4 ml-2" />
        </button>
        {advice && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-indigo-50 rounded-2xl border border-indigo-100"
          >
            <p className="text-xs text-indigo-900 leading-relaxed italic">"{advice}"</p>
          </motion.div>
        )}
      </section>

      {/* Wellness Tips */}
      <section>
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Mental Health Tips</h2>
        <div className="grid grid-cols-1 gap-3">
          {[
            { title: 'The 5-4-3-2-1 Rule', desc: 'Ground yourself by noticing 5 things you see, 4 you feel, 3 you hear, 2 you smell, 1 you taste.', icon: <Sparkles className="w-4 h-4" /> },
            { title: 'Digital Detox', desc: 'Put your phone away 30 minutes before bed to improve sleep quality.', icon: <Moon className="w-4 h-4" /> },
            { title: 'Hydration & Focus', desc: 'Drinking water can reduce fatigue and help you think more clearly.', icon: <Wind className="w-4 h-4" /> },
          ].map((tip, i) => (
            <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 flex items-start space-x-3">
              <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                {tip.icon}
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">{tip.title}</h4>
                <p className="text-[10px] text-slate-500 leading-relaxed mt-0.5">{tip.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Emergency Support */}
      <section className="bg-rose-50 p-5 rounded-3xl border border-rose-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-6 h-6 text-rose-500" />
            <div>
              <h3 className="font-bold text-rose-900 text-sm">Need real support?</h3>
              <p className="text-[10px] text-rose-600">Professional help is always an option.</p>
            </div>
          </div>
          <button 
            onClick={() => setShowEmergency(true)}
            className="px-4 py-2 bg-rose-500 text-white text-xs font-bold rounded-xl shadow-sm"
          >
            Help Now
          </button>
        </div>
      </section>

      {/* AI Chat Modal */}
      <AnimatePresence>
        {showChat && (
          <div className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-md flex flex-col">
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="flex-1 bg-white mt-12 rounded-t-[3rem] flex flex-col overflow-hidden shadow-2xl"
            >
              {/* Chat Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600">
                    <Bot className="w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-900">Your AI Friend</h2>
                    <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest flex items-center">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5 animate-pulse" />
                      Always Listening
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowChat(false)}
                  className="p-2 bg-slate-100 rounded-xl text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
                {messages.map((msg, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-indigo-600 text-white rounded-tr-none shadow-lg shadow-indigo-100' 
                        : 'bg-white text-slate-700 rounded-tl-none shadow-sm border border-slate-100'
                    }`}>
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input */}
              <div className="p-6 bg-white border-t border-slate-100">
                <div className="flex items-center space-x-2">
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 bg-slate-50 border border-slate-100 rounded-2xl px-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button 
                    onClick={handleSendMessage}
                    disabled={!input.trim() || loading}
                    className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100 disabled:opacity-50 active:scale-90 transition-all"
                  >
                    <Send className="w-6 h-6" />
                  </button>
                </div>
                <p className="text-[9px] text-slate-400 text-center mt-4 uppercase font-bold tracking-widest">
                  Disclaimer: This is not a professional counselor.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Emergency Modal */}
      {showEmergency && (
        <div className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-end justify-center p-4">
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            className="bg-white w-full max-w-md rounded-t-[2.5rem] p-8 space-y-6"
          >
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-2" />
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-900">You're not alone.</h2>
              <p className="text-slate-500 text-sm mt-2">If you're in immediate danger or need professional help, please reach out.</p>
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

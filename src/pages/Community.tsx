import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  MessageSquare, 
  Send, 
  User, 
  Shield, 
  Info,
  Accessibility,
  Search,
  Plus,
  ArrowRight
} from 'lucide-react';
import { ChatMessage } from '../types';

const MOCK_GENERAL_MESSAGES: ChatMessage[] = [
  { id: '1', userId: 'u1', userName: 'Chidinma', userAvatar: 'https://picsum.photos/seed/u1/100', text: 'Hey everyone! Does anyone have the notes for CSC 201?', timestamp: '10:30 AM' },
  { id: '2', userId: 'u2', userName: 'Ibrahim', userAvatar: 'https://picsum.photos/seed/u2/100', text: 'Yeah, I have them. I\'ll upload them to the shared drive.', timestamp: '10:32 AM' },
  { id: '3', userId: 'u3', userName: 'Tunde', userAvatar: 'https://picsum.photos/seed/u3/100', text: 'Thanks Ibrahim! You\'re a lifesaver.', timestamp: '10:35 AM' },
];

const MOCK_PWD_MESSAGES: ChatMessage[] = [
  { id: '1', userId: 'u4', userName: 'Aisha', userAvatar: 'https://picsum.photos/seed/u4/100', text: 'The ramp at the library is finally fixed! ♿', timestamp: '09:15 AM', isPWD: true },
  { id: '2', userId: 'u5', userName: 'Emeka', userAvatar: 'https://picsum.photos/seed/u5/100', text: 'That\'s great news Aisha. It was really difficult using it last week.', timestamp: '09:20 AM', isPWD: true },
  { id: '3', userId: 'u6', userName: 'Admin', userAvatar: 'https://picsum.photos/seed/u6/100', text: 'We are working on making more buildings accessible. Please report any issues here.', timestamp: '09:45 AM' },
];

export default function Community() {
  const [activeTab, setActiveTab] = useState<'general' | 'pwd'>('general');
  const [message, setMessage] = useState('');
  const [generalMessages, setGeneralMessages] = useState(MOCK_GENERAL_MESSAGES);
  const [pwdMessages, setPwdMessages] = useState(MOCK_PWD_MESSAGES);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [generalMessages, pwdMessages, activeTab]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      userId: 'me',
      userName: 'Chidinma',
      userAvatar: 'https://picsum.photos/seed/me/100',
      text: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isPWD: activeTab === 'pwd'
    };

    if (activeTab === 'general') {
      setGeneralMessages([...generalMessages, newMessage]);
    } else {
      setPwdMessages([...pwdMessages, newMessage]);
    }
    setMessage('');
  };

  const currentMessages = activeTab === 'general' ? generalMessages : pwdMessages;
  const themeColor = activeTab === 'general' ? 'bg-indigo-600' : 'bg-slate-500';
  const textColor = activeTab === 'general' ? 'text-indigo-600' : 'text-slate-600';

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] pb-4">
      <header className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Student Hub</h1>
          <p className="text-slate-500 text-sm">Connect and support each other.</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
          <Users className="w-6 h-6" />
        </div>
      </header>

      {/* Tabs */}
      <div className="flex p-1 bg-slate-100 rounded-2xl mb-4">
        <button 
          onClick={() => setActiveTab('general')}
          className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
            activeTab === 'general' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-500'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>General Community</span>
        </button>
        <button 
          onClick={() => setActiveTab('pwd')}
          className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
            activeTab === 'pwd' ? 'bg-slate-700 text-white shadow-lg shadow-slate-200' : 'text-slate-500'
          }`}
        >
          <Accessibility className="w-4 h-4" />
          <span>PWD Support</span>
        </button>
      </div>

      {/* Chat Area */}
      <div className={`flex-1 flex flex-col rounded-3xl overflow-hidden border border-slate-100 shadow-sm ${
        activeTab === 'pwd' ? 'bg-slate-50' : 'bg-white'
      }`}>
        {/* Respectful Note */}
        <div className={`px-4 py-2 text-[10px] font-bold text-center uppercase tracking-widest border-b border-slate-100 flex items-center justify-center space-x-2 ${
          activeTab === 'pwd' ? 'bg-slate-200 text-slate-600' : 'bg-indigo-50 text-indigo-600'
        }`}>
          <Shield className="w-3 h-3" />
          <span>Keep it respectful and inclusive</span>
        </div>

        {/* Message List */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
        >
          <AnimatePresence initial={false}>
            {currentMessages.map((msg) => (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-start space-x-3 ${msg.userId === 'me' ? 'flex-row-reverse space-x-reverse' : ''}`}
              >
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-slate-100">
                  <img src={msg.userAvatar} alt={msg.userName} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </div>
                <div className={`max-w-[75%] ${msg.userId === 'me' ? 'items-end' : 'items-start'} flex flex-col`}>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-[10px] font-black text-slate-900 uppercase tracking-tight">{msg.userName}</span>
                    <span className="text-[8px] text-slate-400 font-bold uppercase">{msg.timestamp}</span>
                  </div>
                  <div className={`px-4 py-2 rounded-2xl text-sm leading-relaxed ${
                    msg.userId === 'me' 
                      ? `${themeColor} text-white rounded-tr-none shadow-md` 
                      : 'bg-white border border-slate-100 text-slate-800 rounded-tl-none shadow-sm'
                  } ${activeTab === 'pwd' ? 'font-medium tracking-wide' : ''}`}>
                    {msg.text}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-100">
          <div className="flex items-center space-x-2">
            <input 
              type="text" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={activeTab === 'pwd' ? "Type an accessible message..." : "Say something to the hub..."}
              className={`flex-1 px-4 py-3 bg-slate-50 rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                activeTab === 'pwd' ? 'focus:ring-slate-400' : 'focus:ring-indigo-500'
              }`}
            />
            <button 
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-white transition-all active:scale-95 disabled:opacity-50 ${themeColor}`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* PWD Info Note */}
      {activeTab === 'pwd' && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-slate-200 rounded-2xl flex items-start space-x-3 border border-slate-300"
        >
          <Info className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
          <p className="text-[10px] text-slate-700 font-bold leading-relaxed uppercase tracking-widest">
            This space is dedicated to students with disabilities. We use high-contrast design and clear fonts for better accessibility.
          </p>
        </motion.div>
      )}
    </div>
  );
}

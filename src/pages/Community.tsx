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
  
  const [generalMessages, setGeneralMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('hub_general_messages');
    return saved ? JSON.parse(saved) : MOCK_GENERAL_MESSAGES;
  });
  
  const [pwdMessages, setPwdMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('hub_pwd_messages');
    return saved ? JSON.parse(saved) : MOCK_PWD_MESSAGES;
  });
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('hub_general_messages', JSON.stringify(generalMessages));
  }, [generalMessages]);

  useEffect(() => {
    localStorage.setItem('hub_pwd_messages', JSON.stringify(pwdMessages));
  }, [pwdMessages]);

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
  const themeColor = activeTab === 'general' ? 'bg-indigo-600' : 'bg-[#075e54]';
  const textColor = activeTab === 'general' ? 'text-indigo-600' : 'text-[#075e54]';

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] pb-4">
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
      <div className="flex p-1 bg-slate-100 rounded-2xl mb-4 flex-shrink-0">
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
            activeTab === 'pwd' ? 'bg-[#075e54] text-white shadow-lg shadow-emerald-200' : 'text-slate-500'
          }`}
        >
          <Accessibility className="w-4 h-4" />
          <span>PWD Support</span>
        </button>
      </div>

      {/* Chat Area */}
      <div className={`flex-1 flex flex-col rounded-3xl overflow-hidden border border-slate-100 shadow-sm ${
        activeTab === 'pwd' ? 'bg-[#efeae2]' : 'bg-white'
      }`}>
        {/* Respectful Note */}
        <div className={`px-4 py-2 text-[10px] font-bold text-center uppercase tracking-widest border-b flex items-center justify-center space-x-2 ${
          activeTab === 'pwd' ? 'bg-[#075e54] text-white border-[#075e54]' : 'bg-indigo-50 text-indigo-600 border-slate-100'
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
                {activeTab === 'general' && (
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-slate-100">
                    <img src={msg.userAvatar} alt={msg.userName} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className={`max-w-[80%] ${msg.userId === 'me' ? 'items-end' : 'items-start'} flex flex-col`}>
                  {activeTab === 'general' && (
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-[10px] font-black text-slate-900 uppercase tracking-tight">{msg.userName}</span>
                      <span className="text-[8px] text-slate-400 font-bold uppercase">{msg.timestamp}</span>
                    </div>
                  )}
                  <div className={`px-4 py-2 text-sm leading-relaxed relative ${
                    activeTab === 'pwd' 
                      ? msg.userId === 'me'
                        ? 'bg-[#dcf8c6] text-slate-800 rounded-lg rounded-tr-none shadow-sm'
                        : 'bg-white text-slate-800 rounded-lg rounded-tl-none shadow-sm'
                      : msg.userId === 'me' 
                        ? `${themeColor} text-white rounded-2xl rounded-tr-none shadow-md` 
                        : 'bg-white border border-slate-100 text-slate-800 rounded-2xl rounded-tl-none shadow-sm'
                  }`}>
                    {activeTab === 'pwd' && msg.userId !== 'me' && (
                      <div className="text-[11px] font-bold text-[#075e54] mb-0.5">{msg.userName}</div>
                    )}
                    <span className="break-words">{msg.text}</span>
                    {activeTab === 'pwd' && (
                      <span className="text-[9px] text-slate-400 float-right mt-2 ml-3">{msg.timestamp}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Input Area */}
        <div className={`p-3 border-t ${activeTab === 'pwd' ? 'bg-[#f0f0f0] border-transparent' : 'bg-white border-slate-100'}`}>
          <div className="flex items-center space-x-2">
            <input 
              type="text" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={activeTab === 'pwd' ? "Type a message" : "Say something to the hub..."}
              className={`flex-1 px-4 py-3 text-sm focus:outline-none transition-all ${
                activeTab === 'pwd' 
                  ? 'bg-white rounded-full shadow-sm' 
                  : 'bg-slate-50 rounded-xl focus:ring-2 focus:ring-indigo-500'
              }`}
            />
            <button 
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className={`w-12 h-12 flex items-center justify-center text-white transition-all active:scale-95 disabled:opacity-50 ${
                activeTab === 'pwd' ? 'bg-[#00a884] rounded-full shadow-sm' : `${themeColor} rounded-xl`
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

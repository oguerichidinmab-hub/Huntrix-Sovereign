import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function WellnessFAB() {
  const location = useLocation();
  
  // Don't show on the wellness page itself or login
  if (location.pathname === '/wellness' || location.pathname === '/login') return null;

  return (
    <motion.div 
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-24 right-6 z-40"
    >
      <Link 
        to="/wellness"
        className="flex items-center space-x-2 bg-rose-500 text-white px-4 py-3 rounded-2xl shadow-xl shadow-rose-200 border border-rose-400 group"
      >
        <Heart className="w-5 h-5 fill-white group-hover:animate-pulse" />
        <span className="text-xs font-bold uppercase tracking-widest">Wellness</span>
      </Link>
    </motion.div>
  );
}

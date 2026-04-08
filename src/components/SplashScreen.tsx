import React from 'react';
import { motion } from 'motion/react';
import Logo from './Logo';

export default function SplashScreen() {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-6"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          duration: 0.8,
          ease: [0, 0.71, 0.2, 1.01],
          scale: {
            type: "spring",
            damping: 12,
            stiffness: 100,
            restDelta: 0.001
          }
        }}
        className="flex flex-col items-center space-y-6"
      >
        <Logo size="lg" className="flex-col space-x-0 space-y-4" />
        
        <div className="flex flex-col items-center space-y-2">
          <div className="w-48 h-1 bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="h-full bg-indigo-600 rounded-full"
            />
          </div>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em] animate-pulse">
            Loading Student Hub...
          </p>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-12 text-center"
      >
        <p className="text-[10px] text-indigo-600 font-black uppercase tracking-[0.2em]">
          Made by Team Huntrix
        </p>
      </motion.div>
    </motion.div>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogIn, ShieldCheck, Mail, Lock, User, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { loginWithGoogle, loginWithEmail, signUpWithEmail, resetPassword } from '../firebase';
import Logo from '../components/Logo';

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      if (isForgotPassword) {
        await resetPassword(email);
        setSuccess('Password reset email sent! Check your inbox.');
      } else if (isSignUp) {
        await signUpWithEmail(email, password, name);
      } else {
        await loginWithEmail(email, password);
      }
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm space-y-8"
      >
        <div className="flex flex-col items-center space-y-4">
          <Logo size="lg" className="flex-col space-x-0 space-y-4" />
          <p className="text-slate-500 font-medium">Empowering Student Success</p>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">
              {isForgotPassword ? 'Reset Password' : (isSignUp ? 'Create Account' : 'Welcome Back')}
            </h2>
            <p className="text-sm text-slate-500">
              {isForgotPassword 
                ? 'Enter your email to receive a reset link.' 
                : (isSignUp ? 'Join the UniAbuja student community.' : 'Sign in to access your student hub.')}
            </p>
          </div>

          <form onSubmit={handleEmailAuth} className="space-y-4 text-left">
            <AnimatePresence mode="wait">
              {isSignUp && !isForgotPassword && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-1"
                >
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Chidinma Ogueri"
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@uniabuja.edu.ng"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
            </div>

            {!isForgotPassword && (
              <div className="space-y-1">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Password</label>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>
              </div>
            )}

            {error && <p className="text-rose-500 text-[10px] font-bold text-center">{error}</p>}
            {success && (
              <div className="flex items-center justify-center space-x-2 text-emerald-600 bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                <CheckCircle2 className="w-4 h-4" />
                <p className="text-[10px] font-bold uppercase tracking-widest">{success}</p>
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold flex items-center justify-center transition-all active:scale-95 shadow-lg shadow-indigo-100 disabled:opacity-50"
            >
              {loading ? 'Processing...' : (isForgotPassword ? 'Send Reset Link' : (isSignUp ? 'Create Account' : 'Sign In'))}
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>

            {!isForgotPassword && (
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-100"></div>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
                  <span className="bg-white px-4 text-slate-400">Or continue with</span>
                </div>
              </div>
            )}

            {!isForgotPassword && (
              <button 
                type="button"
                onClick={async () => {
                  setError('');
                  setLoading(true);
                  try {
                    await loginWithGoogle();
                  } catch (err: any) {
                    setError(err.message || "Google login failed");
                  } finally {
                    setLoading(false);
                  }
                }}
                disabled={loading}
                className="w-full py-4 bg-white border border-slate-100 text-slate-600 rounded-2xl font-bold flex items-center justify-center transition-all active:scale-95 hover:bg-slate-50 disabled:opacity-50"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5 mr-3" alt="Google" />
                Google
              </button>
            )}

            {!isSignUp && !isForgotPassword && (
              <div className="text-center">
                <button 
                  type="button"
                  onClick={() => setIsForgotPassword(true)}
                  className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors"
                >
                  Forgot your password?
                </button>
              </div>
            )}
          </form>

          {isForgotPassword ? (
            <button 
              onClick={() => {
                setIsForgotPassword(false);
                setError('');
                setSuccess('');
              }}
              className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors flex items-center justify-center w-full"
            >
              <ArrowLeft className="w-3 h-3 mr-2" />
              Back to Sign In
            </button>
          ) : (
            <button 
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
                setSuccess('');
              }}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors block w-full text-center"
            >
              {isSignUp ? 'Already have an account? Sign In' : 'New student? Create an account'}
            </button>
          )}

          <div className="pt-4 border-t border-slate-100">
            <div className="flex items-center justify-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" />
              <span>Secure Student Authentication</span>
            </div>
            <p className="text-[10px] text-indigo-600 font-black uppercase tracking-[0.2em] mt-4">
              Created by Team Mauntra
            </p>
          </div>
        </div>

        <p className="text-[10px] text-slate-400 font-medium px-8 leading-relaxed">
          By signing in, you agree to our Terms of Service and Privacy Policy for University of Abuja students.
        </p>
      </motion.div>
    </div>
  );
}

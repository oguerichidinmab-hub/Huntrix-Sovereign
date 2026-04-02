import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Briefcase, 
  BookOpen, 
  Award, 
  FileText, 
  Plus, 
  ArrowRight, 
  Search, 
  Zap, 
  CheckCircle2, 
  Globe, 
  Code, 
  PenTool, 
  BarChart3
} from 'lucide-react';
import { Skill } from '../types';
import { getCareerAdvice } from '../services/geminiService';

export default function Career() {
  const [skills, setSkills] = useState<Skill[]>([
    { id: '1', name: 'Python Programming', level: 75 },
    { id: '2', name: 'Data Analysis', level: 60 },
    { id: '3', name: 'UI/UX Design', level: 45 },
    { id: '4', name: 'Public Speaking', level: 80 },
  ]);
  const [advice, setAdvice] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const loadCareerAdvice = async () => {
    setLoading(true);
    try {
      const resp = await getCareerAdvice(skills.map(s => s.name), "Computer Science");
      setAdvice(resp);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Career Readiness</h1>
          <p className="text-slate-500 text-sm">Prepare for your future career.</p>
        </div>
        <button className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
          <Plus className="w-6 h-6" />
        </button>
      </header>

      {/* CV Builder Card */}
      <section className="bg-blue-600 p-6 rounded-3xl text-white shadow-lg shadow-blue-100 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center space-x-2 mb-1">
            <FileText className="w-4 h-4 text-blue-200" />
            <span className="text-xs font-medium text-blue-200 uppercase tracking-widest">Sovereign CV Builder</span>
          </div>
          <h2 className="text-xl font-bold mb-4">Your CV is 65% Complete</h2>
          
          <div className="w-full bg-blue-700 h-2 rounded-full mb-6">
            <div className="bg-white h-full rounded-full" style={{ width: '65%' }} />
          </div>
          
          <button className="w-full py-3 bg-white text-blue-600 rounded-xl text-sm font-bold transition-all flex items-center justify-center">
            Continue Building
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
        <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-blue-400/20 rounded-full blur-3xl" />
      </section>

      {/* Skills Tracking */}
      <section className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Skills Tracking</h2>
          <button className="text-blue-600 text-xs font-medium">Add Skill</button>
        </div>
        <div className="space-y-4">
          {skills.map((skill) => (
            <div key={skill.id} className="space-y-1">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-700">{skill.name}</span>
                <span className="text-slate-400">{skill.level}%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full">
                <div 
                  className="bg-blue-500 h-full rounded-full transition-all duration-1000" 
                  style={{ width: `${skill.level}%` }} 
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Career Coach */}
      <section className="bg-slate-900 p-6 rounded-3xl text-white">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
            <Zap className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h2 className="font-bold">AI Career Coach</h2>
            <p className="text-xs text-slate-400">Personalized growth path.</p>
          </div>
        </div>

        {advice.length > 0 ? (
          <div className="space-y-3">
            {advice.map((item, i) => (
              <div key={i} className="flex items-start space-x-3 bg-white/5 p-3 rounded-xl border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5" />
                <p className="text-xs text-slate-300 leading-relaxed">{item}</p>
              </div>
            ))}
            <button 
              onClick={loadCareerAdvice}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-bold transition-colors mt-2"
            >
              Refresh Advice
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-xs text-slate-400 leading-relaxed">
              Based on your skills and major, I can suggest the next steps for your career development.
            </p>
            <button 
              onClick={loadCareerAdvice}
              disabled={loading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-bold transition-colors"
            >
              {loading ? 'Analyzing...' : 'Get Career Advice'}
            </button>
          </div>
        )}
      </section>

      {/* Opportunities */}
      <section>
        <h2 className="text-lg font-bold text-slate-900 mb-4">Recommended for You</h2>
        <div className="space-y-3">
          {[
            { title: 'Junior Python Developer', company: 'TechHub Africa', type: 'Internship', icon: <Code className="w-5 h-5 text-blue-500" />, color: 'bg-blue-50' },
            { title: 'Data Science Workshop', company: 'Google Students', type: 'Event', icon: <BarChart3 className="w-5 h-5 text-emerald-500" />, color: 'bg-emerald-50' },
            { title: 'Content Writing Role', company: 'StartupX', type: 'Part-time', icon: <PenTool className="w-5 h-5 text-purple-500" />, color: 'bg-purple-50' },
          ].map((job, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${job.color}`}>
                  {job.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{job.title}</h3>
                  <p className="text-[10px] text-slate-400">{job.company} • {job.type}</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

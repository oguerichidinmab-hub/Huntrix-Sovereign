import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Briefcase, 
  Globe, 
  Clock, 
  DollarSign, 
  ArrowRight, 
  GraduationCap, 
  Zap,
  CheckCircle2,
  X,
  FileText,
  Upload,
  Paperclip
} from 'lucide-react';
import { auth } from '../firebase';
import { JobOpportunity } from '../types';

const MOCK_OPPORTUNITIES: JobOpportunity[] = [
  {
    id: '1',
    title: 'Junior Web Developer',
    company: 'TechFlow Solutions',
    location: 'Remote',
    type: 'internship',
    description: 'Help build modern web applications using React and Tailwind CSS.',
    eligibility: 'CS students or self-taught developers with a portfolio.',
    category: 'tech',
    isVerified: true
  },
  {
    id: '2',
    title: 'Content Writing Intern',
    company: 'MediaPulse',
    location: 'Lagos, Nigeria',
    type: 'part-time',
    description: 'Create engaging content for our social media and blog.',
    eligibility: 'Excellent writing skills and interest in digital media.',
    category: 'marketing',
    isVerified: true
  },
  {
    id: '3',
    title: 'Graphic Design Freelance',
    company: 'BrandMasters',
    location: 'Remote',
    type: 'freelance',
    description: 'Design logos and marketing materials for various clients.',
    eligibility: 'Proficiency in Adobe Creative Suite or Figma.',
    category: 'design',
    isVerified: false
  },
  {
    id: '4',
    title: 'Customer Support Rep',
    company: 'QuickHelp',
    location: 'Remote',
    type: 'remote',
    description: 'Provide support to our global customer base via chat and email.',
    eligibility: 'Good communication skills and problem-solving ability.',
    category: 'support',
    isVerified: true
  },
  {
    id: '5',
    title: 'STEM Scholarship 2026',
    company: 'Future Leaders Foundation',
    location: 'Global',
    type: 'entry-level',
    description: 'Full tuition coverage for high-achieving STEM students.',
    eligibility: 'GPA 3.5+ and active community involvement.',
    category: 'scholarship',
    isVerified: true
  },
  {
    id: '6',
    title: 'Social Media Manager',
    company: 'GrowthHackers',
    location: 'Abuja, Nigeria',
    type: 'part-time',
    description: 'Manage and grow our social media presence.',
    eligibility: 'Experience with social media tools and analytics.',
    category: 'marketing',
    isVerified: false
  }
];

export default function Opportunities() {
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [applyingId, setApplyingId] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showForm, setShowForm] = useState<JobOpportunity | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        setFileError('File size exceeds 5MB limit.');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleApply = (op: JobOpportunity) => {
    if (op.applicationUrl) {
      window.open(op.applicationUrl, '_blank');
      return;
    }
    setShowForm(op);
  };

  const submitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    setApplyingId(showForm?.id || null);
    
    // Simulate API call
    setTimeout(() => {
      setApplyingId(null);
      setShowForm(null);
      setSelectedFile(null);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const filteredOpportunities = MOCK_OPPORTUNITIES.filter(op => {
    const matchesFilter = filter === 'all' || op.type === filter || op.category === filter;
    const matchesSearch = op.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         op.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-20 relative">
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-6 right-6 z-50 bg-emerald-600 text-white p-4 rounded-2xl shadow-xl flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-widest">Application Sent Successfully!</span>
            </div>
            <button onClick={() => setShowSuccess(false)}>
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Application Form Modal */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowForm(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[2.5rem] p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-indigo-600" />
              <button 
                onClick={() => setShowForm(null)}
                className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-6">
                <header className="text-center">
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">Apply for {showForm.title}</h3>
                  <p className="text-sm text-slate-500">{showForm.company}</p>
                </header>

                <form onSubmit={submitApplication} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                    <input 
                      required
                      type="text" 
                      defaultValue={auth.currentUser?.displayName || ''}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                    <input 
                      required
                      type="email" 
                      defaultValue={auth.currentUser?.email || ''}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Why are you a good fit?</label>
                    <textarea 
                      required
                      rows={4}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                      placeholder="Tell them about your skills and availability..."
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Upload CV (Optional)</label>
                    <div className="relative">
                      <input 
                        type="file" 
                        id="cv-upload"
                        className="hidden" 
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                      />
                      <label 
                        htmlFor="cv-upload"
                        className={`flex items-center justify-between w-full bg-slate-50 border border-dashed ${fileError ? 'border-rose-300 bg-rose-50' : 'border-slate-200'} rounded-2xl px-4 py-3 text-sm cursor-pointer hover:bg-slate-100 transition-colors`}
                      >
                        <div className="flex items-center space-x-2 text-slate-500">
                          <Upload className="w-4 h-4" />
                          <span className="truncate max-w-[200px]">
                            {selectedFile ? selectedFile.name : 'Choose a file...'}
                          </span>
                        </div>
                        {selectedFile && (
                          <button 
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              setSelectedFile(null);
                              setFileError(null);
                            }}
                            className="p-1 hover:bg-slate-200 rounded-full"
                          >
                            <X className="w-3 h-3 text-slate-400" />
                          </button>
                        )}
                      </label>
                    </div>
                    {fileError ? (
                      <p className="text-[10px] text-rose-500 ml-1 font-bold">{fileError}</p>
                    ) : (
                      <p className="text-[10px] text-slate-400 ml-1">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
                    )}
                  </div>

                  <div className="bg-indigo-50 p-4 rounded-2xl flex items-start space-x-3">
                    <Paperclip className="w-5 h-5 text-indigo-600 shrink-0" />
                    <p className="text-[10px] text-indigo-600 font-bold leading-relaxed">
                      {selectedFile ? 'Your uploaded CV will be sent.' : 'No file uploaded? Your Hub CV will be used instead.'}
                    </p>
                  </div>
                  <button 
                    type="submit"
                    disabled={applyingId === showForm.id}
                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold transition-all active:scale-95 shadow-lg shadow-indigo-100 flex items-center justify-center disabled:opacity-50"
                  >
                    {applyingId === showForm.id ? 'Sending...' : 'Submit Application'}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <header>
        <h1 className="text-2xl font-bold text-slate-900">Opportunities</h1>
        <p className="text-slate-500 text-sm">Find jobs, internships, and scholarships.</p>
      </header>

      {/* Search and Filter */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search roles or companies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-100 rounded-2xl pl-12 pr-4 py-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
          {['all', 'internship', 'part-time', 'freelance', 'remote', 'scholarship'].map((f) => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                filter === f ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-white text-slate-500 border border-slate-100'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Financial Support Tip */}
      <section className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 flex items-start space-x-3">
        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white shrink-0">
          <DollarSign className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-emerald-900">Financial Tip</h3>
          <p className="text-xs text-emerald-700 leading-relaxed">
            Freelancing can provide a flexible income while you study. Check out the freelance roles below!
          </p>
        </div>
      </section>

      {/* Opportunities List */}
      <div className="space-y-4">
        {filteredOpportunities.length > 0 ? filteredOpportunities.map((op, i) => (
          <motion.div 
            key={op.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-50 transition-colors">
                  {op.category === 'tech' ? <Zap className="w-6 h-6" /> : 
                   op.category === 'scholarship' ? <GraduationCap className="w-6 h-6" /> : 
                   <Briefcase className="w-6 h-6" />}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-slate-900 text-base">{op.title}</h3>
                    {op.isVerified && (
                      <div className="group/tooltip relative">
                        <div className="flex items-center space-x-1 bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded-full border border-emerald-100">
                          <CheckCircle2 className="w-3 h-3 fill-emerald-50" />
                          <span className="text-[8px] font-black uppercase tracking-tighter">Verified</span>
                        </div>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 text-white text-[10px] rounded-xl opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-normal w-48 text-center shadow-xl pointer-events-none z-50">
                          Verified jobs are reviewed and considered safe for students.
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900" />
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">{op.company}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                op.type === 'internship' ? 'bg-blue-50 text-blue-600' : 
                op.type === 'freelance' ? 'bg-purple-50 text-purple-600' : 
                op.type === 'scholarship' ? 'bg-amber-50 text-amber-600' : 
                'bg-emerald-50 text-emerald-600'
              }`}>
                {op.type}
              </span>
            </div>
            
            <p className="text-xs text-slate-600 mb-4 line-clamp-2 leading-relaxed">
              {op.description}
            </p>
            
            <div className="flex items-center space-x-4 mb-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <div className="flex items-center">
                <Globe className="w-3 h-3 mr-1" />
                {op.location}
              </div>
              <div className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                Posted 2d ago
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => handleApply(op)}
                className="flex-1 py-3 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-100 flex items-center justify-center group-hover:bg-indigo-700 transition-colors"
              >
                {op.applicationUrl ? 'Apply on Website' : 'Apply Now'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
              <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-indigo-600 transition-colors">
                <CheckCircle2 className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )) : (
          <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center">
            <p className="text-slate-400 text-sm">No opportunities found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Career Readiness Reminder */}
      <section className="bg-slate-900 p-6 rounded-3xl text-white">
        <h2 className="text-lg font-bold mb-2">Ready to Apply?</h2>
        <p className="text-slate-400 text-xs mb-4 leading-relaxed">
          Make sure your CV is up to date before applying to these roles.
        </p>
        <Link 
          to="/cv-builder"
          className="w-full py-3 bg-white text-slate-900 rounded-xl text-sm font-bold flex items-center justify-center"
        >
          Go to CV Builder
        </Link>
      </section>
    </div>
  );
}

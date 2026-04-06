import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  ArrowRight, 
  Zap,
  Building2,
  Globe,
  Monitor,
  CheckCircle2,
  X,
  FileText,
  Upload,
  Paperclip
} from 'lucide-react';
import { auth } from '../firebase';
import { StudentJob } from '../types';

const UNI_ABUJA_JOBS: StudentJob[] = [
  {
    id: '1',
    title: 'Library Assistant',
    company: 'UniAbuja Main Library',
    location: 'Main Campus, Gwagwalada',
    type: 'part-time',
    description: 'Assist in organizing books and helping students find resources.',
    eligibility: 'Current student with good organizational skills.',
    category: 'on-campus',
    estimatedHours: '10-15 hrs/week'
  },
  {
    id: '2',
    title: 'ICT Lab Assistant',
    company: 'Faculty of Science ICT',
    location: 'Mini Campus',
    type: 'part-time',
    description: 'Monitor lab usage and assist students with basic technical issues.',
    eligibility: 'Basic computer knowledge required.',
    category: 'on-campus',
    estimatedHours: '8-12 hrs/week'
  },
  {
    id: '3',
    title: 'POS Attendant',
    company: 'Campus Ventures',
    location: 'Nearby Gwagwalada',
    type: 'flexible',
    description: 'Manage daily transactions and provide cash services to students.',
    eligibility: 'Trustworthy and good at basic math.',
    category: 'off-campus',
    estimatedHours: '20 hrs/week'
  },
  {
    id: '4',
    title: 'Social Media Manager',
    company: 'Abuja Creatives',
    location: 'Remote',
    type: 'remote',
    description: 'Manage social media accounts for a local small business.',
    eligibility: 'Experience with Instagram and Twitter.',
    category: 'remote',
    estimatedHours: '5-10 hrs/week'
  },
  {
    id: '5',
    title: 'Private Tutor (Maths)',
    company: 'Home Lessons',
    location: 'Gwagwalada Area',
    type: 'flexible',
    description: 'Tutor secondary school students in Mathematics.',
    eligibility: 'Strong background in Mathematics.',
    category: 'off-campus',
    estimatedHours: '6 hrs/week'
  },
  {
    id: '6',
    title: 'Graphic Designer',
    company: 'Skill-Up Gigs',
    location: 'Remote',
    type: 'remote',
    description: 'Create flyers and logos for campus events.',
    eligibility: 'Proficiency in Canva or Photoshop.',
    category: 'skill-based',
    estimatedHours: 'Project-based'
  }
];

export default function StudentJobs() {
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [applyingId, setApplyingId] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showForm, setShowForm] = useState<StudentJob | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleApply = (job: StudentJob) => {
    if (job.applicationUrl) {
      window.open(job.applicationUrl, '_blank');
      return;
    }
    setShowForm(job);
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

  const filteredJobs = UNI_ABUJA_JOBS.filter(job => {
    const matchesFilter = filter === 'all' || job.category === filter;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         job.company.toLowerCase().includes(searchQuery.toLowerCase());
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
                        className="flex items-center justify-between w-full bg-slate-50 border border-dashed border-slate-200 rounded-2xl px-4 py-3 text-sm cursor-pointer hover:bg-slate-100 transition-colors"
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
                            }}
                            className="p-1 hover:bg-slate-200 rounded-full"
                          >
                            <X className="w-3 h-3 text-slate-400" />
                          </button>
                        )}
                      </label>
                    </div>
                    <p className="text-[10px] text-slate-400 ml-1">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
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
        <h1 className="text-2xl font-bold text-slate-900">Student Jobs</h1>
        <p className="text-slate-500 text-sm">Flexible roles around University of Abuja.</p>
      </header>

      {/* Search and Filter */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search jobs at UniAbuja..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-100 rounded-2xl pl-12 pr-4 py-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
          {[
            { id: 'all', label: 'All' },
            { id: 'on-campus', label: 'On-Campus' },
            { id: 'off-campus', label: 'Off-Campus' },
            { id: 'remote', label: 'Remote' }
          ].map((f) => (
            <button 
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                filter === f.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-white text-slate-500 border border-slate-100'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.length > 0 ? filteredJobs.map((job, i) => (
          <motion.div 
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-50 transition-colors">
                  {job.category === 'on-campus' ? <Building2 className="w-6 h-6" /> : 
                   job.category === 'remote' ? <Globe className="w-6 h-6" /> : 
                   <Briefcase className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{job.title}</h3>
                  <p className="text-xs text-slate-500">{job.company}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                job.type === 'part-time' ? 'bg-blue-50 text-blue-600' : 
                job.type === 'flexible' ? 'bg-purple-50 text-purple-600' : 
                'bg-emerald-50 text-emerald-600'
              }`}>
                {job.type}
              </span>
            </div>
            
            <p className="text-xs text-slate-600 mb-4 line-clamp-2 leading-relaxed">
              {job.description}
            </p>
            
            <div className="grid grid-cols-2 gap-2 mb-5">
              <div className="flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <MapPin className="w-3 h-3 mr-1" />
                <span className="truncate">{job.location}</span>
              </div>
              <div className="flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <Clock className="w-3 h-3 mr-1" />
                {job.estimatedHours}
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => handleApply(job)}
                className="flex-1 py-3 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-100 flex items-center justify-center group-hover:bg-indigo-700 transition-colors"
              >
                {job.applicationUrl ? 'Apply on Website' : 'Apply Now'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </motion.div>
        )) : (
          <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center">
            <p className="text-slate-400 text-sm">No jobs found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Career Readiness Reminder */}
      <section className="bg-slate-900 p-6 rounded-3xl text-white">
        <h2 className="text-lg font-bold mb-2">Academic Balance</h2>
        <p className="text-slate-400 text-xs mb-4 leading-relaxed">
          Check your timetable to ensure your work hours don't clash with your classes.
        </p>
        <Link 
          to="/timetable"
          className="w-full py-3 bg-white text-slate-900 rounded-xl text-sm font-bold flex items-center justify-center"
        >
          View My Timetable
        </Link>
      </section>
    </div>
  );
}

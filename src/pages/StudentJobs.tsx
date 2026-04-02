import React, { useState } from 'react';
import { motion } from 'motion/react';
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
  Monitor
} from 'lucide-react';
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

  const filteredJobs = UNI_ABUJA_JOBS.filter(job => {
    const matchesFilter = filter === 'all' || job.category === filter;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         job.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-20">
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
              <button className="flex-1 py-3 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-100 flex items-center justify-center group-hover:bg-indigo-700 transition-colors">
                Apply Now
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

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Upload, 
  ExternalLink, 
  CheckCircle2, 
  Briefcase, 
  AlertCircle,
  FileText,
  Plus
} from 'lucide-react';
import { TimetableEntry } from '../types';

const MOCK_TIMETABLE: TimetableEntry[] = [
  { id: '1', courseTitle: 'CSC 201: Introduction to Programming', time: '08:00 - 10:00', venue: 'Faculty of Science Hall 1', day: 'Monday' },
  { id: '2', courseTitle: 'GST 201: Peace and Conflict Resolution', time: '12:00 - 14:00', venue: 'General Studies Hall', day: 'Monday' },
  { id: '3', courseTitle: 'FREE PERIOD', time: '14:00 - 18:00', venue: 'Anywhere', day: 'Monday', isFree: true },
  { id: '4', courseTitle: 'MTH 201: Linear Algebra', time: '10:00 - 12:00', venue: 'Maths Lab', day: 'Tuesday' },
  { id: '5', courseTitle: 'FREE PERIOD', time: '08:00 - 10:00', venue: 'Anywhere', day: 'Tuesday', isFree: true },
  { id: '6', courseTitle: 'CSC 203: Data Structures', time: '14:00 - 16:00', venue: 'ICT Lab', day: 'Wednesday' },
  { id: '7', courseTitle: 'FREE PERIOD', time: '08:00 - 14:00', venue: 'Anywhere', day: 'Wednesday', isFree: true },
  { id: '8', courseTitle: 'PHY 201: General Physics II', time: '09:00 - 11:00', venue: 'Physics Lab', day: 'Thursday' },
  { id: '9', courseTitle: 'FREE PERIOD', time: '11:00 - 18:00', venue: 'Anywhere', day: 'Thursday', isFree: true },
  { id: '10', courseTitle: 'CSC 205: Computer Architecture', time: '10:00 - 12:00', venue: 'Faculty Hall 2', day: 'Friday' },
  { id: '11', courseTitle: 'FREE PERIOD', time: '12:00 - 18:00', venue: 'Anywhere', day: 'Friday', isFree: true },
];

export default function Timetable() {
  const [selectedDay, setSelectedDay] = useState<TimetableEntry['day']>('Monday');
  const [isAvailableForWork, setIsAvailableForWork] = useState(true);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const days: TimetableEntry['day'][] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const filteredTimetable = MOCK_TIMETABLE.filter(entry => entry.day === selectedDay);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Timetable</h1>
          <p className="text-slate-500 text-sm">Academic schedule & work availability.</p>
        </div>
        <div className="flex items-center space-x-2 bg-white p-1 rounded-full border border-slate-100 shadow-sm">
          <button 
            onClick={() => setIsAvailableForWork(!isAvailableForWork)}
            className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
              isAvailableForWork ? 'bg-emerald-500 text-white shadow-md shadow-emerald-100' : 'bg-slate-100 text-slate-400'
            }`}
          >
            {isAvailableForWork ? 'Available for Work' : 'Busy'}
          </button>
        </div>
      </header>

      {/* Upload Section */}
      <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Official Timetable</h2>
          <a 
            href="https://uniabuja.edu.ng" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-indigo-600 text-[10px] font-black uppercase tracking-widest flex items-center"
          >
            School Portal <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        </div>
        
        {!uploadedFile ? (
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 text-slate-400 mb-2" />
              <p className="text-xs text-slate-500 font-medium">Upload Image or PDF</p>
            </div>
            <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*,application/pdf" />
          </label>
        ) : (
          <div className="relative group">
            <div className="w-full h-48 bg-slate-100 rounded-2xl flex items-center justify-center overflow-hidden">
              <FileText className="w-12 h-12 text-slate-300" />
              <p className="absolute bottom-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Timetable Uploaded</p>
            </div>
            <button 
              onClick={() => setUploadedFile(null)}
              className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full text-rose-500 shadow-sm"
            >
              <Plus className="w-4 h-4 rotate-45" />
            </button>
          </div>
        )}
      </section>

      {/* Weekly View */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Weekly Schedule</h2>
        </div>
        
        <div className="flex space-x-2 overflow-x-auto pb-4 scrollbar-hide">
          {days.map((day) => (
            <button 
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedDay === day ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-white text-slate-500 border border-slate-100'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filteredTimetable.map((entry) => (
            <motion.div 
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-4 rounded-2xl border ${
                entry.isFree 
                  ? 'bg-emerald-50 border-emerald-100' 
                  : 'bg-white border-slate-100 shadow-sm'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    entry.isFree ? 'bg-emerald-100 text-emerald-600' : 'bg-indigo-50 text-indigo-600'
                  }`}>
                    {entry.isFree ? <CheckCircle2 className="w-5 h-5" /> : <Calendar className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className={`font-bold text-sm ${entry.isFree ? 'text-emerald-900' : 'text-slate-900'}`}>
                      {entry.courseTitle}
                    </h3>
                    <div className="flex items-center space-x-3 mt-1">
                      <div className="flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <Clock className="w-3 h-3 mr-1" />
                        {entry.time}
                      </div>
                      <div className="flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <MapPin className="w-3 h-3 mr-1" />
                        {entry.venue}
                      </div>
                    </div>
                  </div>
                </div>
                {entry.isFree && (
                  <span className="px-2 py-0.5 bg-emerald-500 text-white text-[8px] font-black uppercase rounded-md tracking-widest">
                    Free
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Work Opportunity CTA */}
      <section className="bg-slate-900 p-6 rounded-3xl text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-xs font-medium text-emerald-300 uppercase tracking-widest">Work Opportunity</span>
          </div>
          <h2 className="text-xl font-bold mb-2">Maximize Your Free Time</h2>
          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            You have several free periods this week. Why not earn some extra cash with a flexible student job?
          </p>
          <Link 
            to="/student-jobs"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-sm font-bold transition-colors flex items-center justify-center shadow-lg shadow-indigo-900"
          >
            Browse Student Jobs
            <Briefcase className="w-4 h-4 ml-2" />
          </Link>
        </div>
        <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-indigo-600/20 rounded-full blur-3xl" />
      </section>
    </div>
  );
}

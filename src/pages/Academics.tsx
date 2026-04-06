import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Target, 
  AlertCircle,
  ChevronRight,
  Info,
  CalendarDays,
  Flag,
  PenTool
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { AcademicTask, AcademicEvent } from '../types';

export default function Academics() {
  const [tasks, setTasks] = useState<AcademicTask[]>(() => {
    const saved = localStorage.getItem('academic_tasks');
    return saved ? JSON.parse(saved) : [
      { id: '1', title: 'Calculus Assignment 4', subject: 'Mathematics', dueDate: '2026-04-05', completed: false, type: 'assignment' },
      { id: '2', title: 'Midterm Exam', subject: 'Computer Science', dueDate: '2026-04-10', completed: false, type: 'exam' },
      { id: '3', title: 'Read Chapter 5-8', subject: 'History', dueDate: '2026-04-03', completed: true, type: 'study' },
    ];
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [events, setEvents] = useState<AcademicEvent[]>(() => {
    const saved = localStorage.getItem('academic_events');
    return saved ? JSON.parse(saved) : [
      { id: '1', title: 'Easter Break', date: '2026-04-03', type: 'holiday', description: 'Public holiday' },
      { id: '2', title: 'Course Registration Deadline', date: '2026-04-15', type: 'registration', description: 'Last day to register for courses' },
      { id: '3', title: 'Final Exam Period Starts', date: '2026-05-10', type: 'exam', description: 'Semester finals begin' },
      { id: '4', title: 'Matriculation Ceremony', date: '2026-04-20', type: 'other', description: 'New student orientation' },
    ];
  });

  const [newTask, setNewTask] = useState<Partial<AcademicTask>>({
    title: '',
    subject: '',
    dueDate: '',
    type: 'assignment',
    completed: false
  });

  const [newEvent, setNewEvent] = useState<Partial<AcademicEvent>>({
    title: '',
    date: '',
    type: 'other',
    description: ''
  });

  useEffect(() => {
    localStorage.setItem('academic_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('academic_events', JSON.stringify(events));
  }, [events]);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const addTask = () => {
    if (newTask.title && newTask.subject && newTask.dueDate) {
      const task: AcademicTask = {
        id: Date.now().toString(),
        title: newTask.title!,
        subject: newTask.subject!,
        dueDate: newTask.dueDate!,
        type: newTask.type as any,
        completed: false
      };
      setTasks([...tasks, task]);
      setShowAddModal(false);
      setNewTask({ title: '', subject: '', dueDate: '', type: 'assignment', completed: false });
    }
  };

  const addEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.type) {
      const event: AcademicEvent = {
        id: Date.now().toString(),
        title: newEvent.title!,
        date: newEvent.date!,
        type: newEvent.type as any,
        description: newEvent.description
      };
      setEvents([...events, event]);
      setShowAddEventModal(false);
      setNewEvent({ title: '', date: '', type: 'other', description: '' });
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'holiday': return <Flag className="w-4 h-4" />;
      case 'exam': return <PenTool className="w-4 h-4" />;
      case 'registration': return <CheckCircle2 className="w-4 h-4" />;
      case 'deadline': return <AlertCircle className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'holiday': return 'bg-emerald-50 text-emerald-600';
      case 'exam': return 'bg-rose-50 text-rose-600';
      case 'registration': return 'bg-indigo-50 text-indigo-600';
      case 'deadline': return 'bg-amber-50 text-amber-600';
      default: return 'bg-slate-50 text-slate-600';
    }
  };

  const upcomingTasks = tasks.filter(t => !t.completed).sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  const completedTasks = tasks.filter(t => t.completed);
  const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="space-y-6 pb-20">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Academic Support</h1>
          <p className="text-slate-500 text-sm">Stay on top of your studies.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200"
        >
          <Plus className="w-6 h-6" />
        </button>
      </header>

      {/* Productivity Dashboard */}
      <section className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mb-2">
            <Target className="w-5 h-5" />
          </div>
          <span className="text-2xl font-black text-slate-900">{tasks.length}</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Tasks</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-2">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <span className="text-2xl font-black text-slate-900">{completedTasks.length}</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Completed</span>
        </div>
      </section>

      {/* Upcoming Tasks */}
      <section>
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center">
          <Clock className="w-4 h-4 mr-2 text-indigo-600" />
          Upcoming Deadlines
        </h2>
        <div className="space-y-3">
          {upcomingTasks.length > 0 ? upcomingTasks.map(task => (
            <motion.div 
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => toggleTask(task.id)}
                  className="w-6 h-6 rounded-full border-2 border-slate-200 flex items-center justify-center text-transparent hover:border-indigo-400"
                >
                  <CheckCircle2 className="w-4 h-4" />
                </button>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{task.title}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full uppercase">{task.subject}</span>
                    <span className="text-[10px] text-slate-400 flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              {new Date(task.dueDate).getTime() - Date.now() < 86400000 * 2 && (
                <AlertCircle className="w-4 h-4 text-rose-500" />
              )}
            </motion.div>
          )) : (
            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center">
              <p className="text-slate-400 text-sm">No upcoming tasks. Take a break!</p>
            </div>
          )}
        </div>
      </section>

      {/* Academic Calendar */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center">
            <CalendarDays className="w-4 h-4 mr-2 text-indigo-600" />
            Academic Calendar
          </h2>
          <button 
            onClick={() => setShowAddEventModal(true)}
            className="text-[10px] font-black text-indigo-600 uppercase tracking-widest flex items-center"
          >
            <Plus className="w-3 h-3 mr-1" /> Add Event
          </button>
        </div>
        
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Important Dates & Deadlines</p>
          </div>
          <div className="divide-y divide-slate-50">
            {sortedEvents.map((event) => (
              <div key={event.id} className="p-4 flex items-start space-x-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${getEventColor(event.type)}`}>
                  {getEventIcon(event.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-bold text-slate-900">{event.title}</h3>
                    <span className="text-[10px] font-bold text-slate-400">{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                  {event.description && (
                    <p className="text-xs text-slate-500 mt-0.5">{event.description}</p>
                  )}
                  <div className="mt-2">
                    <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${getEventColor(event.type)}`}>
                      {event.type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Study Planner / Goals */}
      <section className="grid grid-cols-1 gap-4">
        <div className="bg-indigo-900 p-6 rounded-3xl text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-lg font-bold mb-2">Study Planner</h2>
            <p className="text-indigo-200 text-xs mb-4 leading-relaxed">
              Organize your study sessions and set subject goals to stay ahead.
            </p>
            <button className="px-4 py-2 bg-white text-indigo-900 rounded-xl text-xs font-bold flex items-center">
              Open Planner
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <BookOpen className="absolute bottom-[-20px] right-[-20px] w-32 h-32 text-white/10 rotate-12" />
        </div>

        <Link to="/timetable" className="bg-amber-500 p-6 rounded-3xl text-white relative overflow-hidden block">
          <div className="relative z-10">
            <h2 className="text-lg font-bold mb-2">My Timetable</h2>
            <p className="text-amber-100 text-xs mb-4 leading-relaxed">
              Check your class schedule and find free periods for work or rest.
            </p>
            <div className="px-4 py-2 bg-white text-amber-600 rounded-xl text-xs font-bold inline-flex items-center">
              View Schedule
              <Calendar className="w-4 h-4 ml-1" />
            </div>
          </div>
          <Calendar className="absolute bottom-[-20px] right-[-20px] w-32 h-32 text-white/10 -rotate-12" />
        </Link>
      </section>

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <section>
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Recently Completed</h2>
          <div className="space-y-2 opacity-60">
            {completedTasks.map(task => (
              <div key={task.id} className="bg-slate-50 p-3 rounded-xl flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span className="text-xs text-slate-500 line-through">{task.title}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl"
          >
            <h2 className="text-xl font-bold text-slate-900 mb-4">Add New Task</h2>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Title</label>
                <input 
                  type="text" 
                  value={newTask.title}
                  onChange={e => setNewTask({...newTask, title: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. Math Assignment"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Subject</label>
                <input 
                  type="text" 
                  value={newTask.subject}
                  onChange={e => setNewTask({...newTask, subject: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. Mathematics"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Due Date</label>
                  <input 
                    type="date" 
                    value={newTask.dueDate}
                    onChange={e => setNewTask({...newTask, dueDate: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Type</label>
                  <select 
                    value={newTask.type}
                    onChange={e => setNewTask({...newTask, type: e.target.value as any})}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="assignment">Assignment</option>
                    <option value="exam">Exam</option>
                    <option value="study">Study</option>
                    <option value="goal">Goal</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-3 pt-2">
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold"
                >
                  Cancel
                </button>
                <button 
                  onClick={addTask}
                  className="flex-1 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-100"
                >
                  Save Task
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Add Event Modal */}
      {showAddEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl"
          >
            <h2 className="text-xl font-bold text-slate-900 mb-4">Add Calendar Event</h2>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Event Title</label>
                <input 
                  type="text" 
                  value={newEvent.title}
                  onChange={e => setNewEvent({...newEvent, title: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. Semester Break"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Description (Optional)</label>
                <input 
                  type="text" 
                  value={newEvent.description}
                  onChange={e => setNewEvent({...newEvent, description: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. University wide holiday"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Date</label>
                  <input 
                    type="date" 
                    value={newEvent.date}
                    onChange={e => setNewEvent({...newEvent, date: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Type</label>
                  <select 
                    value={newEvent.type}
                    onChange={e => setNewEvent({...newEvent, type: e.target.value as any})}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="holiday">Holiday</option>
                    <option value="exam">Exam Period</option>
                    <option value="registration">Registration</option>
                    <option value="deadline">Deadline</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-3 pt-2">
                <button 
                  onClick={() => setShowAddEventModal(false)}
                  className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold"
                >
                  Cancel
                </button>
                <button 
                  onClick={addEvent}
                  className="flex-1 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-100"
                >
                  Save Event
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

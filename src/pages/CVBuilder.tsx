import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  FileText, 
  GraduationCap, 
  Briefcase, 
  Award, 
  Users, 
  Plus, 
  Trash2, 
  ArrowLeft, 
  ArrowRight, 
  Save, 
  Download,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Star
} from 'lucide-react';
import { CVData } from '../types';

const INITIAL_CV_DATA: CVData = {
  personalDetails: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    portfolio: ''
  },
  profileSummary: '',
  education: [],
  skills: [],
  experience: [],
  certifications: [],
  volunteerWork: [],
  references: [],
  lastSaved: new Date().toISOString(),
  progress: 0
};

const STEPS = [
  { id: 'personal', label: 'Personal', icon: User },
  { id: 'summary', label: 'Summary', icon: FileText },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'skills', label: 'Skills', icon: Star },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'certifications', label: 'Certs', icon: Award },
  { id: 'volunteer', label: 'Volunteer', icon: Users },
  { id: 'preview', label: 'Preview', icon: CheckCircle2 }
];

export default function CVBuilder() {
  const [cvData, setCvData] = useState<CVData>(() => {
    const saved = localStorage.getItem('cv_draft');
    return saved ? JSON.parse(saved) : INITIAL_CV_DATA;
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const calculateProgress = () => {
      let filledSteps = 0;
      if (cvData.personalDetails.fullName && cvData.personalDetails.email) filledSteps++;
      if (cvData.profileSummary) filledSteps++;
      if (cvData.education.length > 0) filledSteps++;
      if (cvData.skills.length > 0) filledSteps++;
      if (cvData.experience.length > 0) filledSteps++;
      if (cvData.certifications.length > 0) filledSteps++;
      if (cvData.volunteerWork.length > 0) filledSteps++;
      
      return Math.round((filledSteps / (STEPS.length - 1)) * 100);
    };

    const progress = calculateProgress();
    if (progress !== cvData.progress) {
      setCvData(prev => ({ ...prev, progress }));
    }
    
    localStorage.setItem('cv_draft', JSON.stringify(cvData));
  }, [cvData]);

  const handleSave = () => {
    setCvData(prev => ({ ...prev, lastSaved: new Date().toISOString() }));
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const renderStep = () => {
    switch (STEPS[currentStep].id) {
      case 'personal':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Personal Details</h2>
            <div className="grid gap-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Full Name</label>
                <input 
                  type="text" 
                  value={cvData.personalDetails.fullName}
                  onChange={e => setCvData({...cvData, personalDetails: {...cvData.personalDetails, fullName: e.target.value}})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm"
                  placeholder="e.g. John Doe"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Email</label>
                <input 
                  type="email" 
                  value={cvData.personalDetails.email}
                  onChange={e => setCvData({...cvData, personalDetails: {...cvData.personalDetails, email: e.target.value}})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm"
                  placeholder="e.g. john@example.com"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Phone</label>
                  <input 
                    type="tel" 
                    value={cvData.personalDetails.phone}
                    onChange={e => setCvData({...cvData, personalDetails: {...cvData.personalDetails, phone: e.target.value}})}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Location</label>
                  <input 
                    type="text" 
                    value={cvData.personalDetails.location}
                    onChange={e => setCvData({...cvData, personalDetails: {...cvData.personalDetails, location: e.target.value}})}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">LinkedIn (Optional)</label>
                <input 
                  type="url" 
                  value={cvData.personalDetails.linkedin}
                  onChange={e => setCvData({...cvData, personalDetails: {...cvData.personalDetails, linkedin: e.target.value}})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm"
                />
              </div>
            </div>
          </div>
        );
      case 'summary':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Profile Summary</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Briefly describe your background, key skills, and career goals.
            </p>
            <textarea 
              value={cvData.profileSummary}
              onChange={e => setCvData({...cvData, profileSummary: e.target.value})}
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-4 text-sm min-h-[200px]"
              placeholder="e.g. Ambitious Computer Science student with a passion for web development and problem-solving..."
            />
          </div>
        );
      case 'education':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900">Education</h2>
              <button 
                onClick={() => setCvData({...cvData, education: [...cvData.education, { id: Date.now().toString(), institution: '', degree: '', startDate: '', endDate: '' }]})}
                className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-6">
              {cvData.education.map((edu, index) => (
                <div key={edu.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm relative">
                  <button 
                    onClick={() => setCvData({...cvData, education: cvData.education.filter(e => e.id !== edu.id)})}
                    className="absolute top-4 right-4 text-rose-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="space-y-3">
                    <input 
                      type="text" 
                      placeholder="Institution"
                      value={edu.institution}
                      onChange={e => {
                        const newEdu = [...cvData.education];
                        newEdu[index].institution = e.target.value;
                        setCvData({...cvData, education: newEdu});
                      }}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-sm font-bold"
                    />
                    <input 
                      type="text" 
                      placeholder="Degree / Major"
                      value={edu.degree}
                      onChange={e => {
                        const newEdu = [...cvData.education];
                        newEdu[index].degree = e.target.value;
                        setCvData({...cvData, education: newEdu});
                      }}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-sm"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input 
                        type="text" 
                        placeholder="Start Date"
                        value={edu.startDate}
                        onChange={e => {
                          const newEdu = [...cvData.education];
                          newEdu[index].startDate = e.target.value;
                          setCvData({...cvData, education: newEdu});
                        }}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-xs"
                      />
                      <input 
                        type="text" 
                        placeholder="End Date"
                        value={edu.endDate}
                        onChange={e => {
                          const newEdu = [...cvData.education];
                          newEdu[index].endDate = e.target.value;
                          setCvData({...cvData, education: newEdu});
                        }}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-xs"
                      />
                    </div>
                  </div>
                </div>
              ))}
              {cvData.education.length === 0 && (
                <div className="text-center py-12 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                  <p className="text-slate-400 text-sm">Add your educational background.</p>
                </div>
              )}
            </div>
          </div>
        );
      case 'skills':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Skills</h2>
            <div className="flex space-x-2">
              <input 
                id="skill-input"
                type="text" 
                placeholder="Add a skill (e.g. Python)"
                className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const input = e.target as HTMLInputElement;
                    if (input.value) {
                      setCvData({...cvData, skills: [...cvData.skills, input.value]});
                      input.value = '';
                    }
                  }
                }}
              />
              <button 
                onClick={() => {
                  const input = document.getElementById('skill-input') as HTMLInputElement;
                  if (input.value) {
                    setCvData({...cvData, skills: [...cvData.skills, input.value]});
                    input.value = '';
                  }
                }}
                className="px-4 bg-indigo-600 text-white rounded-xl"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2 pt-4">
              {cvData.skills.map((skill, i) => (
                <div key={i} className="bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-full text-xs font-bold flex items-center">
                  {skill}
                  <button 
                    onClick={() => setCvData({...cvData, skills: cvData.skills.filter((_, index) => index !== i)})}
                    className="ml-2 text-indigo-300 hover:text-indigo-600"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'experience':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900">Experience</h2>
              <button 
                onClick={() => setCvData({...cvData, experience: [...cvData.experience, { id: Date.now().toString(), company: '', position: '', startDate: '', endDate: '', description: '' }]})}
                className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-6">
              {cvData.experience.map((exp, index) => (
                <div key={exp.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm relative">
                  <button 
                    onClick={() => setCvData({...cvData, experience: cvData.experience.filter(e => e.id !== exp.id)})}
                    className="absolute top-4 right-4 text-rose-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="space-y-3">
                    <input 
                      type="text" 
                      placeholder="Company"
                      value={exp.company}
                      onChange={e => {
                        const newExp = [...cvData.experience];
                        newExp[index].company = e.target.value;
                        setCvData({...cvData, experience: newExp});
                      }}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-sm font-bold"
                    />
                    <input 
                      type="text" 
                      placeholder="Position"
                      value={exp.position}
                      onChange={e => {
                        const newExp = [...cvData.experience];
                        newExp[index].position = e.target.value;
                        setCvData({...cvData, experience: newExp});
                      }}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-sm"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input 
                        type="text" 
                        placeholder="Start Date"
                        value={exp.startDate}
                        onChange={e => {
                          const newExp = [...cvData.experience];
                          newExp[index].startDate = e.target.value;
                          setCvData({...cvData, experience: newExp});
                        }}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-xs"
                      />
                      <input 
                        type="text" 
                        placeholder="End Date"
                        value={exp.endDate}
                        onChange={e => {
                          const newExp = [...cvData.experience];
                          newExp[index].endDate = e.target.value;
                          setCvData({...cvData, experience: newExp});
                        }}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-xs"
                      />
                    </div>
                    <textarea 
                      placeholder="Description of your roles and achievements..."
                      value={exp.description}
                      onChange={e => {
                        const newExp = [...cvData.experience];
                        newExp[index].description = e.target.value;
                        setCvData({...cvData, experience: newExp});
                      }}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-xs min-h-[80px]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'certifications':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900">Certifications</h2>
              <button 
                onClick={() => setCvData({...cvData, certifications: [...cvData.certifications, { id: Date.now().toString(), name: '', issuer: '', date: '' }]})}
                className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              {cvData.certifications.map((cert, index) => (
                <div key={cert.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm relative">
                  <button 
                    onClick={() => setCvData({...cvData, certifications: cvData.certifications.filter(c => c.id !== cert.id)})}
                    className="absolute top-4 right-4 text-rose-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="space-y-2">
                    <input 
                      type="text" 
                      placeholder="Certification Name"
                      value={cert.name}
                      onChange={e => {
                        const newCert = [...cvData.certifications];
                        newCert[index].name = e.target.value;
                        setCvData({...cvData, certifications: newCert});
                      }}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-sm font-bold"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input 
                        type="text" 
                        placeholder="Issuer"
                        value={cert.issuer}
                        onChange={e => {
                          const newCert = [...cvData.certifications];
                          newCert[index].issuer = e.target.value;
                          setCvData({...cvData, certifications: newCert});
                        }}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-xs"
                      />
                      <input 
                        type="text" 
                        placeholder="Date"
                        value={cert.date}
                        onChange={e => {
                          const newCert = [...cvData.certifications];
                          newCert[index].date = e.target.value;
                          setCvData({...cvData, certifications: newCert});
                        }}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-xs"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'volunteer':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900">Volunteer Work</h2>
              <button 
                onClick={() => setCvData({...cvData, volunteerWork: [...cvData.volunteerWork, { id: Date.now().toString(), organization: '', role: '', startDate: '', endDate: '', description: '' }]})}
                className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-6">
              {cvData.volunteerWork.map((vol, index) => (
                <div key={vol.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm relative">
                  <button 
                    onClick={() => setCvData({...cvData, volunteerWork: cvData.volunteerWork.filter(v => v.id !== vol.id)})}
                    className="absolute top-4 right-4 text-rose-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="space-y-3">
                    <input 
                      type="text" 
                      placeholder="Organization"
                      value={vol.organization}
                      onChange={e => {
                        const newVol = [...cvData.volunteerWork];
                        newVol[index].organization = e.target.value;
                        setCvData({...cvData, volunteerWork: newVol});
                      }}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-sm font-bold"
                    />
                    <input 
                      type="text" 
                      placeholder="Role"
                      value={vol.role}
                      onChange={e => {
                        const newVol = [...cvData.volunteerWork];
                        newVol[index].role = e.target.value;
                        setCvData({...cvData, volunteerWork: newVol});
                      }}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-sm"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input 
                        type="text" 
                        placeholder="Start Date"
                        value={vol.startDate}
                        onChange={e => {
                          const newVol = [...cvData.volunteerWork];
                          newVol[index].startDate = e.target.value;
                          setCvData({...cvData, volunteerWork: newVol});
                        }}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-xs"
                      />
                      <input 
                        type="text" 
                        placeholder="End Date"
                        value={vol.endDate}
                        onChange={e => {
                          const newVol = [...cvData.volunteerWork];
                          newVol[index].endDate = e.target.value;
                          setCvData({...cvData, volunteerWork: newVol});
                        }}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-xs"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'preview':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900">Preview CV</h2>
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl space-y-6 text-slate-800">
              <div className="border-b border-slate-100 pb-6">
                <h1 className="text-3xl font-black text-indigo-600 uppercase tracking-tighter">{cvData.personalDetails.fullName || 'Your Name'}</h1>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 mt-2 font-medium">
                  <span>{cvData.personalDetails.email}</span>
                  <span>{cvData.personalDetails.phone}</span>
                  <span>{cvData.personalDetails.location}</span>
                </div>
              </div>

              {cvData.profileSummary && (
                <section>
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-2">Profile</h3>
                  <p className="text-xs leading-relaxed text-slate-600">{cvData.profileSummary}</p>
                </section>
              )}

              {cvData.education.length > 0 && (
                <section>
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-3">Education</h3>
                  <div className="space-y-4">
                    {cvData.education.map(edu => (
                      <div key={edu.id}>
                        <h4 className="text-xs font-bold text-slate-900">{edu.institution}</h4>
                        <p className="text-[10px] text-slate-500">{edu.degree} • {edu.startDate} - {edu.endDate}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {cvData.skills.length > 0 && (
                <section>
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {cvData.skills.map((skill, i) => (
                      <span key={i} className="bg-slate-50 px-2 py-1 rounded text-[10px] font-bold text-slate-600 border border-slate-100">{skill}</span>
                    ))}
                  </div>
                </section>
              )}

              {cvData.experience.length > 0 && (
                <section>
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-3">Experience</h3>
                  <div className="space-y-4">
                    {cvData.experience.map(exp => (
                      <div key={exp.id}>
                        <h4 className="text-xs font-bold text-slate-900">{exp.position} @ {exp.company}</h4>
                        <p className="text-[10px] text-slate-500 mb-1">{exp.startDate} - {exp.endDate}</p>
                        <p className="text-[10px] text-slate-600 leading-relaxed">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
            
            <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center shadow-xl shadow-indigo-100">
              <Download className="w-5 h-5 mr-2" />
              Download PDF
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <header className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <button onClick={() => window.history.back()} className="p-2 bg-slate-100 rounded-full">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-900">CV Builder</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Step {currentStep + 1} of {STEPS.length}</p>
          </div>
        </div>
        <button 
          onClick={handleSave}
          className="p-2 bg-indigo-50 text-indigo-600 rounded-xl flex items-center space-x-2"
        >
          <Save className="w-5 h-5" />
          <span className="text-xs font-bold">Save</span>
        </button>
      </header>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-end">
          <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Overall Progress</span>
          <span className="text-lg font-black text-slate-900">{cvData.progress}%</span>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${cvData.progress}%` }}
            className="bg-indigo-600 h-full rounded-full"
          />
        </div>
      </div>

      {/* Step Navigation (Horizontal Icons) */}
      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
        {STEPS.map((step, index) => {
          const Icon = step.icon;
          const isActive = currentStep === index;
          const isCompleted = currentStep > index;
          
          return (
            <button 
              key={step.id}
              onClick={() => setCurrentStep(index)}
              className={`flex flex-col items-center justify-center min-w-[60px] p-2 rounded-2xl transition-all ${
                isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 
                isCompleted ? 'bg-emerald-50 text-emerald-600' : 'bg-white text-slate-300 border border-slate-100'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-[8px] font-bold uppercase tracking-tighter">{step.label}</span>
            </button>
          );
        })}
      </div>

      {/* Step Content */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Navigation */}
      <div className="flex space-x-4 pt-6 border-t border-slate-100">
        <button 
          onClick={prevStep}
          disabled={currentStep === 0}
          className={`flex-1 py-4 rounded-2xl font-bold flex items-center justify-center transition-all ${
            currentStep === 0 ? 'bg-slate-50 text-slate-300 cursor-not-allowed' : 'bg-slate-100 text-slate-600 active:scale-95'
          }`}
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back
        </button>
        <button 
          onClick={nextStep}
          disabled={currentStep === STEPS.length - 1}
          className={`flex-1 py-4 rounded-2xl font-bold flex items-center justify-center transition-all ${
            currentStep === STEPS.length - 1 ? 'bg-slate-50 text-slate-300 cursor-not-allowed' : 'bg-indigo-600 text-white shadow-xl shadow-indigo-100 active:scale-95'
          }`}
        >
          Next
          <ChevronRight className="w-5 h-5 ml-1" />
        </button>
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 left-6 right-6 z-50 bg-emerald-600 text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between"
          >
            <div className="flex items-center">
              <CheckCircle2 className="w-5 h-5 mr-3" />
              <span className="text-sm font-bold">Progress saved successfully!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

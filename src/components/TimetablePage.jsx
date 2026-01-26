import React, { useState, useEffect } from 'react';
import { FileText, Download, Eye, Calendar, Clock, X, Info } from 'lucide-react';

const TimetablePage = () => {
  const [activeTab, setActiveTab] = useState('view');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [currentMonthYear, setCurrentMonthYear] = useState('');

  useEffect(() => {
    // Formatting for Sri Lankan Time (Asia/Colombo)
    const updateTime = () => {
      const now = new Date();
      
      const timeString = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Colombo',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });

      const monthYearString = now.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
      });

      setCurrentTime(timeString);
      setCurrentMonthYear(monthYearString);
    };

    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  const pdfUrl = "/timetable.pdf";

  return (
    <section 
      id="Timetable" 
      className="py-32 scroll-mt-32 bg-[#f8fafc] px-6 min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-labelledby="timetable-title"
    >
      {/* Header Section - SEO: Semantic 1st level heading */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-full mb-6 border border-indigo-100">
           <Calendar size={14} className="text-indigo-600" />
           <span className="text-indigo-700 font-bold tracking-widest text-[10px] uppercase">Academic Calendar</span>
        </div>
        <h1 id="timetable-title" className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1a237e] mb-6 tracking-tight uppercase">
          Learning <span className="text-blue-600">Schedule</span>
        </h1>
        <p className="text-slate-500 max-w-xl mx-auto text-lg font-medium leading-relaxed">
          Stay synchronized with your academic journey. Access the most up-to-date class schedules for Sector Institute.
        </p>
      </div>

      <div className="max-w-5xl w-full bg-white rounded-[3rem] shadow-[0_30px_80px_rgba(26,35,126,0.08)] overflow-hidden border border-slate-100 relative">
        
        {/* Navigation Tabs - UX: Larger touch targets for mobile */}
        <nav className="flex bg-slate-50/50 p-3 gap-3 border-b border-slate-100" aria-label="Timetable options">
          <button 
            onClick={() => setActiveTab('view')}
            className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-widest transition-all duration-300 ${activeTab === 'view' ? 'bg-[#1a237e] text-white shadow-lg' : 'text-slate-400 hover:text-[#1a237e] hover:bg-white'}`}
          >
            <Eye size={18} /> <span className="hidden sm:inline">Interactive</span> Preview
          </button>
          <button 
            onClick={() => setActiveTab('download')}
            className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-widest transition-all duration-300 ${activeTab === 'download' ? 'bg-[#1a237e] text-white shadow-lg' : 'text-slate-400 hover:text-[#1a237e] hover:bg-white'}`}
          >
            <Download size={18} /> <span className="hidden sm:inline">Offline</span> Downloads
          </button>
        </nav>

        <div className="p-8 md:p-16">
          {activeTab === 'view' ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* Dynamic Info Cards - UI: Modern Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center gap-5 transition-transform hover:scale-[1.02]">
                  <div className="p-4 bg-white rounded-2xl text-[#1a237e] shadow-sm border border-slate-100"><Calendar size={24}/></div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1">Current Session</p>
                    <p className="text-[#1a237e] font-black text-lg">{currentMonthYear}</p>
                  </div>
                </div>
                <div className="p-6 bg-blue-50/50 rounded-[2rem] border border-blue-100 flex items-center gap-5 transition-transform hover:scale-[1.02]">
                  <div className="p-4 bg-white rounded-2xl text-blue-600 shadow-sm border border-blue-100"><Clock size={24}/></div>
                  <div>
                    <p className="text-[10px] text-blue-400 font-black uppercase tracking-[0.2em] mb-1">Last Update (SL Time)</p>
                    <p className="text-blue-900 font-black text-lg">Today, {currentTime}</p>
                  </div>
                </div>
              </div>

              {/* Functional Preview Area - UX: Improved Visual Feedback */}
              <div 
                onClick={() => setIsPreviewOpen(true)}
                className="relative aspect-[16/9] bg-slate-900 rounded-[2.5rem] flex flex-col items-center justify-center overflow-hidden group cursor-pointer shadow-2xl transition-all border-4 border-white ring-1 ring-slate-100"
              >
                <iframe 
                  src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`} 
                  className="absolute inset-0 w-full h-full opacity-40 grayscale group-hover:scale-110 transition-all duration-700 pointer-events-none"
                  title="Timetable Preview Frame"
                />
                
                <div className="relative z-10 flex flex-col items-center bg-white px-10 py-8 rounded-[2rem] shadow-2xl group-hover:scale-105 transition-transform duration-300">
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                    <Eye size={32} />
                  </div>
                  <p className="font-black text-[#1a237e] uppercase tracking-widest text-xs">Click to Expand View</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a 
                  href={pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-grow text-center bg-[#1a237e] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-800 transition-all shadow-[0_20px_40px_rgba(26,35,126,0.2)]"
                >
                  Open Official PDF
                </a>
              </div>
            </div>
          ) : (
            /* Downloads View - UI: Modern Illustration & Call to Action */
            <div className="py-16 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="relative inline-block mb-10">
                <div className="absolute inset-0 bg-red-100 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                <div className="relative w-24 h-24 bg-red-50 text-red-500 rounded-[2rem] flex items-center justify-center mx-auto border border-red-100">
                  <FileText size={48} />
                </div>
              </div>
              <h3 className="text-3xl font-black text-[#1a237e] mb-4 tracking-tight uppercase">Offline Access</h3>
              <p className="text-slate-500 mb-10 max-w-sm mx-auto font-medium leading-relaxed">
                Need to check your schedule without data? Download the official PDF version for your device.
              </p>
              
              <a 
                href={pdfUrl}
                download 
                className="inline-flex items-center justify-center gap-4 bg-white border-2 border-slate-200 text-[#1a237e] px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:border-[#1a237e] hover:shadow-xl transition-all group"
              >
                <Download size={20} className="group-hover:translate-y-1 transition-transform" /> 
                Download (PDF Version)
              </a>
            </div>
          )}
        </div>

        {/* Dynamic Footer Tip */}
        <div className="bg-slate-50 p-6 flex items-center justify-center gap-3 border-t border-slate-100">
          <Info size={16} className="text-blue-500" />
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Schedules are subject to change by institute management</p>
        </div>
      </div>

      {/* Full Screen Modal Overlay - UX: Modal Improvements */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-[100] bg-[#1a237e]/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12 lg:p-20 transition-all duration-500">
          <button 
            onClick={() => setIsPreviewOpen(false)}
            className="absolute top-8 right-8 text-white hover:text-red-400 transition-all p-2 bg-white/10 rounded-full"
            aria-label="Close Preview"
          >
            <X size={32} />
          </button>
          
          <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] border-4 border-white/20">
            <iframe 
              src={pdfUrl} 
              className="w-full h-full" 
              title="Full Screen Timetable Preview"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default TimetablePage;
import React, { useState, useEffect } from 'react';
import { FileText, Download, Eye, Calendar, Clock, X } from 'lucide-react';

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

  const pdfUrl = "/timetable.pdf"; //

  return (
    // FIX: Ensure id matches SectorHome.jsx and added scroll-mt-32 for fixed header clearance
    <section 
      id="Timetable" 
      className="py-24 scroll-mt-32 bg-[#f8fafc] px-6 min-h-screen flex flex-col items-center justify-center"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-[#1a237e] mb-4 tracking-tight">
          Learning Schedule
        </h1>
        <p className="text-slate-500 max-w-md mx-auto">
          Stay on track with your classes at Sector Institute.
        </p>
      </div>

      <div className="max-w-4xl w-full bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-100 overflow-hidden border border-slate-100">
        {/* Navigation Tabs */}
        <div className="flex bg-slate-50 p-2 gap-2 border-b border-slate-100">
          <button 
            onClick={() => setActiveTab('view')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold transition-all ${activeTab === 'view' ? 'bg-white text-[#1a237e] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <Eye size={18} /> Interactive Preview
          </button>
          <button 
            onClick={() => setActiveTab('download')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold transition-all ${activeTab === 'download' ? 'bg-white text-[#1a237e] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <Download size={18} /> Downloads
          </button>
        </div>

        <div className="p-8 md:p-12">
          {activeTab === 'view' ? (
            <div className="space-y-6">
              {/* Dynamic Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-center gap-4">
                  <div className="p-3 bg-white rounded-xl text-indigo-600 shadow-sm"><Calendar size={20}/></div>
                  <div>
                    <p className="text-xs text-indigo-400 font-bold uppercase tracking-wider">Current Term</p>
                    <p className="text-[#1a237e] font-bold">{currentMonthYear}</p>
                  </div>
                </div>
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-4">
                  <div className="p-3 bg-white rounded-xl text-emerald-600 shadow-sm"><Clock size={20}/></div>
                  <div>
                    <p className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Last Updated (SL Time)</p>
                    <p className="text-emerald-900 font-bold">Today, {currentTime}</p>
                  </div>
                </div>
              </div>

              {/* Functional Preview Area */}
              <div 
                onClick={() => setIsPreviewOpen(true)}
                className="relative aspect-[16/10] bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center overflow-hidden group cursor-pointer hover:border-indigo-400 transition-all"
              >
                <iframe 
                  src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`} 
                  className="absolute inset-0 w-full h-full opacity-30 group-hover:opacity-50 transition-opacity pointer-events-none"
                  title="Timetable Preview"
                />
                
                <div className="relative z-10 flex flex-col items-center bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl">
                  <FileText size={40} className="mb-2 text-indigo-600" />
                  <p className="font-bold text-[#1a237e]">Click to expand preview</p>
                </div>
              </div>
              
              <a 
                href={pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="block w-full text-center bg-[#1a237e] text-white py-4 rounded-2xl font-bold hover:bg-[#283593] transition-colors shadow-lg shadow-indigo-100"
              >
                Open Official PDF
              </a>
            </div>
          ) : (
            /* Downloads View */
            <div className="py-12 text-center">
              <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <FileText size={40} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Offline Access</h3>
              <p className="text-slate-500 mb-8 max-w-xs mx-auto">Download the latest schedule for the Sector institute.</p>
              
              <a 
                href={pdfUrl}
                download 
                className="flex items-center justify-center gap-3 border-2 border-slate-200 text-slate-700 py-4 rounded-2xl font-bold hover:border-[#1a237e] hover:text-[#1a237e] transition-all"
              >
                <Download size={20} /> Download PDF (Current Version)
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Full Screen Modal Overlay */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10">
          <button 
            onClick={() => setIsPreviewOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-red-400 transition-colors"
          >
            <X size={40} />
          </button>
          <div className="w-full h-full bg-white rounded-2xl overflow-hidden shadow-2xl">
            <iframe 
              src={pdfUrl} 
              className="w-full h-full" 
              title="Full Timetable Preview"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default TimetablePage;
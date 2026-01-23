const TimetablePage = () => {
  return (
    <section className="py-24 bg-slate-50 px-6 min-h-screen flex items-center">
      <div className="max-w-xl mx-auto w-full bg-white p-12 rounded-[3rem] shadow-xl text-center border border-slate-100">
        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        
        <h2 className="text-3xl font-black text-[#1a237e] mb-2">Official Timetable</h2>
        <p className="text-gray-500 mb-8">Click below to open the schedule in PDF format.</p>
        
        <div className="flex flex-col gap-4">
          <a 
            href="/assets/timetable.pdf" 
            target="_blank" 
            rel="noreferrer"
            className="bg-[#1a237e] text-white px-8 py-4 rounded-2xl font-bold hover:scale-[1.02] transition-transform shadow-lg"
          >
            View PDF (Online)
          </a>
          <a 
            href="/assets/timetable.pdf" 
            download
            className="text-[#1a237e] font-bold hover:underline"
          >
            Download for Offline Use
          </a>
        </div>
      </div>
    </section>
  );
};
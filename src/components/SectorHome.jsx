import { useState, useEffect } from 'react';
import sectorLogo from '../assets/SectorLogo.jpg'; 

const SectorHome = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');

  useEffect(() => {
    const observerOptions = { root: null, threshold: 0.6 };
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ['Home', 'About', 'Teachers', 'Timetable', 'Notices'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const navItems = ['Home', 'About', 'Teachers', 'Timetable', 'Notices'];

  return (
    <div className="font-sans antialiased text-slate-900 bg-slate-50">
      {/* Navigation */}
      <nav className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 w-[92%] max-w-[1400px] z-50">
        <div className="bg-[#1a237e]/90 backdrop-blur-lg px-6 md:px-10 py-4 md:py-5 rounded-[2rem] md:rounded-full flex justify-between items-center shadow-2xl border border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
              <img src={sectorLogo} alt="Sector Higher Education Institute Panadura Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-white font-black tracking-tighter text-xl hidden sm:block uppercase">Sector</span>
          </div>

          <ul className="hidden md:flex items-center gap-8 lg:gap-14 text-white font-semibold text-sm lg:text-base">
            {navItems.map((item) => (
              <li key={item} className="relative group">
                <a href={`#${item}`} className={`transition-colors duration-300 ${activeSection === item ? 'text-yellow-400' : 'hover:text-yellow-400'}`}>{item}</a>
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-yellow-400 transition-all duration-300 ${activeSection === item ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </li>
            ))}
          </ul>

          <button 
            onClick={() => setIsOpen(!isOpen)} 
            aria-label="Toggle Menu"
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-full transition"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" />}
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu Optimization */}
        {isOpen && (
          <div className="md:hidden mt-4 bg-[#1a237e] rounded-3xl p-6 shadow-2xl border border-white/10 animate-in fade-in zoom-in duration-300">
            <ul className="flex flex-col gap-4 text-white font-semibold">
              {navItems.map((item) => (
                <li key={item}>
                  <a href={`#${item}`} onClick={() => setIsOpen(false)} className="block py-2 hover:text-yellow-400 transition">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* Hero Section - Optimized for Answer Engine Optimization (AEO) */}
      <section id="Home" className="relative min-h-screen lg:min-h-[95vh] w-full flex items-center justify-center md:justify-start px-6 md:px-[10%] overflow-hidden">
        <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=2070')` }}>
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl text-center md:text-left mt-10">
          <span className="text-blue-700 font-bold tracking-[0.3em] text-sm uppercase mb-4 block">Top-Rated Education Center in Panadura</span>
          <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] font-black text-[#1a237e] leading-[1.1] mb-6">
            BEST TUITION FOR <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600">GRADE 1 TO A/L</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-700 mb-8 max-w-2xl font-medium leading-relaxed">
            Sector Higher Education Institute provides the best <strong>A/L classes in Panadura</strong>. We specialize in Science, Commerce, and Arts streams, offering a modern learning environment for academic excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a href="#Timetable" className="bg-[#1a237e] hover:bg-blue-800 text-white text-center font-bold py-5 px-10 rounded-2xl transition-all shadow-xl hover:-translate-y-1 uppercase tracking-widest text-xs">
              View 2026 Timetable
            </a>
            <a href="#About" className="bg-white hover:bg-slate-100 text-[#1a237e] text-center font-bold py-5 px-10 rounded-2xl transition-all shadow-lg border border-slate-200 uppercase tracking-widest text-xs">
              Institute Details
            </a>
          </div>
        </div>
      </section>

      {/* About Section - Local SEO Priority */}
      <section id="About" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black text-[#1a237e] mb-6">Sector Institute Panadura: 3/B Grace Peiris Road</h2>
            <p className="text-slate-600 text-lg mb-6 leading-relaxed">
              Located conveniently at <strong>3/B Grace Peiris Road, Panadura</strong>, Sector Higher Education Institute is the premier choice for students in the Kalutara district. We offer specialized coaching from primary grades through to GCE Advanced Level. 
            </p>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              Our facilities include air-conditioned lecture halls, a high-tech computer lab for <strong>ICT classes</strong>, and a focus on personalized student mentoring.
            </p>
            <a href="tel:+94382232299" className="flex items-center gap-4 text-[#1a237e] hover:text-blue-800 transition-colors inline-flex">
               <div className="p-3 bg-blue-50 rounded-full">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
               </div>
               <span className="font-bold text-xl">038 223 2299</span>
            </a>
          </div>
          <div className="bg-slate-200 rounded-[3rem] h-96 overflow-hidden shadow-2xl relative">
             {/* Replace SRC with your actual Google Maps Embed link for local authority */}
             <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.457896424564!2d79.9117622!3d6.7138407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2460ec0000001%3A0xe104f6f7902d512a!2sSector%20Higher%20Education%20Institute!5e0!3m2!1sen!2slk!4v1705665000000!5m2!1sen!2slk" 
                className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500" 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Sector Higher Education Institute Location"
             ></iframe>
          </div>
        </div>
      </section>

      {/* Teachers Section - Keyword Mapping */}
      <section id="Teachers" className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-black text-[#1a237e] mb-4">Expert Tutors for A/L & Secondary</h2>
          <p className="text-slate-500 mb-16 max-w-2xl mx-auto">Providing specialized education for English and Sinhala medium students in the heart of Panadura city.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { subject: 'Combined Mathematics', desc: 'Expert A/L Math classes focusing on theory and revision.' },
              { subject: 'Biology & Chemistry', desc: 'Top Science stream tutors for medical entrance exams.' },
              { subject: 'Physics', desc: 'Advanced Physics coaching with practical experimental focus.' },
              { subject: 'ICT (Information Tech)', desc: 'Leading ICT classes for O/L and A/L students in Panadura.' },
              { subject: 'Commerce & Accounting', desc: 'Comprehensive coaching for the A/L Commerce stream.' },
              { subject: 'Sinhala & English', desc: 'Language and literature classes for all secondary grades.' }
            ].map((item) => (
              <div key={item.subject} className="bg-white p-8 rounded-3xl shadow-md border border-slate-100 hover:shadow-xl transition-all group hover:-translate-y-1">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl mb-6 mx-auto flex items-center justify-center text-[#1a237e] group-hover:bg-[#1a237e] group-hover:text-white transition-colors">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z"/><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg>
                </div>
                <h3 className="text-xl font-bold mb-2">{item.subject}</h3>
                <p className="text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timetable Section */}
      <section id="Timetable" className="py-24 bg-[#1a237e] text-white text-center px-6">
          <h2 className="text-4xl font-black mb-6">Class Timetable 2026</h2>
          <p className="text-blue-200 max-w-2xl mx-auto mb-10 leading-relaxed">
            Our schedule is designed to accommodate both physical sessions and live online streaming via our student portal.
          </p>
          <div className="inline-block bg-white/10 backdrop-blur-md p-8 rounded-[2rem] border border-white/20">
             <p className="text-xl mb-4">Get the latest schedule for Grade 1–13</p>
             <a href="tel:+94382232299" className="bg-yellow-400 text-[#1a237e] px-8 py-4 rounded-xl font-bold hover:bg-yellow-300 transition uppercase tracking-tighter">Call for Schedule</a>
          </div>
      </section>
      
      {/* Notices Section */}
      <section id="Notices" className="py-24 text-center px-6">
          <h2 className="text-4xl font-black text-[#1a237e] mb-4">Latest Student Notices</h2>
          <p className="text-slate-500 mb-12">Admissions for the 2026 academic year are now open.</p>
          <div className="max-w-3xl mx-auto bg-blue-50 p-8 rounded-3xl border-l-8 border-[#1a237e] text-left">
            <h4 className="font-bold text-[#1a237e] text-xl mb-2">Notice: Monthly Assessments</h4>
            <p className="text-slate-700">All A/L students are required to attend the upcoming monthly mock examinations starting February 15th.</p>
          </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-black tracking-tighter">SECTOR</h3>
            <p className="text-slate-400 mt-4 max-w-xs">The premier higher education institute in Panadura, dedicated to shaping futures through quality tutoring.</p>
          </div>
          <div className="text-center md:text-left">
            <h4 className="font-bold text-lg mb-4 text-yellow-400">Quick Links</h4>
            <ul className="space-y-2 text-slate-300">
              {navItems.map(item => <li key={item}><a href={`#${item}`} className="hover:text-white transition">{item}</a></li>)}
            </ul>
          </div>
          <div className="text-center md:text-left">
            <h4 className="font-bold text-lg mb-4 text-yellow-400">Contact Address</h4>
            <address className="not-italic text-slate-300 leading-relaxed">
              3/B Grace Peiris Road,<br />
              Panadura, 12500<br />
              Sri Lanka<br />
              <span className="block mt-2 font-bold">Phone: 038 223 2299</span>
            </address>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
          <p>© 2026 Sector Higher Education Institute. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default SectorHome;
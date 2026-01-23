import { useState, useEffect } from 'react';
import sectorLogo from '../assets/SectorLogo.jpg'; // Adjust path if needed

const SectorHome = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');

  // Logic to highlight the navbar item based on scroll position
  useEffect(() => {
    const observerOptions = {
      root: null,
      threshold: 0.6, // Highlight when 60% of the section is visible
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Sections to observe
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
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
              <img src={sectorLogo} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-white font-black tracking-tighter text-xl hidden sm:block">SECTOR</span>
          </div>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8 lg:gap-14 text-white font-semibold text-sm lg:text-base">
            {navItems.map((item) => (
              <li key={item} className="relative group">
                <a
                  href={`#${item}`}
                  className={`transition-colors duration-300 ${activeSection === item ? 'text-yellow-400' : 'hover:text-yellow-400'}`}
                >
                  {item}
                </a>
                {/* Underline - stays visible if activeSection matches item */}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-yellow-400 transition-all duration-300 ${activeSection === item ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </li>
            ))}
          </ul>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white p-2 hover:bg-white/10 rounded-full transition">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" />}
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="Home" className="relative min-h-screen lg:min-h-[95vh] w-full flex items-center justify-center md:justify-start px-6 md:px-[10%] overflow-hidden">
        <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=2070')` }}>
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl text-center md:text-left mt-10">
          <span className="text-blue-700 font-bold tracking-[0.3em] text-sm uppercase mb-4 block">The Hub of Knowledge in Panadura</span>
          <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] font-black text-[#1a237e] leading-[1.1] mb-6">
            SECTOR HIGHER <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600">EDUCATION INSTITUTE</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-700 mb-8 max-w-2xl font-medium leading-relaxed">
            Empowering the next generation with quality education from Grade 1 to Advanced Level. Join the most trusted tuition center in Panadura for unparalleled academic success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a href="#Timetable" className="bg-[#1a237e] hover:bg-blue-800 text-white text-center font-bold py-5 px-10 rounded-2xl transition-all shadow-xl hover:-translate-y-1 uppercase tracking-widest text-xs">
              View Class Timetable 2026
            </a>
            <a href="#About" className="bg-white hover:bg-slate-100 text-[#1a237e] text-center font-bold py-5 px-10 rounded-2xl transition-all shadow-lg border border-slate-200 uppercase tracking-widest text-xs">
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* About Section - Critical for Local SEO */}
      <section id="About" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black text-[#1a237e] mb-6">Quality Education in Panadura</h2>
            <p className="text-slate-600 text-lg mb-6 leading-relaxed">
              Located at <strong>3/B Grace Peiris Road, Panadura</strong>, Sector Higher Education Institute has established itself as a premier destination for students seeking excellence in Grade 1 through A/L. 
            </p>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              Our institute provides a modern learning environment equipped with comfortable seating, air-conditioned halls, and a dedicated faculty focused on individual student growth.
            </p>
            <div className="flex items-center gap-4 text-[#1a237e]">
               <div className="p-3 bg-blue-50 rounded-full">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
               </div>
               <span className="font-bold text-xl">038 223 2299</span>
            </div>
          </div>
          <div className="bg-slate-200 rounded-[3rem] h-96 overflow-hidden shadow-2xl">
             {/* Replace with a real Google Map Embed for massive SEO points */}
             <div className="w-full h-full flex items-center justify-center text-slate-400 italic">
                [Google Map Embed of 3/B Grace Peiris Road]
             </div>
          </div>
        </div>
      </section>

      {/* Teachers Section - Keyword rich for subjects */}
      <section id="Teachers" className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-black text-[#1a237e] mb-16">Expert Faculty for A/L & Secondary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {['Mathematics', 'Sinhala', 'History', 'Commerce', 'ICT', 'Art', 'Tamil'].map((subject) => (
              <div key={subject} className="bg-white p-8 rounded-3xl shadow-md border border-slate-100 hover:shadow-xl transition-shadow group">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl mb-6 mx-auto flex items-center justify-center text-[#1a237e] group-hover:bg-[#1a237e] group-hover:text-white transition-colors">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z"/><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg>
                </div>
                <h3 className="text-xl font-bold mb-2">{subject}</h3>
                <p className="text-slate-500">Leading A/L classes in Panadura with top-tier results.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Placeholder for remaining sections */}
      <section id="Timetable" className="py-24 bg-[#1a237e] text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Class Timetable 2026</h2>
          <p>Contact the office at 038 223 2299 for the latest schedule.</p>
      </section>
      
      <section id="Notices" className="py-24 text-center">
          <h2 className="text-3xl font-bold mb-4">Latest Student Notices</h2>
          <p className="text-slate-500">Updates on admissions and monthly assessments.</p>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h3 className="text-2xl font-black">SECTOR</h3>
            <p className="text-slate-400 mt-2">3/B Grace Peiris Road, Panadura</p>
          </div>
          <p className="text-slate-500 text-sm">© 2026 Sector Higher Education Institute. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default SectorHome;
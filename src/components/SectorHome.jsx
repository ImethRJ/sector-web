import { useState, useEffect } from 'react';

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
              <img src="/src/assets/SectorLogo.jpg" alt="Logo" className="w-full h-full object-contain" />
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

          {/* Mobile Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white p-2 hover:bg-white/10 rounded-full transition">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" />}
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden mt-3 w-full bg-[#1a237e] rounded-3xl shadow-2xl border border-white/10 overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            <ul className="flex flex-col text-white font-medium p-6 gap-2">
              {navItems.map((item) => (
                <li key={item} onClick={() => setIsOpen(false)}>
                  <a
                    href={`#${item}`}
                    className={`block py-4 px-5 rounded-xl transition-all ${activeSection === item ? 'bg-yellow-400 text-blue-900' : 'hover:bg-white/10'}`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* Hero Section - Added id="Home" */}
      <section id="Home" className="relative min-h-screen lg:min-h-[90vh] w-full flex items-center justify-center md:justify-start px-6 md:px-[10%] overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2071')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl text-center md:text-left mt-10">
          <span className="text-blue-700 font-bold tracking-[0.3em] text-sm uppercase mb-4 block">Inspiring Excellence</span>
          <h1 className="text-[clamp(2.5rem,8vw,6rem)] font-black text-[#1a237e] leading-[1.1] mb-8">
            WELCOME TO <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600 uppercase">Sector</span>
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="bg-[#1a237e] hover:bg-blue-800 text-white font-bold py-5 px-12 rounded-2xl transition-all shadow-xl hover:-translate-y-1 active:translate-y-0 uppercase tracking-widest text-xs md:text-sm">
              View Time Table
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SectorHome;
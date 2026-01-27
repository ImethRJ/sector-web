import { useState, useEffect } from 'react';
import sectorLogo from '../assets/SectorLogo.jpg';
import { Phone, Mail, MapPin, X } from 'lucide-react'; // Ensure lucide-react is installed

const SectorHome = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['Home', 'About', 'Teachers', 'Timetable', 'Notices'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Home', 'About', 'Teachers', 'Timetable', 'Notices'];
  const handleNavClick = () => setIsOpen(false);

  return (
    <div className="font-sans antialiased text-slate-900 bg-slate-50 selection:bg-yellow-200">
      {/* Navigation */}
      <header className="fixed top-0 md:top-6 left-0 right-0 w-full z-50 flex justify-center px-4 md:px-0">
        <nav className="w-full max-w-[1100px] bg-[#1a237e]/90 backdrop-blur-xl px-8 py-4 md:rounded-full flex justify-between items-center shadow-2xl border border-white/10 transition-all duration-300">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center overflow-hidden rounded-xl border border-white/20 bg-white/10">
              <img src={sectorLogo} alt="Sector Education Logo" className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-white font-black tracking-tighter text-xl hidden sm:block uppercase">SECTOR</span>
          </div>

          <ul className="hidden md:flex items-center gap-10 text-white/90 font-bold text-sm tracking-wide">
            {navItems.map((item) => (
              <li key={item} className="relative py-2">
                <a href={`#${item}`} className={`transition-all duration-300 ${activeSection === item ? 'text-yellow-400' : 'hover:text-yellow-400 text-white/70'}`}>
                  {item}
                </a>
                <span className={`absolute bottom-0 left-0 h-0.5 bg-yellow-400 transition-all duration-500 ${activeSection === item ? 'w-full opacity-100' : 'w-0 opacity-0'}`}></span>
              </li>
            ))}
          </ul>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white p-2.5 hover:bg-white/10 rounded-xl transition-colors">
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span className={`h-0.5 w-full bg-white rounded-full transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`h-0.5 w-full bg-white rounded-full transition-all ${isOpen ? 'opacity-0' : ''}`}></span>
              <span className={`h-0.5 w-full bg-white rounded-full transition-all ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
            </div>
          </button>
        </nav>

        {isOpen && (
          <div className="fixed inset-0 bg-[#1a237e] z-40 flex flex-col items-center justify-center transition-all duration-500 md:hidden">
            <ul className="text-center space-y-8">
              {navItems.map((item) => (
                <li key={item} onClick={handleNavClick}>
                  <a href={`#${item}`} className={`text-3xl font-black uppercase tracking-tighter transition-colors ${activeSection === item ? 'text-yellow-400' : 'text-white'}`}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <main>
        <section id="Home" className="relative min-h-[100svh] w-full flex items-center px-6 md:px-[8%] lg:px-[12%] overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2071" className="w-full h-full object-cover" alt="Sector Campus" />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
          </div>

          <div className="relative z-10 max-w-4xl pt-20">
            <h1 className="sr-only">Empowering Minds Redefining Future</h1> {/* Hidden for users, visible to bots */}
            <div aria-hidden="true" className="text-[clamp(2.5rem,9vw,5.5rem)] font-black text-[#1a237e] leading-[1.05] mb-8 tracking-tighter">
              Empowering Minds <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-indigo-600 uppercase italic">Redefining Future</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-5">
              {/* FEATURE 1: Smooth scroll to Timetable section */}
              <a href="#Timetable" className="bg-[#1a237e] text-center text-white font-bold py-5 px-10 rounded-2xl shadow-xl uppercase text-xs tracking-widest hover:bg-blue-800 transition-all">
                View Time Table
              </a>
              {/* FEATURE 2: Trigger Contact Modal */}
              <button
                onClick={() => setIsContactOpen(true)}
                className="bg-white text-[#1a237e] border-2 border-[#1a237e]/10 font-bold py-5 px-10 rounded-2xl uppercase text-xs tracking-widest hover:bg-slate-50 transition-all"
              >
                Contact Office
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* CONTACT MODAL */}
      {isContactOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          <div className="absolute inset-0 bg-[#1a237e]/60 backdrop-blur-md" onClick={() => setIsContactOpen(false)}></div>

          <div className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in duration-300">
            <button onClick={() => setIsContactOpen(false)} className="absolute top-6 right-6 z-20 bg-white/80 p-2 rounded-full hover:bg-red-50 hover:text-red-500 transition-all">
              <X size={24} />
            </button>

            {/* FIXED MAP SECTION */}
            <div className="w-full md:w-1/2 h-64 md:h-auto bg-slate-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.648356985392!2d79.90221137450505!3d6.71199999328383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2460662d5d89f%3A0x6a10bc135f375c35!2sSector%20Education!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk"
                className="w-full h-full border-none"
                allowFullScreen=""
                loading="lazy"
                title="Sector Education Location"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Info Section */}
            <div className="w-full md:w-1/2 p-10 md:p-14 space-y-8">
              <div>
                <h2 className="text-3xl font-black text-[#1a237e] uppercase tracking-tighter mb-2">Connect With Us</h2>
                <p className="text-slate-500 font-medium italic">We're here to help you redefine your future.</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-5 group">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 transition-colors group-hover:bg-[#1a237e] group-hover:text-white">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Address</p>
                    <p className="text-[#1a237e] font-bold">3/B Grace Peiris Road, Panadura</p>
                  </div>
                </div>

                <a href="tel:0382232299" className="flex items-center gap-5 group">
                  <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Phone Number</p>
                    <p className="text-[#1a237e] font-black text-xl text-nowrap">038 223 2299</p>
                  </div>
                </a>

                <div className="flex items-center gap-5 group">
                  <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Email Address</p>
                    <p className="text-[#1a237e] font-bold break-all">info@sectoreducation.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SectorHome;
import { Phone, MapPin, Mail, ArrowUpRight } from 'lucide-react';
import sectorLogo from '../assets/SectorLogo.jpg';

const Footer = () => {
    return (
        <footer className="w-full bg-[#060E69] pt-24 pb-12 px-6 mt-auto relative overflow-hidden">
            {/* Subtle background decoration for UI depth */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="max-w-[1400px] mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20">
                    
                    {/* Brand Section - SEO: Semantic <h2> and descriptive alt text */}
                    <div className="space-y-8 lg:col-span-1">
                        <div className="flex items-center gap-4 group">
                            <div className="w-14 h-14 bg-white p-2 rounded-2xl shadow-xl transition-transform duration-500 group-hover:rotate-6">
                                <img
                                    src={sectorLogo}
                                    alt="Sector Education Institute Logo"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div>
                                <h2 className="text-white font-black text-2xl tracking-tighter uppercase leading-none">Sector</h2>
                                <span className="text-blue-400 text-[10px] font-bold tracking-[0.3em] uppercase">Education</span>
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-xs font-medium">
                            Panadura's premier educational hub, dedicated to academic excellence from Grade 1 through to Advanced Level.
                        </p>
                    </div>

                    {/* Quick Contact - SEO: Semantic <address> tag */}
                    <address className="space-y-6 not-italic">
                        <h3 className="text-white font-black text-sm uppercase tracking-widest border-l-2 border-yellow-400 pl-4">Location</h3>
                        <div className="flex items-start gap-4 text-slate-400 hover:text-white transition-colors duration-300">
                            <MapPin size={20} className="text-blue-400 shrink-0" />
                            <p className="text-sm font-medium leading-relaxed">
                                3/B Grace Peiris Road,<br />
                                Panadura, Sri Lanka
                            </p>
                        </div>
                    </address>

                    {/* Reach Us Section */}
                    <div className="space-y-6">
                        <h3 className="text-white font-black text-sm uppercase tracking-widest border-l-2 border-yellow-400 pl-4">Get In Touch</h3>
                        <div className="space-y-4">
                            <a 
                                href="tel:0382232299" 
                                className="flex items-center gap-4 text-white text-xl font-black hover:text-yellow-400 transition-all duration-300 group"
                            >
                                038 223 2299
                                <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 -translate-y-1 transition-all" />
                            </a>
                            <div className="flex items-center gap-4 text-slate-400 hover:text-white transition-colors cursor-default">
                                <Mail size={18} className="text-blue-400" />
                                <span className="text-sm font-medium">info@sectoreducation.com</span>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section - UX: High-visibility mobile-friendly button */}
                    <div className="lg:flex lg:justify-end lg:items-start pt-4 lg:pt-0">
                        <a 
                            href="tel:0382232299" 
                            className="flex items-center justify-between gap-6 bg-white/5 p-6 rounded-[2.5rem] border border-white/10 group hover:bg-white/10 transition-all duration-500 w-full lg:w-auto"
                        >
                            <div className="space-y-1">
                                <span className="text-blue-400 text-[10px] font-black uppercase tracking-widest block">Available Now</span>
                                <span className="text-white font-black text-lg">Contact Office</span>
                            </div>
                            <div className="bg-yellow-400 p-4 rounded-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-yellow-400/20">
                                <Phone size={24} className="text-[#060E69]" fill="currentColor" />
                            </div>
                        </a>
                    </div>
                </div>

                {/* Footer Bottom - UX: Clean, centered legal text */}
                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                        © 2026 Sector Education Institute. Redefining Future.
                    </p>
                    <div className="flex gap-8">
                        <span className="text-slate-600 text-[10px] font-bold uppercase tracking-widest cursor-default hover:text-slate-400 transition-colors">Privacy Policy</span>
                        <span className="text-slate-600 text-[10px] font-bold uppercase tracking-widest cursor-default hover:text-slate-400 transition-colors">Terms of Service</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
const Footer = () => {
    return (
        <footer className="w-full bg-[#060E69] pt-20 pb-10 px-6 mt-auto">
            <div className="max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-16">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <img src="/src/assets/SectorLogo.jpg" alt="Logo" className="w-12 h-12 object-contain" />
                            <h2 className="text-white font-black text-2xl tracking-tighter uppercase">Sector</h2>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                            Empowering the next generation through quality education from Grade 1 to Advanced Level.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-white font-bold text-lg">Get In Touch</h3>
                        <p className="text-gray-400 text-sm">3/B Grace Peiris Road, Panadura</p>
                        <div className="text-white text-xl font-bold hover:text-yellow-400 transition-colors">038 223 2299</div>
                    </div>

                    <div className="lg:flex lg:justify-end">
                        <a href="tel:0382232299" className="flex items-center gap-4 bg-white/5 p-6 rounded-3xl border border-white/10 group">
                            <div className="bg-yellow-400 p-4 rounded-2xl group-hover:scale-110 transition-transform">
                                <svg className="h-6 w-6 text-blue-900" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 004.587 4.587l.773-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                            </div>
                            <span className="text-white font-bold text-lg">Contact Us Now</span>
                        </a>
                    </div>
                </div>
                <div className="pt-8 border-t border-white/5 text-center text-gray-500 text-sm">
                    © 2026 Sector Education. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
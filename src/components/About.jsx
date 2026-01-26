const About = () => {
    return (
        <section 
            className="py-24 px-6 md:px-12 bg-white scroll-mt-32 overflow-hidden" 
            id="About"
            aria-labelledby="about-title"
        > 
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-24">

                {/* Left Side: Visual Stats / Image - UX: Added depth with floating elements */}
                <div className="w-full lg:w-1/2 relative group">
                    {/* Decorative Background Element */}
                    <div className="absolute -top-10 -left-10 w-32 h-32 bg-yellow-400 rounded-full z-0 opacity-10 animate-pulse"></div>
                    
                    <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-[12px] border-slate-50 transition-transform duration-500 group-hover:scale-[1.02]">
                        <img
                            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070"
                            alt="Students studying at Sector Education Institute"
                            className="w-full h-full object-cover aspect-[4/3] lg:aspect-auto"
                            loading="lazy"
                        />
                    </div>

                    {/* Experience Badge - UI: Modernized with glassmorphism touch */}
                    <div className="absolute -bottom-8 -right-4 md:-right-8 bg-[#1a237e] text-white p-8 rounded-[2rem] shadow-2xl transition-transform duration-500 hover:-translate-y-2">
                        <p className="text-4xl md:text-5xl font-black mb-1">15+</p>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-blue-200 font-bold leading-tight">
                            Years of Academic<br/>Excellence
                        </p>
                    </div>
                </div>

                {/* Right Side: Content - SEO: Semantic article structure */}
                <article className="w-full lg:w-1/2 space-y-8">
                    <header className="space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="h-px w-8 bg-yellow-500"></span>
                            <h6 className="text-yellow-600 font-bold uppercase tracking-[0.3em] text-xs md:text-sm">
                                Inspiring Excellence
                            </h6>
                        </div>
                        <h2 id="about-title" className="text-4xl md:text-5xl font-black text-[#1a237e] leading-[1.1] tracking-tight">
                            Empowering the next generation through <span className="text-blue-600">quality education.</span>
                        </h2>
                    </header>

                    <div className="space-y-6">
                        <p className="text-slate-600 text-lg leading-relaxed font-medium">
                            At <strong className="text-[#1a237e]">Sector</strong>, we believe that education is the foundation of a bright future. 
                            From Grade 1 through to Advanced Level, we provide a supportive environment where students are encouraged 
                            to reach their full potential.
                        </p>
                        
                        <p className="text-slate-500 leading-relaxed border-l-4 border-yellow-400 pl-6 italic">
                            Our methodology focuses on conceptual clarity, disciplined practice, and personalized 
                            attention for every student who walks through our doors.
                        </p>
                    </div>

                    {/* Mini Features - UX: Improved touch targets and spacing */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6">
                        <div className="flex items-start gap-5 p-4 rounded-2xl transition-colors hover:bg-slate-50">
                            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-[#1a237e] shadow-sm">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-bold text-[#1a237e] text-lg">Expert Tutors</h4>
                                <p className="text-sm text-slate-500 leading-snug">Learn from the most distinguished educators in the island.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-5 p-4 rounded-2xl transition-colors hover:bg-slate-50">
                            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-[#1a237e] shadow-sm">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04M12 21.355l8.618-3.04A12.02 12.02 0 003.382 18.315L12 21.355z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-bold text-[#1a237e] text-lg">Proven Results</h4>
                                <p className="text-sm text-slate-500 leading-snug">Celebrating a legacy of consistent top-tier academic rankers.</p>
                            </div>
                        </div>
                    </div>
                </article>

            </div>
        </section>
    );
};

export default About;
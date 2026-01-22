const About = () => {
    return (
        <section className="py-20 px-8 bg-white" id="About"> {/* Changed 'about' to 'About' to match your nav links */}
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">

                {/* Left Side: Visual Stats / Image */}
                <div className="md:w-1/2 relative">
                    <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-400 rounded-full z-0 opacity-20"></div>
                    <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-8 border-gray-50">
                        <img
                            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070"
                            alt="Sector Education"
                            className="w-full h-auto object-cover"
                        />
                    </div>
                    {/* Experience Badge */}
                    <div className="absolute -bottom-6 -right-6 bg-[#1a237e] text-white p-6 rounded-2xl shadow-xl hidden md:block">
                        <p className="text-3xl font-bold">15+</p>
                        <p className="text-xs uppercase tracking-widest text-blue-200">Years of Excellence</p>
                    </div>
                </div>

                {/* Right Side: Content */}
                <div className="md:w-1/2 space-y-6">
                    <div className="space-y-2">
                        <h6 className="text-yellow-500 font-bold uppercase tracking-widest text-sm">Inspiring Excellence</h6>
                        <h2 className="text-4xl font-bold text-[#1a237e]">Empowering the next generation through quality education.</h2>
                    </div>

                    <p className="text-gray-600 leading-relaxed">
                        At <strong>Sector</strong>, we believe that education is the foundation of a bright future.
                        From Grade 1 through to Advanced Level, we provide a supportive environment
                        where students are encouraged to reach their full potential.
                    </p>

                    {/* Mini Features */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                        <div className="flex gap-4">
                            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-[#1a237e]">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                            </div>
                            <div>
                                <h4 className="font-bold text-[#1a237e]">Expert Tutors</h4>
                                <p className="text-xs text-gray-500">Learned from the best in the island.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-[#1a237e]">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04M12 21.355l8.618-3.04A12.02 12.02 0 003.382 18.315L12 21.355z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-bold text-[#1a237e]">Proven Results</h4>
                                <p className="text-xs text-gray-500">Consistent top rankers every year.</p>
                            </div>
                        </div>
                    </div>

                    <button className="mt-8 border-2 border-[#1a237e] text-[#1a237e] hover:bg-[#1a237e] hover:text-white transition-all px-8 py-3 rounded-md font-bold text-sm uppercase">
                        Learn More Our Story
                    </button>
                </div>

            </div>
        </section>
    );
};

export default About;
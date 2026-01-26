import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs, query, where, limit } from 'firebase/firestore';

const TeachersHome = () => {
    const [featuredTeachers, setFeaturedTeachers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const q = query(
                    collection(db, "teachers"),
                    where("isFeatured", "==", true),
                    limit(6)
                );

                const querySnapshot = await getDocs(q);
                const teachersData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setFeaturedTeachers(teachersData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching featured teachers: ", error);
                setLoading(false);
            }
        };

        fetchTeachers();
    }, []);

    if (loading) return (
        <div className="py-32 text-center bg-[#f8fafc] min-h-[50vh] flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
            <p className="text-[#1a237e] font-bold tracking-widest text-xs uppercase">Curating Faculty...</p>
        </div>
    );

    return (
        <section 
            id="Teachers" 
            className="py-32 scroll-mt-32 bg-[#f8fafc] px-6 min-h-screen flex flex-col items-center justify-center overflow-hidden"
            aria-labelledby="teachers-title"
        >
            <div className="max-w-[1400px] mx-auto w-full">
                <header className="text-center mb-20">
                    <div className="inline-flex items-center gap-3 bg-white px-4 py-2 rounded-full mb-6 shadow-sm border border-slate-100">
                        <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                        <span className="text-blue-700 font-bold tracking-[0.2em] text-[10px] uppercase">Elite Educators</span>
                    </div>
                    <h2 id="teachers-title" className="text-4xl md:text-5xl font-black text-[#1a237e] mb-6 uppercase tracking-tight">
                        Meet Our <span className="text-blue-600">Expert Faculty</span>
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
                        Learn from the most distinguished educators in Panadura, dedicated to transforming students into future leaders.
                    </p>
                </header>

                {featuredTeachers.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                        {featuredTeachers.map((tutor) => (
                            <article 
                                key={tutor.id} 
                                className="group relative bg-white p-8 rounded-[3rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(26,35,126,0.12)] transition-all duration-500 border border-slate-50 text-center flex flex-col items-center hover:-translate-y-2"
                            >
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-blue-50 rounded-full scale-0 group-hover:scale-110 transition-transform duration-500 -z-0 opacity-50"></div>

                                {/* Image Container: Added background color to act as a placeholder */}
                                <div className="relative z-10 w-36 h-36 mx-auto mb-8 rounded-full overflow-hidden border-8 border-slate-50 shadow-inner group-hover:border-blue-50 transition-colors duration-500 flex items-center justify-center bg-indigo-50">
                                    {tutor.image ? (
                                        <img 
                                            src={tutor.image} 
                                            alt={`Portrait of ${tutor.name}`} 
                                            className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500" 
                                            // 1. NATIVE LAZY LOADING
                                            loading="lazy"
                                            // 2. EXPLICIT DIMENSIONS (Helps Browser Rendering)
                                            width="144"
                                            height="144"
                                            // 3. LOW PRIORITY IF BELOW THE FOLD
                                            decoding="async"
                                        />
                                    ) : (
                                        <span className="text-4xl font-black text-indigo-300 uppercase">{tutor.name ? tutor.name[0] : '?'}</span>
                                    )}
                                </div>

                                <div className="relative z-10">
                                    <h3 className="text-2xl font-black text-[#1a237e] mb-2 tracking-tight group-hover:text-blue-700 transition-colors">
                                        {tutor.name || "Specialist Tutor"}
                                    </h3>
                                    <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 font-bold text-[10px] uppercase tracking-[0.15em] rounded-full border border-blue-100">
                                        {tutor.subject || "Academic Mentor"}
                                    </div>
                                </div>

                                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs italic">Awaiting Faculty Assignments</p>
                    </div>
                )}

                <footer className="mt-20 text-center">
                    <Link 
                        to="/all-tutors" 
                        className="inline-flex items-center gap-3 bg-[#1a237e] text-white px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-800 transition-all shadow-[0_20px_40px_rgba(26,35,126,0.25)] hover:-translate-y-1 active:scale-95 group"
                    >
                        Explore Full Faculty
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </footer>
            </div>
        </section>
    );
};

export default TeachersHome;
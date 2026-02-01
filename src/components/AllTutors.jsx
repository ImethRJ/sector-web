import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { ArrowLeft, GraduationCap } from 'lucide-react';

const AllTutors = () => {
    const [allTeachers, setAllTeachers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllTeachers = async () => {
            try {
                // UPDATE: Changed orderBy from "name" to "orderIndex"
                const q = query(collection(db, "teachers"), orderBy("orderIndex", "asc"));
                const querySnapshot = await getDocs(q);

                const teachersData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setAllTeachers(teachersData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching all teachers: ", error);
                setLoading(false);
            }
        };

        fetchAllTeachers();
    }, []);

    if (loading) return (
        <div className="py-24 bg-white px-6 min-h-screen max-w-[1400px] mx-auto">
            <div className="h-8 w-32 bg-slate-100 animate-pulse rounded-lg mb-12"></div>
            <div className="h-12 w-64 bg-slate-100 animate-pulse rounded-lg mb-16"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                    <div key={i} className="bg-slate-50 p-8 rounded-[2.5rem] h-64 animate-pulse border border-slate-100"></div>
                ))}
            </div>
        </div>
    );

    return (
        <main className="py-24 bg-[#fcfdfe] px-6 min-h-screen">
            <section className="max-w-[1400px] mx-auto" aria-labelledby="faculty-title">
                <nav className="mb-12" aria-label="Back navigation">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-100 text-slate-500 hover:text-[#1a237e] hover:shadow-md font-bold transition-all group"
                    >
                        <ArrowLeft size={18} className="transform group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                </nav>

                <header className="mb-20">
                    <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full mb-4 border border-blue-100">
                        <GraduationCap size={16} className="text-blue-600" />
                        <span className="text-blue-700 font-bold tracking-[0.2em] text-[10px] uppercase">Academic Directory</span>
                    </div>
                    <h2 id="faculty-title" className="text-4xl md:text-6xl font-black text-[#1a237e] uppercase tracking-tight leading-none mb-4">
                        Our Entire <span className="text-blue-600">Faculty</span>
                    </h2>
                    <p className="text-slate-500 text-lg font-medium max-w-xl leading-relaxed">
                        A comprehensive directory of the distinguished educators shaping the future at Sector Institute.
                    </p>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {allTeachers.map((tutor) => (
                        <article 
                            key={tutor.id} 
                            className="group bg-white p-8 rounded-[3rem] border border-slate-50 text-center shadow-[0_10px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_25px_60px_rgba(26,35,126,0.1)] transition-all duration-500 hover:-translate-y-2"
                        >
                            <div className="relative w-36 h-36 mx-auto mb-8 rounded-full overflow-hidden border-8 border-slate-50 shadow-inner bg-indigo-50 flex items-center justify-center transition-colors group-hover:border-blue-50">
                                {tutor.image ? (
                                    <img 
                                        src={tutor.image} 
                                        alt={`Academic portrait of ${tutor.name}`} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        loading="lazy"
                                        decoding="async"
                                        width="144"
                                        height="144"
                                    />
                                ) : (
                                    <span className="text-4xl font-black text-indigo-200 uppercase">{tutor.name ? tutor.name[0] : '?'}</span>
                                )}
                            </div>
                            
                            <h3 className="text-2xl font-black text-[#1a237e] mb-2 tracking-tight">
                                {tutor.name}
                                {/* Optional: Add a star for featured teachers in the full list */}
                                {tutor.isFeatured && <span className="ml-2 text-yellow-400 text-lg">★</span>}
                            </h3>
                            <div className="inline-block px-4 py-1 bg-blue-50 text-blue-600 font-bold text-[10px] uppercase tracking-[0.15em] rounded-full border border-blue-100">
                                {tutor.subject}
                            </div>
                        </article>
                    ))}
                </div>

                <footer className="mt-24 pt-12 border-t border-slate-100 text-center">
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                        All faculty members are verified academic professionals at Sector Education.
                    </p>
                </footer>
            </section>
        </main>
    );
};

export default AllTutors;
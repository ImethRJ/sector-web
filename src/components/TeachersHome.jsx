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
                // Fetch only teachers where isFeatured is true
                const q = query(
                    collection(db, "teachers"),
                    where("isFeatured", "==", true),
                    limit(6) // Limit to 6 to keep the homepage layout clean
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

    if (loading) return <div className="py-24 text-center text-[#1a237e] font-bold">Loading Faculty...</div>;

    return (
        /* FIX: Added scroll-mt-32 to ensure the fixed navbar doesn't cover the title when scrolling */
        <section id="Teachers" className="py-24 scroll-mt-32 bg-[#f8fafc] px-6 min-h-screen flex flex-col items-center justify-center">
            <div className="max-w-[1400px] mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black text-[#1a237e] mb-4 uppercase">Our Expert Faculty</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">Learn from the most experienced educators in the island, dedicated to your success.</p>
                </div>

                {featuredTeachers.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {featuredTeachers.map((tutor) => (
                            <div key={tutor.id} className="group bg-white p-6 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 text-center">
                                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-md group-hover:scale-105 transition-transform bg-indigo-50 flex items-center justify-center">
                                    {tutor.image ? (
                                        <img src={tutor.image} alt={tutor.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-3xl font-bold text-indigo-300">{tutor.name ? tutor.name[0] : '?'}</span>
                                    )}
                                </div>
                                <h3 className="text-xl font-bold text-[#1a237e] mb-1">{tutor.name || "Unnamed Tutor"}</h3>
                                <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider">{tutor.subject || "Subject TBD"}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-slate-400 italic">No featured teachers assigned yet.</p>
                )}

                <div className="mt-16 text-center">
                    <Link to="/all-tutors" className="inline-block bg-[#1a237e] text-white px-10 py-4 rounded-full font-bold hover:bg-blue-800 transition shadow-lg">
                        View All Tutors
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default TeachersHome;
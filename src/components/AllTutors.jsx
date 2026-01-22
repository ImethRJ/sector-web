import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

const AllTutors = () => {
    const [allTeachers, setAllTeachers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllTeachers = async () => {
            try {
                // Fetching all teachers, ordered by name
                const q = query(collection(db, "teachers"), orderBy("name", "asc"));
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

    if (loading) return <div className="py-24 text-center">Loading full faculty...</div>;

    return (
        <section className="py-24 bg-white px-6 min-h-screen">
            <div className="max-w-[1400px] mx-auto">
                <div className="mb-16">
                    <h2 className="text-4xl font-black text-[#1a237e] uppercase">Our Entire Faculty</h2>
                    <p className="text-gray-500 mt-2">Comprehensive list of all educators at Sector.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {allTeachers.map((tutor) => (
                        <div key={tutor.id} className="group bg-slate-50 p-6 rounded-[2.5rem] border border-slate-100 text-center">
                            <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-sm bg-indigo-50 flex items-center justify-center">
                                {tutor.image ? (
                                    <img src={tutor.image} alt={tutor.name} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-3xl font-bold text-indigo-300">{tutor.name ? tutor.name[0] : '?'}</span>
                                )}
                            </div>
                            <h3 className="text-xl font-bold text-[#1a237e] mb-1">{tutor.name}</h3>
                            <p className="text-blue-600 font-semibold text-sm uppercase">{tutor.subject}</p>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AllTutors;
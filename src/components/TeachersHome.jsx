import { Link } from 'react-router-dom';

const TeachersHome = () => {
    // This list is HARDCODED. It only changes if you edit this code manually.
    // Use this for your "Top 4" or Head Lecturers.
    const featuredTeachers = [
        { name: "Geethika Pradeep", subject: "History", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200" },
        { name: "Darshana Peiris", subject: "Commerce", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200" },
        { name: "Ranjan Fonseka", subject: "Sinhala", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200" },
        { name: "Champika Kumarasiri", subject: "Mathematics", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200" },
    ];

    return (
        <section id="Teachers" className="py-24 bg-slate-50 px-6">
            <div className="max-w-[1400px] mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black text-[#1a237e] mb-4 uppercase">Our Expert Faculty</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">Learn from the most experienced educators in the island, dedicated to your success.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuredTeachers.map((tutor, index) => (
                        <div key={index} className="group bg-white p-6 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 text-center">
                            <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-md group-hover:scale-105 transition-transform">
                                <img src={tutor.image} alt={tutor.name} className="w-full h-full object-cover" />
                            </div>
                            <h3 className="text-xl font-bold text-[#1a237e] mb-1">{tutor.name}</h3>
                            <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider">{tutor.subject}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    {/* Link to the new All Tutors Page */}
                    <Link to="/all-tutors" className="inline-block bg-[#1a237e] text-white px-10 py-4 rounded-full font-bold hover:bg-blue-800 transition shadow-lg">
                        View All Tutors
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default TeachersHome;
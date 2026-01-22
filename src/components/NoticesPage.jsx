import { useState } from 'react';
import { useData } from '../context/DataContext';

const NoticesPage = () => {
    const [filter, setFilter] = useState('All');
    const { notices, loading } = useData(); // Added loading state from Firebase context

    const categories = ['All', 'Academic', 'Exam', 'Holiday', 'General'];

    const filteredNotices = filter === 'All'
        ? notices
        : notices.filter(n => n.category === filter);

    // Helper to format date if it comes as a Firebase Timestamp or string
    const formatDate = (dateValue) => {
        if (!dateValue) return { day: '--', month: '---' };
        const date = new Date(dateValue);
        const month = date.toLocaleString('default', { month: 'short' });
        const day = date.getDate();
        return { day, month };
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a237e]"></div>
            </div>
        );
    }

    return (
        <section id="Notices" className="py-24 bg-slate-50 px-6 min-h-screen">
            <div className="max-w-[1200px] mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black text-[#1a237e] mb-4 uppercase">Important Notices</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">Stay updated with the latest announcements and academic news from Sector Institute.</p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2 rounded-full font-bold text-sm uppercase transition-all ${filter === cat
                                ? 'bg-[#1a237e] text-white shadow-lg'
                                : 'bg-white text-gray-600 border border-slate-200 hover:bg-slate-100'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Notices List */}
                <div className="space-y-6">
                    {filteredNotices.map((notice) => {
                        const { day, month } = formatDate(notice.date);
                        return (
                            <div
                                key={notice.id}
                                className="group bg-white p-6 md:p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-all border border-slate-100 flex flex-col md:flex-row md:items-center gap-6"
                            >
                                {/* Date Box */}
                                <div className="flex-shrink-0 w-24 h-24 bg-slate-50 rounded-3xl flex flex-col items-center justify-center border border-slate-100 group-hover:bg-blue-50 transition-colors">
                                    <span className="text-[#1a237e] font-black text-xl">{day}</span>
                                    <span className="text-blue-600 font-bold text-xs uppercase">{month}</span>
                                </div>

                                {/* Content */}
                                <div className="flex-grow">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${notice.isUrgent ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                                            }`}>
                                            {notice.category || 'General'} {notice.isUrgent && "• URGENT"}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#1a237e] mb-2">{notice.title}</h3>
                                    {/* Changed notice.description to notice.content to match AdminPage.jsx */}
                                    <p className="text-gray-500 leading-relaxed">{notice.content || notice.description}</p>
                                </div>

                                {/* Icon */}
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-[#1a237e]">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Empty State */}
                {filteredNotices.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-slate-300">
                        <p className="text-gray-400 font-medium">No notices found in this category.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default NoticesPage;
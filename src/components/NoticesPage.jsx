import { useData } from '../context/DataContext';
import { Bell, ArrowRight, Info, AlertTriangle } from 'lucide-react';

const NoticesPage = () => {
    const { notices, loading } = useData();

    const formatDate = (dateValue) => {
        if (!dateValue) return { day: '--', month: '---' };
        const date = new Date(dateValue);
        const month = date.toLocaleString('default', { month: 'short' });
        const day = date.getDate();
        return { day, month };
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc]">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-indigo-100 border-t-[#1a237e] rounded-full animate-spin"></div>
                    <Bell className="absolute inset-0 m-auto text-[#1a237e] animate-pulse" size={20} />
                </div>
                <p className="mt-6 text-[#1a237e] font-black uppercase tracking-[0.2em] text-xs">Syncing Bulletin...</p>
            </div>
        );
    }

    return (
        <section 
            id="Notices" 
            className="py-32 scroll-mt-32 bg-[#f8fafc] px-6 min-h-screen flex flex-col items-center justify-center overflow-hidden"
            aria-labelledby="notices-title"
        >
            <div className="max-w-[1100px] mx-auto w-full">
                <header className="text-center mb-20">
                    <div className="inline-flex items-center gap-3 bg-white px-5 py-2.5 rounded-full mb-6 shadow-sm border border-slate-100">
                        <Bell size={16} className="text-blue-600" />
                        <span className="text-blue-700 font-bold tracking-[0.2em] text-[10px] uppercase">News & Bulletin</span>
                    </div>
                    <h2 id="notices-title" className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1a237e] mb-6 uppercase tracking-tight">
                        Important <span className="text-blue-600">Notices</span>
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
                        Stay informed with the latest academic announcements and official news from Sector Institute.
                    </p>
                </header>

                <div className="space-y-8">
                    {notices.map((notice) => {
                        const { day, month } = formatDate(notice.date);
                        return (
                            <article
                                key={notice.id}
                                className={`group relative bg-white p-6 md:p-10 rounded-[3rem] shadow-[0_15px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_70px_rgba(26,35,126,0.08)] transition-all duration-500 border flex flex-col md:flex-row md:items-center gap-8 ${
                                    notice.isUrgent ? 'border-red-100 ring-2 ring-red-50' : 'border-slate-50'
                                }`}
                            >
                                {/* Date Component */}
                                <div className={`flex-shrink-0 w-24 h-24 rounded-[2rem] flex flex-col items-center justify-center border transition-all duration-500 ${
                                    notice.isUrgent 
                                    ? 'bg-red-50 border-red-100 group-hover:bg-red-600 group-hover:border-red-600' 
                                    : 'bg-slate-50 border-slate-100 group-hover:bg-[#1a237e] group-hover:border-[#1a237e]'
                                }`}>
                                    <span className={`font-black text-2xl transition-colors duration-500 ${
                                        notice.isUrgent ? 'text-red-600 group-hover:text-white' : 'text-[#1a237e] group-hover:text-white'
                                    }`}>{day}</span>
                                    <span className={`font-bold text-[10px] uppercase tracking-widest transition-colors duration-500 ${
                                        notice.isUrgent ? 'text-red-400 group-hover:text-red-100' : 'text-blue-500 group-hover:text-blue-100'
                                    }`}>{month}</span>
                                </div>

                                {/* Content Section */}
                                <div className="flex-grow space-y-3">
                                    {/* SEO: Category only renders if explicitly set or if urgent */}
                                    {(notice.category || notice.isUrgent) && (
                                        <div className="flex items-center gap-3">
                                            <span className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.15em] px-4 py-1.5 rounded-full ${
                                                notice.isUrgent 
                                                ? 'bg-red-100 text-red-600' 
                                                : 'bg-blue-50 text-blue-600'
                                            }`}>
                                                {notice.isUrgent && <AlertTriangle size={10} />}
                                                {notice.isUrgent ? "URGENT PRIORITY" : notice.category}
                                            </span>
                                        </div>
                                    )}
                                    <h3 className="text-2xl md:text-3xl font-black text-[#1a237e] tracking-tight group-hover:text-blue-700 transition-colors">
                                        {notice.title}
                                    </h3>
                                    <p className="text-slate-500 text-base md:text-lg leading-relaxed font-medium">
                                        {notice.content || notice.description}
                                    </p>
                                </div>

                                <div className="flex-shrink-0 self-end md:self-center">
                                    <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 ${
                                        notice.isUrgent ? 'bg-red-50 text-red-500' : 'bg-slate-50 text-[#1a237e]'
                                    } group-hover:translate-x-2 group-hover:bg-indigo-600 group-hover:text-white`}>
                                        <ArrowRight size={24} />
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>

                {notices.length === 0 && (
                    <div className="text-center py-24 bg-white rounded-[4rem] border-2 border-dashed border-slate-200 shadow-inner">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                           <Info size={40} />
                        </div>
                        <p className="text-slate-400 font-black uppercase tracking-widest text-xs">The bulletin is currently clear.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default NoticesPage;
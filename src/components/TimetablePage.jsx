import { useState } from 'react';
import { useData } from '../context/DataContext'; // Import this

const TimetablePage = () => {
    const [selectedDay, setSelectedDay] = useState('All');
    const { timetable } = useData(); // Get data from context

    const days = ['All', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Remove 'const schedule = [...]' array

    const filteredSchedule = selectedDay === 'All'
        ? timetable // Change schedule to timetable
        : timetable.filter(item => item.day === selectedDay);

    return (
        <section id="Timetable" className="py-24 bg-slate-50 px-6 min-h-screen">
            <div className="max-w-[1400px] mx-auto">
                {/* Header Section - Matched to TeachersHome */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black text-[#1a237e] mb-4 uppercase tracking-tight">Class Timetable</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">Plan your studies with our structured weekly schedule. All classes are held at our main campus labs and halls.</p>
                </div>

                {/* Day Filter - Styled like your Faculty buttons */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {days.map((day) => (
                        <button
                            key={day}
                            onClick={() => setSelectedDay(day)}
                            className={`px-6 py-2 rounded-full font-bold text-sm uppercase transition-all shadow-sm ${selectedDay === day
                                ? 'bg-[#1a237e] text-white shadow-lg'
                                : 'bg-white text-gray-600 hover:bg-slate-100 border border-slate-100'
                                }`}
                        >
                            {day}
                        </button>
                    ))}
                </div>

                {/* Timetable Cards - Matched to TeachersHome Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredSchedule.map((item, index) => (
                        <div key={index} className="group bg-white p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <span className="bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                                        {item.day}
                                    </span>
                                    <span className="text-[#1a237e] font-mono font-bold text-sm bg-slate-50 px-3 py-1 rounded-lg">
                                        {item.room}
                                    </span>
                                </div>

                                <h3 className="text-2xl font-black text-[#1a237e] mb-2">{item.subject}</h3>
                                <p className="text-gray-500 font-medium mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                                    {item.tutor}
                                </p>
                            </div>

                            <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between text-[#1a237e]">
                                <span className="font-bold text-lg">{item.time}</span>
                                <div className="p-2 bg-slate-50 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TimetablePage;
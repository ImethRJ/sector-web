import { useState } from 'react';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';

const AdminPage = () => {
    const {
        teachers, addTeacher, removeTeacher,
        notices, addNotice, removeNotice,
        timetable, addTimetableItem, removeTimetableItem
    } = useData();

    const [activeTab, setActiveTab] = useState('teachers');

    // Enhanced Delete Confirmation
    const confirmDelete = (id, type, callback) => {
        if (window.confirm(`Are you sure you want to remove this ${type}?`)) {
            callback(id);
        }
    };

    // Shared Form Input Style
    const inputClass = "w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all";

    return (
        <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                    <div>
                        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Admin Dashboard</h1>
                        <p className="text-slate-500 mt-1">Manage your institution's content and schedules.</p>
                    </div>
                    <Link to="/" className="px-5 py-2 bg-white text-slate-600 font-semibold rounded-lg border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors">
                        ← View Website
                    </Link>
                </header>

                {/* Navigation Tabs */}
                <nav className="flex bg-slate-200/50 p-1.5 rounded-2xl w-fit mb-10">
                    {['teachers', 'notices', 'timetable'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-8 py-2.5 rounded-xl font-bold text-sm uppercase transition-all ${activeTab === tab
                                    ? 'bg-white text-indigo-700 shadow-md'
                                    : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>

                <main className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* --- TEACHERS SECTION --- */}
                    {activeTab === 'teachers' && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <section className="lg:col-span-1">
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                    <h3 className="font-bold text-xl mb-6 text-slate-800">Add New Tutor</h3>
                                    <TeacherForm addTeacher={addTeacher} inputClass={inputClass} />
                                </div>
                            </section>

                            <section className="lg:col-span-2 space-y-4">
                                {teachers.length === 0 && <p className="text-slate-400 italic">No tutors found.</p>}
                                {teachers.map(t => (
                                    <div key={t.id} className="flex justify-between items-center p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center overflow-hidden">
                                                {t.image ? <img src={t.image} alt="" className="w-full h-full object-cover" /> : <span className="text-indigo-600 font-bold">{t.name[0]}</span>}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-800">{t.name}</p>
                                                <p className="text-sm text-indigo-600 font-medium">{t.subject}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => confirmDelete(t.id, 'teacher', removeTeacher)}
                                            className="px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors font-semibold"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </section>
                        </div>
                    )}

                    {/* ... Similar Logic for Notices and Timetable ... */}
                </main>
            </div>
        </div>
    );
};

// Extracted Sub-component for better readability
const TeacherForm = ({ addTeacher, inputClass }) => {
    const [form, setForm] = useState({ name: '', subject: '', image: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        addTeacher(form);
        setForm({ name: '', subject: '', image: '' });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input placeholder="Full Name" className={inputClass} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            <input placeholder="Subject Expertise" className={inputClass} value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} required />
            <input placeholder="Image URL (Optional)" className={inputClass} value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
            <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]">
                Register Tutor
            </button>
        </form>
    );
};

export default AdminPage;
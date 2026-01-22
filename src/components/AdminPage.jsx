// src/components/AdminPage.jsx
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

    // Form States
    const [newTeacher, setNewTeacher] = useState({ name: '', subject: '', image: '' });
    const [newNotice, setNewNotice] = useState({ title: '', description: '', date: '', category: 'General', isUrgent: false });
    const [newClass, setNewClass] = useState({ subject: '', tutor: '', time: '', room: '', day: 'Monday' });

    // Handlers
    const handleAddTeacher = (e) => {
        e.preventDefault();
        addTeacher(newTeacher);
        setNewTeacher({ name: '', subject: '', image: '' });
    };

    const handleAddNotice = (e) => {
        e.preventDefault();
        addNotice(newNotice);
        setNewNotice({ title: '', description: '', date: '', category: 'General', isUrgent: false });
    };

    const handleAddClass = (e) => {
        e.preventDefault();
        addTimetableItem(newClass);
        setNewClass({ subject: '', tutor: '', time: '', room: '', day: 'Monday' });
    };

    return (
        <div className="min-h-screen bg-slate-100 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-black text-[#1a237e]">Sector Admin Panel</h1>
                    <Link to="/" className="text-blue-600 hover:underline">← Back to Website</Link>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-8">
                    {['teachers', 'notices', 'timetable'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 rounded-full font-bold uppercase ${activeTab === tab ? 'bg-[#1a237e] text-white' : 'bg-white text-gray-500'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* --- TEACHERS TAB --- */}
                {activeTab === 'teachers' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Add Form */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm">
                            <h3 className="font-bold text-xl mb-4">Add New Tutor</h3>
                            <form onSubmit={handleAddTeacher} className="space-y-4">
                                <input placeholder="Name" className="w-full p-3 border rounded-lg" value={newTeacher.name} onChange={e => setNewTeacher({ ...newTeacher, name: e.target.value })} required />
                                <input placeholder="Subject" className="w-full p-3 border rounded-lg" value={newTeacher.subject} onChange={e => setNewTeacher({ ...newTeacher, subject: e.target.value })} required />
                                <input placeholder="Image URL" className="w-full p-3 border rounded-lg" value={newTeacher.image} onChange={e => setNewTeacher({ ...newTeacher, image: e.target.value })} />
                                <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700">Add Tutor</button>
                            </form>
                        </div>

                        {/* List */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
                            {teachers.map(t => (
                                <div key={t.id} className="flex justify-between items-center p-3 border rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                                            {t.image && <img src={t.image} alt="" className="w-full h-full object-cover" />}
                                        </div>
                                        <div>
                                            <p className="font-bold">{t.name}</p>
                                            <p className="text-xs text-gray-500">{t.subject}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => removeTeacher(t.id)} className="text-red-500 hover:text-red-700 font-bold">Delete</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- NOTICES TAB --- */}
                {activeTab === 'notices' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-2xl shadow-sm">
                            <h3 className="font-bold text-xl mb-4">Add Notice</h3>
                            <form onSubmit={handleAddNotice} className="space-y-4">
                                <input placeholder="Title" className="w-full p-3 border rounded-lg" value={newNotice.title} onChange={e => setNewNotice({ ...newNotice, title: e.target.value })} required />
                                <textarea placeholder="Description" className="w-full p-3 border rounded-lg" value={newNotice.description} onChange={e => setNewNotice({ ...newNotice, description: e.target.value })} required />
                                <div className="flex gap-2">
                                    <input type="text" placeholder="Date (e.g. Jan 20)" className="flex-1 p-3 border rounded-lg" value={newNotice.date} onChange={e => setNewNotice({ ...newNotice, date: e.target.value })} required />
                                    <select className="flex-1 p-3 border rounded-lg" value={newNotice.category} onChange={e => setNewNotice({ ...newNotice, category: e.target.value })}>
                                        <option>Academic</option><option>Exam</option><option>Holiday</option><option>General</option>
                                    </select>
                                </div>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" checked={newNotice.isUrgent} onChange={e => setNewNotice({ ...newNotice, isUrgent: e.target.checked })} />
                                    <span className="font-bold text-red-500">Urgent?</span>
                                </label>
                                <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700">Add Notice</button>
                            </form>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
                            {notices.map((n, idx) => (
                                <div key={idx} className="flex justify-between items-start p-3 border rounded-lg">
                                    <div>
                                        <p className="font-bold">{n.title}</p>
                                        <p className="text-xs text-gray-500">{n.date}</p>
                                    </div>
                                    <button onClick={() => removeNotice(idx)} className="text-red-500 hover:text-red-700 text-sm">Delete</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- TIMETABLE TAB --- */}
                {activeTab === 'timetable' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-2xl shadow-sm">
                            <h3 className="font-bold text-xl mb-4">Add Class</h3>
                            <form onSubmit={handleAddClass} className="space-y-4">
                                <select className="w-full p-3 border rounded-lg" value={newClass.day} onChange={e => setNewClass({ ...newClass, day: e.target.value })}>
                                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(d => <option key={d}>{d}</option>)}
                                </select>
                                <input placeholder="Subject" className="w-full p-3 border rounded-lg" value={newClass.subject} onChange={e => setNewClass({ ...newClass, subject: e.target.value })} required />
                                <input placeholder="Tutor Name" className="w-full p-3 border rounded-lg" value={newClass.tutor} onChange={e => setNewClass({ ...newClass, tutor: e.target.value })} required />
                                <input placeholder="Time (e.g. 08:30 AM - 10:30 AM)" className="w-full p-3 border rounded-lg" value={newClass.time} onChange={e => setNewClass({ ...newClass, time: e.target.value })} required />
                                <input placeholder="Room (e.g. Hall A)" className="w-full p-3 border rounded-lg" value={newClass.room} onChange={e => setNewClass({ ...newClass, room: e.target.value })} required />
                                <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700">Add to Timetable</button>
                            </form>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4 max-h-[500px] overflow-y-auto">
                            {timetable.map((t) => (
                                <div key={t.id} className="flex justify-between items-center p-3 border rounded-lg">
                                    <div>
                                        <p className="font-bold text-sm"><span className="text-blue-600">{t.day}</span> - {t.subject}</p>
                                        <p className="text-xs text-gray-500">{t.time}</p>
                                    </div>
                                    <button onClick={() => removeTimetableItem(t.id)} className="text-red-500 hover:text-red-700 text-sm">Delete</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPage;
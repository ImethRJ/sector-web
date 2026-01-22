import { useState, useEffect } from 'react'; // Added useEffect
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase"; // Adjust path

// --- FORM COMPONENTS (Moved outside to prevent re-mounting issues) ---

const TeacherForm = ({ onSubmit, editingItem, setEditingItem, inputClass }) => {
    const [form, setForm] = useState({ name: '', subject: '', image: '' });

    useEffect(() => {
        if (editingItem) setForm(editingItem);
        else setForm({ name: '', subject: '', image: '' });
    }, [editingItem]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
        setForm({ name: '', subject: '', image: '' });
        setEditingItem(null);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input placeholder="Full Name" className={inputClass} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            <input placeholder="Subject Expertise" className={inputClass} value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} required />
            <ImageUploadGroup value={form.image} onChange={(val) => setForm({ ...form, image: val })} inputClass={inputClass} />
            <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 shadow-lg transition-all">
                {editingItem ? 'Update Details' : 'Register Tutor'}
            </button>
            {editingItem && <button type="button" onClick={() => setEditingItem(null)} className="w-full text-slate-500 font-semibold py-2">Cancel</button>}
        </form>
    );
};

const NoticeForm = ({ onSubmit, editingItem, setEditingItem, inputClass }) => {
    const [form, setForm] = useState({ title: '', content: '', date: new Date().toISOString().split('T')[0] });

    useEffect(() => {
        if (editingItem) setForm(editingItem);
        else setForm({ title: '', content: '', date: new Date().toISOString().split('T')[0] });
    }, [editingItem]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
        setForm({ title: '', content: '', date: new Date().toISOString().split('T')[0] });
        setEditingItem(null);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input placeholder="Notice Title" className={inputClass} value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
            <textarea placeholder="Content" className={`${inputClass} h-32`} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} required />
            <input type="date" className={inputClass} value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />
            <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 shadow-lg transition-all">
                {editingItem ? 'Update Notice' : 'Post Notice'}
            </button>
            {editingItem && <button type="button" onClick={() => setEditingItem(null)} className="w-full text-slate-500 font-semibold py-2">Cancel</button>}
        </form>
    );
};

const TimetableForm = ({ onSubmit, editingItem, setEditingItem, inputClass }) => {
    const [form, setForm] = useState({ subject: '', day: 'Monday', startTime: '', endTime: '' });

    useEffect(() => {
        if (editingItem) setForm(editingItem);
        else setForm({ subject: '', day: 'Monday', startTime: '', endTime: '' });
    }, [editingItem]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
        setForm({ subject: '', day: 'Monday', startTime: '', endTime: '' });
        setEditingItem(null);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input placeholder="Subject" className={inputClass} value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} required />
            <select className={inputClass} value={form.day} onChange={e => setForm({ ...form, day: e.target.value })}>
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <div className="grid grid-cols-2 gap-2">
                <input type="time" className={inputClass} value={form.startTime} onChange={e => setForm({ ...form, startTime: e.target.value })} required />
                <input type="time" className={inputClass} value={form.endTime} onChange={e => setForm({ ...form, endTime: e.target.value })} required />
            </div>
            <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 shadow-lg transition-all">
                {editingItem ? 'Update Schedule' : 'Add to Timetable'}
            </button>
            {editingItem && <button type="button" onClick={() => setEditingItem(null)} className="w-full text-slate-500 font-semibold py-2">Cancel</button>}
        </form>
    );
};

// --- MAIN ADMIN PAGE ---

const AdminPage = () => {
    const {
        teachers, addTeacher, removeTeacher, updateTeacher,
        notices, addNotice, removeNotice, updateNotice,
        timetable, addTimetableItem, removeTimetableItem, updateTimetableItem
    } = useData();

    const [activeTab, setActiveTab] = useState('teachers');
    const [editingItem, setEditingItem] = useState(null);

    const confirmDelete = (id, type, callback) => {
        if (window.confirm(`Are you sure you want to remove this ${type}?`)) {
            callback(id);
        }
    };

    const inputClass = "w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-white";

    return (
        <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                    <div>
                        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Admin Dashboard</h1>
                        <p className="text-slate-500 mt-1">Manage content, schedules, and staff.</p>
                    </div>
                    <Link to="/" className="px-5 py-2 bg-white text-slate-600 font-semibold rounded-lg border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors">
                        ← View Website
                    </Link>
                </header>

                <nav className="flex bg-slate-200/50 p-1.5 rounded-2xl w-fit mb-10 overflow-x-auto">
                    {['teachers', 'notices', 'timetable'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => { setActiveTab(tab); setEditingItem(null); }}
                            className={`px-8 py-2.5 rounded-xl font-bold text-sm uppercase transition-all whitespace-nowrap ${activeTab === tab ? 'bg-white text-indigo-700 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>

                <main>
                    {/* --- TEACHERS SECTION --- */}
                    {activeTab === 'teachers' && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-1">
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-8">
                                    <h3 className="font-bold text-xl mb-6 text-slate-800">{editingItem ? 'Update Tutor' : 'Add New Tutor'}</h3>
                                    <TeacherForm
                                        onSubmit={editingItem ? updateTeacher : addTeacher}
                                        editingItem={editingItem}
                                        setEditingItem={setEditingItem}
                                        inputClass={inputClass}
                                    />
                                </div>
                            </div>
                            <div className="lg:col-span-2 space-y-3">
                                {teachers.map(t => (
                                    <ListItem
                                        key={t.id}
                                        title={t.name}
                                        subtitle={t.subject}
                                        image={t.image}
                                        onEdit={() => setEditingItem(t)}
                                        onDelete={() => confirmDelete(t.id, 'teacher', removeTeacher)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* --- NOTICES SECTION --- */}
                    {activeTab === 'notices' && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-1">
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-8">
                                    <h3 className="font-bold text-xl mb-6 text-slate-800">{editingItem ? 'Update Notice' : 'Post Notice'}</h3>
                                    <NoticeForm
                                        onSubmit={editingItem ? updateNotice : addNotice}
                                        editingItem={editingItem}
                                        setEditingItem={setEditingItem}
                                        inputClass={inputClass}
                                    />
                                </div>
                            </div>
                            <div className="lg:col-span-2 space-y-3">
                                {notices.map(n => (
                                    <ListItem
                                        key={n.id}
                                        title={n.title}
                                        subtitle={n.date}
                                        onEdit={() => setEditingItem(n)}
                                        onDelete={() => confirmDelete(n.id, 'notice', removeNotice)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* --- TIMETABLE SECTION --- */}
                    {activeTab === 'timetable' && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-1">
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-8">
                                    <h3 className="font-bold text-xl mb-6 text-slate-800">{editingItem ? 'Update Schedule' : 'Add Schedule'}</h3>
                                    <TimetableForm
                                        onSubmit={editingItem ? updateTimetableItem : addTimetableItem}
                                        editingItem={editingItem}
                                        setEditingItem={setEditingItem}
                                        inputClass={inputClass}
                                    />
                                </div>
                            </div>
                            <div className="lg:col-span-2 space-y-3">
                                {timetable.map(item => (
                                    <ListItem
                                        key={item.id}
                                        title={`${item.subject} (${item.day})`}
                                        subtitle={`${item.startTime} - ${item.endTime}`}
                                        onEdit={() => setEditingItem(item)}
                                        onDelete={() => confirmDelete(item.id, 'schedule', removeTimetableItem)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

// --- SHARED UI COMPONENTS ---

const ListItem = ({ title, subtitle, image, onEdit, onDelete }) => (
    <div className="flex justify-between items-center p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4">
            {image !== undefined && (
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center overflow-hidden border border-slate-100">
                    {image ? <img src={image} alt="" className="w-full h-full object-cover" /> : <span className="text-indigo-600 font-bold">{title[0]}</span>}
                </div>
            )}
            <div>
                <p className="font-bold text-slate-800">{title}</p>
                <p className="text-sm text-indigo-600 font-medium">{subtitle}</p>
            </div>
        </div>
        <div className="flex gap-2">
            <button onClick={onEdit} className="px-3 py-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors font-semibold text-sm">Edit</button>
            <button onClick={onDelete} className="px-3 py-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors font-semibold text-sm">Remove</button>
        </div>
    </div>
);

const ImageUploadGroup = ({ value, onChange, inputClass }) => {
    const [useUrl, setUseUrl] = useState(true);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Check file size (optional: e.g., limit to 2MB)
        if (file.size > 2 * 1024 * 1024) {
            alert("File is too large. Please choose an image under 2MB.");
            return;
        }

        try {
            setUploading(true);

            // 1. Create a unique reference in Storage
            const storageRef = ref(storage, `teachers/${Date.now()}_${file.name}`);

            // 2. Upload the file
            const snapshot = await uploadBytes(storageRef, file);

            // 3. Get the public URL
            const downloadURL = await getDownloadURL(snapshot.ref);

            // 4. Update the form state with the URL
            onChange(downloadURL);
            setUploading(false);
        } catch (error) {
            console.error("Upload error:", error);
            setUploading(false);
            alert("Upload failed. Check your Firebase Storage rules.");
        }
    };

    return (
        <div className="space-y-2">
            <div className="flex gap-4 mb-2">
                <button type="button" onClick={() => setUseUrl(true)} className={`text-xs font-bold uppercase ${useUrl ? 'text-indigo-600' : 'text-slate-400'}`}>URL</button>
                <button type="button" onClick={() => setUseUrl(false)} className={`text-xs font-bold uppercase ${!useUrl ? 'text-indigo-600' : 'text-slate-400'}`}>Upload</button>
            </div>
            {useUrl ? (
                <input placeholder="Image URL" className={inputClass} value={value || ''} onChange={e => onChange(e.target.value)} />
            ) : (
                <div className="flex flex-col gap-2">
                    <input type="file" accept="image/*" className={inputClass} onChange={handleFileChange} disabled={uploading} />
                    {uploading && <p className="text-xs text-indigo-600 font-bold animate-pulse">Uploading to Storage...</p>}
                </div>
            )}
        </div>
    );
};

export default AdminPage;
import { useState } from 'react';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import imageCompression from 'browser-image-compression';

// --- FORM COMPONENTS ---

const TeacherForm = ({ onSubmit, editingItem, setEditingItem, inputClass }) => {
    const [form, setForm] = useState(editingItem || { name: '', subject: '', image: '', isFeatured: false });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
        setForm({ name: '', subject: '', image: '', isFeatured: false });
        setEditingItem(null);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input placeholder="Full Name" className={inputClass} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            <input placeholder="Subject Expertise" className={inputClass} value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} required />
            <ImageUploadGroup value={form.image} onChange={(val) => setForm({ ...form, image: val })} inputClass={inputClass} />

            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <input
                    type="checkbox"
                    id="isFeatured"
                    className="w-5 h-5 accent-indigo-600"
                    checked={form.isFeatured}
                    onChange={e => setForm({ ...form, isFeatured: e.target.checked })}
                />
                <label htmlFor="isFeatured" className="text-sm font-bold text-slate-700 cursor-pointer">
                    Show on Homepage (Featured)
                </label>
            </div>

            <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 shadow-lg transition-all">
                {editingItem ? 'Update Details' : 'Register Tutor'}
            </button>
            {editingItem && (
                <button type="button" onClick={() => setEditingItem(null)} className="w-full text-slate-500 font-semibold py-2">
                    Cancel Edit
                </button>
            )}
        </form>
    );
};

const NoticeForm = ({ onSubmit, editingItem, setEditingItem, inputClass }) => {
    const [form, setForm] = useState(editingItem || { title: '', content: '', date: new Date().toISOString().split('T')[0] });

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

// --- MAIN ADMIN PAGE ---

const AdminPage = () => {
    const {
        teachers, addTeacher, removeTeacher, updateTeacher, updateTeachersOrder,
        notices, addNotice, removeNotice, updateNotice
    } = useData();

    const [activeTab, setActiveTab] = useState('teachers');
    const [editingItem, setEditingItem] = useState(null);

    // --- REORDER LOGIC ---
    const handleMoveTeacher = (index, direction) => {
        const newItems = [...teachers];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;

        if (targetIndex < 0 || targetIndex >= newItems.length) return;

        // Swap positions
        [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];

        // Save to DataContext (and eventually Firebase)
        updateTeachersOrder(newItems);
    };

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
                        <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Admin Dashboard</h2>
                        <p className="text-slate-500 mt-1">Manage institute content and staff.</p>
                    </div>
                    <Link to="/" className="px-5 py-2 bg-white text-slate-600 font-semibold rounded-lg border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors">
                        ← View Website
                    </Link>
                </header>

                <nav className="flex bg-slate-200/50 p-1.5 rounded-2xl w-fit mb-10 overflow-x-auto">
                    {['teachers', 'notices'].map(tab => (
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
                    {activeTab === 'teachers' && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-1">
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-8">
                                    <h3 className="font-bold text-xl mb-6 text-slate-800">{editingItem ? 'Update Tutor' : 'Add New Tutor'}</h3>
                                    <TeacherForm
                                        key={editingItem ? editingItem.id : 'new-teacher'}
                                        onSubmit={editingItem ? updateTeacher : addTeacher}
                                        editingItem={editingItem}
                                        setEditingItem={setEditingItem}
                                        inputClass={inputClass}
                                    />
                                </div>
                            </div>
                            <div className="lg:col-span-2 space-y-3">
                                <div className="flex justify-between items-center mb-2 px-2">
                                    <p className="text-xs font-bold text-slate-400 uppercase">Current Staff Order</p>
                                    <p className="text-[10px] text-slate-400 italic text-right leading-tight">Featured staff will appear first on home <br /> followed by others in this order.</p>
                                </div>
                                {teachers.map((t, index) => (
                                    <ListItem
                                        key={t.id}
                                        title={t.name}
                                        subtitle={t.isFeatured ? `⭐ Featured - ${t.subject}` : t.subject}
                                        image={t.image}
                                        onEdit={() => setEditingItem(t)}
                                        onDelete={() => confirmDelete(t.id, 'teacher', removeTeacher)}
                                        onMoveUp={index > 0 ? () => handleMoveTeacher(index, 'up') : null}
                                        onMoveDown={index < teachers.length - 1 ? () => handleMoveTeacher(index, 'down') : null}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'notices' && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-1">
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-8">
                                    <h3 className="font-bold text-xl mb-6 text-slate-800">{editingItem ? 'Update Notice' : 'Post Notice'}</h3>
                                    <NoticeForm
                                        key={editingItem ? editingItem.id : 'new-notice'}
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
                </main>
            </div>
        </div>
    );
};

// --- SHARED UI COMPONENTS ---

const ListItem = ({ title, subtitle, image, onEdit, onDelete, onMoveUp, onMoveDown }) => (
    <div className="flex justify-between items-center p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4">
            {/* Reorder Arrows (Only if handlers are passed) */}
            {(onMoveUp || onMoveDown) && (
                <div className="flex flex-col items-center bg-slate-50 rounded-lg p-1 border border-slate-100">
                    <button
                        disabled={!onMoveUp}
                        onClick={onMoveUp}
                        className={`p-1 hover:text-indigo-600 transition-colors ${!onMoveUp ? 'text-slate-200 cursor-not-allowed' : 'text-slate-400'}`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 15l7-7 7 7"></path></svg>
                    </button>
                    <button
                        disabled={!onMoveDown}
                        onClick={onMoveDown}
                        className={`p-1 hover:text-indigo-600 transition-colors ${!onMoveDown ? 'text-slate-200 cursor-not-allowed' : 'text-slate-400'}`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                </div>
            )}

            {image !== undefined && (
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center overflow-hidden border border-slate-100">
                    {image ? <img src={image} alt="" className="w-full h-full object-cover" /> : <span className="text-indigo-600 font-bold">{title ? title[0] : '?'}</span>}
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

        // Compress Image Logic
        const options = {
            maxSizeMB: 0.5, // Verify this limit with user if needed
            maxWidthOrHeight: 1200,
            useWebWorker: true,
        };

        try {
            setUploading(true);
            const compressedFile = await imageCompression(file, options);

            // Generate a unique name for the file
            const fileName = `teachers/${Date.now()}_${compressedFile.name}`;
            const storageRef = ref(storage, fileName);

            const snapshot = await uploadBytes(storageRef, compressedFile);
            const downloadURL = await getDownloadURL(snapshot.ref);
            onChange(downloadURL);
            setUploading(false);
        } catch (error) {
            console.error("Upload/Compression error:", error);
            setUploading(false);
            alert("Upload failed. Try a different image.");
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
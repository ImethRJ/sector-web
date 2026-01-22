import { createContext, useState, useEffect, useContext } from 'react';
import { db } from '../firebase'; // Ensure you have your firebase.js config file
import {
    collection,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    query,
    orderBy
} from 'firebase/firestore';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [teachers, setTeachers] = useState([]);
    const [notices, setNotices] = useState([]);
    const [timetable, setTimetable] = useState([]);
    const [loading, setLoading] = useState(true);

    // --- 1. Real-time Listeners (Syncing Cloud -> UI) ---
    useEffect(() => {
        // Listen to Notices (Ordered by latest first)
        const qNotices = query(collection(db, "notices"), orderBy("date", "desc"));
        const unsubNotices = onSnapshot(qNotices, (snapshot) => {
            setNotices(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        });

        // Listen to Teachers
        const unsubTeachers = onSnapshot(collection(db, "teachers"), (snapshot) => {
            setTeachers(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        });

        // Listen to Timetable
        const unsubTimetable = onSnapshot(collection(db, "timetable"), (snapshot) => {
            setTimetable(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            setLoading(false);
        });

        // Cleanup listeners when app unmounts
        return () => {
            unsubNotices();
            unsubTeachers();
            unsubTimetable();
        };
    }, []);

    // --- 2. Actions (Writing UI -> Cloud) ---

    const addTeacher = async (teacher) => {
        try {
            await addDoc(collection(db, "teachers"), teacher);
        } catch (err) { console.error("Error adding teacher:", err); }
    };

    const removeTeacher = async (id) => {
        try {
            await deleteDoc(doc(db, "teachers", id));
        } catch (err) { console.error("Error removing teacher:", err); }
    };

    const addNotice = async (notice) => {
        try {
            await addDoc(collection(db, "notices"), {
                ...notice,
                createdAt: new Date() // Useful for sorting
            });
        } catch (err) { console.error("Error adding notice:", err); }
    };

    const removeNotice = async (id) => {
        try {
            await deleteDoc(doc(db, "notices", id));
        } catch (err) { console.error("Error removing notice:", id, err); }
    };

    const addTimetableItem = async (item) => {
        try {
            await addDoc(collection(db, "timetable"), item);
        } catch (err) { console.error("Error adding timetable item:", err); }
    };

    const removeTimetableItem = async (id) => {
        try {
            await deleteDoc(doc(db, "timetable", id));
        } catch (err) { console.error("Error removing timetable item:", err); }
    };

    return (
        <DataContext.Provider value={{
            teachers, notices, timetable, loading,
            addTeacher, removeTeacher,
            addNotice, removeNotice,
            addTimetableItem, removeTimetableItem
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
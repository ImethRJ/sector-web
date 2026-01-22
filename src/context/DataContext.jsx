import { createContext, useState, useEffect, useContext } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc, query, orderBy } from 'firebase/firestore';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [teachers, setTeachers] = useState([]);
    const [notices, setNotices] = useState([]);
    const [timetable, setTimetable] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const qNotices = query(collection(db, "notices"), orderBy("createdAt", "desc"));
        const unsubNotices = onSnapshot(qNotices, (snapshot) => {
            setNotices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        const unsubTeachers = onSnapshot(collection(db, "teachers"), (snapshot) => {
            setTeachers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        const unsubTimetable = onSnapshot(collection(db, "timetable"), (snapshot) => {
            setTimetable(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        });

        return () => { unsubNotices(); unsubTeachers(); unsubTimetable(); };
    }, []);

    // Helper for Updates
    const updateFirebaseDoc = async (col, id, updatedData) => {
        const docRef = doc(db, col, id);
        const dataToSave = { ...updatedData };
        delete dataToSave.id; // Firebase doesn't want the ID inside the document
        await updateDoc(docRef, dataToSave);
    };

    const addTeacher = async (teacher) => await addDoc(collection(db, "teachers"), teacher);
    const updateTeacher = async (teacher) => await updateFirebaseDoc("teachers", teacher.id, teacher);
    const removeTeacher = async (id) => await deleteDoc(doc(db, "teachers", id));

    const addNotice = async (notice) => await addDoc(collection(db, "notices"), { ...notice, createdAt: new Date() });
    const updateNotice = async (notice) => await updateFirebaseDoc("notices", notice.id, notice);
    const removeNotice = async (id) => await deleteDoc(doc(db, "notices", id));

    const addTimetableItem = async (item) => await addDoc(collection(db, "timetable"), item);
    const updateTimetableItem = async (item) => await updateFirebaseDoc("timetable", item.id, item);
    const removeTimetableItem = async (id) => await deleteDoc(doc(db, "timetable", id));

    return (
        <DataContext.Provider value={{
            teachers, notices, timetable, loading,
            addTeacher, removeTeacher, updateTeacher,
            addNotice, removeNotice, updateNotice,
            addTimetableItem, removeTimetableItem, updateTimetableItem
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
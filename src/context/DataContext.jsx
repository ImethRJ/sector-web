import { createContext, useState, useEffect, useContext } from 'react';
import { db } from '../firebase';
import {
    collection,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    query,
    orderBy,
    updateDoc,
    writeBatch // Added writeBatch for efficient bulk updates
} from 'firebase/firestore';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [teachers, setTeachers] = useState([]);
    const [notices, setNotices] = useState([]);
    const [timetable, setTimetable] = useState([]);
    const [loading, setLoading] = useState(true);

    // --- 1. Real-time Listeners ---
    useEffect(() => {
        // Updated Teachers Listener: Now sorts by 'orderIndex'
        const qTeachers = query(collection(db, "teachers"), orderBy("orderIndex", "asc"));
        const unsubTeachers = onSnapshot(qTeachers, (snapshot) => {
            setTeachers(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        });

        const qNotices = query(collection(db, "notices"), orderBy("date", "desc"));
        const unsubNotices = onSnapshot(qNotices, (snapshot) => {
            setNotices(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        });

        const unsubTimetable = onSnapshot(collection(db, "timetable"), (snapshot) => {
            setTimetable(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            setLoading(false);
        });

        return () => {
            unsubNotices();
            unsubTeachers();
            unsubTimetable();
        };
    }, []);

    // --- 2. Actions ---

    const addTeacher = async (teacherData) => {
        try {
            // Logic: New teachers are added to the end of the list
            const currentMaxOrder = teachers.length > 0 
                ? Math.max(...teachers.map(t => t.orderIndex || 0)) 
                : -1;

            await addDoc(collection(db, "teachers"), {
                name: teacherData.name,
                subject: teacherData.subject,
                image: teacherData.image,
                isFeatured: teacherData.isFeatured || false,
                orderIndex: currentMaxOrder + 1, // Set order as last
                createdAt: new Date()
            });
        } catch (error) {
            console.error("Error adding teacher:", error);
        }
    };

    // NEW: Update Multiple Teachers Order (Used by handleMove in AdminPage)
    const updateTeachersOrder = async (newOrderArray) => {
        try {
            const batch = writeBatch(db);
            
            // We loop through the new array and update each teacher's orderIndex
            newOrderArray.forEach((teacher, index) => {
                const docRef = doc(db, "teachers", teacher.id);
                batch.update(docRef, { orderIndex: index });
            });

            await batch.commit(); // Saves all changes in one single request
        } catch (error) {
            console.error("Error updating order:", error);
        }
    };

    const removeTeacher = async (id) => {
        try {
            await deleteDoc(doc(db, "teachers", id));
        } catch (err) { console.error("Error removing teacher:", err); }
    };

    const updateTeacher = async (teacherData) => {
        try {
            const teacherRef = doc(db, "teachers", teacherData.id);
            await updateDoc(teacherRef, {
                name: teacherData.name,
                subject: teacherData.subject,
                image: teacherData.image,
                isFeatured: teacherData.isFeatured
            });
        } catch (error) {
            console.error("Error updating teacher:", error);
        }
    };

    // --- Notice & Timetable Actions (Stay the same) ---
    const addNotice = async (notice) => {
        try { await addDoc(collection(db, "notices"), { ...notice, createdAt: new Date() }); } 
        catch (err) { console.error("Error adding notice:", err); }
    };

    const removeNotice = async (id) => {
        try { await deleteDoc(doc(db, "notices", id)); } 
        catch (err) { console.error("Error removing notice:", err); }
    };

    const updateNotice = async (notice) => {
        try {
            const { id, ...data } = notice;
            await updateDoc(doc(db, "notices", id), data);
        } catch (err) { console.error("Error updating notice:", err); }
    };

    const addTimetableItem = async (item) => {
        try { await addDoc(collection(db, "timetable"), item); } 
        catch (err) { console.error("Error adding timetable item:", err); }
    };

    const removeTimetableItem = async (id) => {
        try { await deleteDoc(doc(db, "timetable", id)); } 
        catch (err) { console.error("Error removing timetable item:", err); }
    };

    const updateTimetableItem = async (item) => {
        try {
            const { id, ...data } = item;
            await updateDoc(doc(db, "timetable", id), data);
        } catch (err) { console.error("Error updating timetable:", err); }
    };

    return (
        <DataContext.Provider value={{
            teachers, notices, timetable, loading,
            addTeacher, removeTeacher, updateTeacher, updateTeachersOrder, // Added updateTeachersOrder
            addNotice, removeNotice, updateNotice,
            addTimetableItem, removeTimetableItem, updateTimetableItem
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
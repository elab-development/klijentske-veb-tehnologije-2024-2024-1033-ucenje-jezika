// react imports
import { useState, useEffect, useRef } from "react";

// firebase
import { db } from '../firebase/config';
import { collection, onSnapshot, query, where } from "firebase/firestore";

export const useCollection = (firestoreCollection, _query) => {
    const [documents, setDocuments] = useState(null);

    // set up query
    const q = useRef(_query).current;

    useEffect(() => {
        let ref = collection(db, firestoreCollection);

        if (q) {
            ref = query(ref, where(...q));
        }

        const unsub = onSnapshot(ref, (snapshot) => {
            let results = [];
            snapshot.docs.forEach(doc => {
                results.push({...doc.data(), id: doc.id});
            });
            setDocuments(results);
        });

        return () => unsub();
    }, [firestoreCollection, q]);

    return { documents }
}
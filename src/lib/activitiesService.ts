"use client";
import { Activities } from "@/app/types/types";
import { db } from "./firebaseConfig";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    updateDoc,
    serverTimestamp,
    query,
    orderBy,
    getDocs,
    where,
} from "firebase/firestore";
type ActivityParamType = {
    type: string;
    title: string;
    message: string;
}
const activitiesRef = collection(db, "activities");

export const addActivity = async ({ type, title, message = ""  }: ActivityParamType) => {
    await addDoc(collection(db, "activities"), {
        type: type,
        title: title,
        message: message,
        time: serverTimestamp(),
    });
}

export const getActivities = (callback: (activities: Activities[]) => void) => {
    const q = query(activitiesRef, orderBy("time", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
        const activitiesData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        callback(activitiesData as Activities[]);

        console.log(activitiesData)
    });
    return unsubscribe;
}



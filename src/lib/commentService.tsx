"use client";
import { User } from "firebase/auth";
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

interface CommentType {
    postId: string;
    user: User | null;
    commentText: string;
}

const commentsRef = collection(db, "comments");

export const addComment = async ({
    postId,
    user,
    commentText,
}: CommentType) => {
    if (!user) return console.log("⚠️ No user logged in");

    try {
        const commentsRef = collection(db, "posts", postId, "comments");

        const data = {
            userId: user.uid,
            username: user.displayName,
            commentText,
            createdAt: serverTimestamp(),
        };

        const docRef = await addDoc(commentsRef, data);
        console.log("✅ Comment added with ID:", docRef.id);
    } catch (err) {
        console.log("❌ Error adding comment:", err);
    }
};
// ✅ Subscribe to posts in realtime
export const getComments = (postId: string, callback: (comments: any[]) => void) => {
    const commentsRef = collection(db, "posts", postId, "comments");
    const q = query(commentsRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
        const commentsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        callback(commentsData);
    });

    return unsubscribe;
};



// Add reply functionality
export const addReply = async ({
    postId,
    commentId,
    user,
    replyText,
}: {
    postId: string;
    commentId: string;
    user: User | null;
    replyText: string;
}) => {
    try {
        const repliesRef = collection(db, "posts", postId, "comments", commentId, "replies");

        const data = {
            userId: user?.uid,
            username: user?.displayName,
            replyText,
            createdAt: serverTimestamp(),
        };

        const docRef = await addDoc(repliesRef, data);
        console.log("✅ Reply added with ID:", docRef.id);
        return docRef.id;
    } catch (err) {
        console.error("❌ Error adding reply:", err);
    }
};

export const getReplies = (postId: string, commentId: string, callback: (replies: any[]) => void) => {
    const repliesRef = collection(db, "posts", postId, "comments", commentId, "replies");
    return onSnapshot(repliesRef, (snapshot) => {
        const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(list);
    });
};

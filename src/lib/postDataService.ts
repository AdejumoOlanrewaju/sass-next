"use client";
import { db } from "./firebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
  serverTimestamp,
  query,
  orderBy,
  getDocs,
  where,
  getDoc,
} from "firebase/firestore";

import { User } from "firebase/auth";


const postsRef = collection(db, "posts");

// ✅ Add new post
export const addPost = async (data: any) => {
  try {
    const docRef = await addDoc(postsRef, {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    console.log("✅ Post added with ID:", docRef.id);
  } catch (error) {
    console.error("❌ Error adding post:", error);
  }
};

// ✅ Subscribe to posts in realtime
export const getPosts = (callback: (posts: any[]) => void) => {
  const q = query(postsRef, orderBy("createdAt", "desc"));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const postsData = snapshot.docs.map((doc) => ({
      dbID: doc.id,
      ...doc.data(),
    }));
    callback(postsData);
  });
  return unsubscribe;
};

// ✅ Update post
export const updatePost = async (id: string, data: any) => {
  try {
    const docRef = doc(db, "posts", id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
    console.log("✏️ Post updated:", id);
  } catch (error) {
    console.error("❌ Error updating post:", error);
  }
};

// ✅ Delete post
export const deletePost = async (id: string) => {
  try {
    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef);
    console.log("🗑️ Post deleted:", id);
  } catch (error) {
    console.error("❌ Error deleting post:", error);
  }
};

export const getPostViewsBySlug = async (slug: string) => {
  const q = query(collection(db, "posts"), where("slug", "==", slug));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const postDoc = querySnapshot.docs[0];
    const postData = postDoc.data();

    // prevent multiple counts per user/session
    const viewedKey = `viewed_${slug}`;
    if (!localStorage.getItem(viewedKey)) {
      await updateDoc(postDoc.ref, { views: (postData.views || 0) + 1 });
      localStorage.setItem(viewedKey, 'true');
    }

    return { id: postDoc.id, ...postData };
  } else {
    return null;
  }
};

// ✅ Subscribe to posts in realtime
export const getSubscribers = (callback: (subscribers: any[]) => void) => {
  const subscriberRef = collection(db, "subscribers");
  const q = query(subscriberRef, orderBy("createdAt", "desc"));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const subscriberData = snapshot.docs.map((doc) => ({
      dbID: doc.id,
      ...doc.data(),
    }));
    callback(subscriberData);
  });
  return unsubscribe;
};

/** Toggle like for a post */
export const togglePostLike = async (postId: string, user: User | null) => {
  if (!user) return;

  const likeRef = doc(db, "posts", postId, "likes", user.uid);
  const snapshot = await getDoc(likeRef);

  if (snapshot.exists()) {
    // If user already liked, unlike
    await deleteDoc(likeRef);
    console.log("💔 Post unliked");
    return false;
  } else {
    // If not liked, add like
    await setDoc(likeRef, {
      userId: user.uid,
      username: user.displayName,
      createdAt: new Date(),
    });
    console.log("❤️ Post liked");
    return true;
  }
};

export const getPostLikes = async (postId: string) => {
  const likesRef = collection(db, "posts", postId, "likes");
  const snapshot = await getDocs(likesRef);
  return snapshot.size; // total like count
};

export const hasUserLikedPost = async (postId: string, userId: string) => {
  const likeRef = doc(db, "posts", postId, "likes", userId);
  const snapshot = await getDoc(likeRef);
  return snapshot.exists();
};

export const getEngagementRate = async () => {
  const postsRef = collection(db, "posts");
  const commentsRef = collection(db, "comments");

  const [postSnap, commentSnap] = await Promise.all([
    getDocs(postsRef),
    getDocs(commentsRef),
  ]);

  const posts = postSnap.docs.map((doc) => doc.data());
  const totalPosts = posts.length;
  const totalLikes = posts.reduce((acc, post: any) => acc + (post.likeCount || 0), 0);
  const totalComments = commentSnap.size;

  if (totalPosts === 0) return null;

  const engagementRate = ((totalLikes + totalComments) / totalPosts).toFixed(2);
  return engagementRate;
};





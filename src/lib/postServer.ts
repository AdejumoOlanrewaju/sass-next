import { getFirestore } from "firebase-admin/firestore";
import admin from "firebase-admin";
import { Posts } from "@/app/types/types";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

export const db = getFirestore();

export async function getPostsServer() {
  const snapshot = await db.collection("posts").orderBy("createdAt", "desc").get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as unknown as Posts[];
}

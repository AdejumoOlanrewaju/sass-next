import { getDocs, collection, orderBy, query } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { Posts } from "@/app/types/types";

export async function getPostsServer(): Promise<Posts[]> {
  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    dbID: doc.id,
    ...doc.data(),
  })) as Posts[];
}

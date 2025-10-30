import { doc, setDoc, serverTimestamp, collection, query, orderBy, onSnapshot, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebaseConfig";
import { signInWithEmailAndPassword, User, signOut } from "firebase/auth";

// ✅ Store user only if they don’t exist yet
export const storeUserInfo = async (user: User | null) => {
  if (!user) return;

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      username: user.displayName,
      email: user.email,
      createdAt: serverTimestamp(),
    });
  } else {
    return null
  }
};

// ✅ Subscribe to posts in realtime
export const getUserInfo = (callback: (users: any[]) => void) => {
  const collectionRef = collection(db, "users");
  const q = query(collectionRef, orderBy("createdAt", "desc"));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const userData = snapshot.docs.map((doc) => ({
      dbID: doc.id,
      ...doc.data(),
    }));
    callback(userData);
  });
  return unsubscribe;
};

export const adminLogin = async (email: string, password: string): Promise<{ user: User, isAdmin: boolean } | null> => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Option A: Simple check by email
    if (user.email === "admin@telexcrimson.com") {
        return { user, isAdmin: true };
    }

    return null

};


export const logoutAdmin = async () => {
    await signOut(auth);
};

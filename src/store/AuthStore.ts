import { create } from "zustand";
import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    User,
    updateProfile,
} from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";

interface AuthState {
    user: User | null;
    loading: boolean;
    loginWithGoogle: () => Promise<User>;
    signupWithEmail: (email: string, password: string, username: string) => Promise<User>;
    loginWithEmail: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    setUser: (user: User | null) => void;
    setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    loading: true,

    // 🔹 Google sign-in
    loginWithGoogle: async () => {
        set({ loading: true });
        try {
            const provider = new GoogleAuthProvider();
            const userCredential = await signInWithPopup(auth, provider);
            const user = userCredential.user

            return user
        } catch (error) {
            console.error("Google login error:", error);
            throw error;
        } finally {
            set({ loading: false });
        }
    },

    // 🔹 Email/password sign-up
    signupWithEmail: async (email, password, username) => {
        set({ loading: true });
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // ✅ Add the name to the Firebase Auth profile
            await updateProfile(user, {
                displayName: username,
            });

            return user;
        } catch (error) {
            console.error("Signup error:", error);
            throw error; // important so the UI can catch it
        } finally {
            set({ loading: false });
        }
    },

    // 🔹 Email/password login
    loginWithEmail: async (email, password) => {
        set({ loading: true });
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        } finally {
            set({ loading: false });
        }
    },

    // 🔹 Logout
    logout: async () => {
        set({ loading: true });
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Logout error:", error);
            throw error;
        } finally {
            set({ loading: false });
        }
    },

    setUser: (user) => set({ user, loading: false }),
    setLoading: (loading) => set({ loading }),
}));

// 🔹 Watch for authentication state changes
onAuthStateChanged(auth, (user) => {
    useAuthStore.setState({ user, loading: false });
});

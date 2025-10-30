import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebaseConfig";
import { useRouter } from "next/navigation";

export default function useAdminAuthGuard() {
  const router = useRouter();
  const [authLoading, setAuthLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (!user) {
          router.replace("/admin/login");
          return;
        }

        // --- Option 1: Check custom admin claim ---
        const token = await user.getIdTokenResult();
        if (token.claims.admin) {
          setIsAdmin(true);
          setAuthLoading(false);
          return;
        }
      } catch (error) {
        console.error("Admin auth check failed:", error);
        router.replace("/admin/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  return { authLoading, isAdmin };
}

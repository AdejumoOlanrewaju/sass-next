// scripts/setAdminRole.ts
import { adminAuth } from "../lib/firebaseAdmin";

async function setAdminRole(uid: string) {
  await adminAuth.setCustomUserClaims(uid, { admin: true });
  console.log(`✅ Admin claim set for user with UID: ${uid}`);
}

setAdminRole("Yk9EnQACZYQqk1ieRZVVmar7PMt2");

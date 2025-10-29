// "use server"

// import React from "react"
// import Link from "next/link"
// import { auth, signIn, signOut } from "../../../auth"

// // define server actions here
// export async function handleSignIn() {
//   // "use server"
//   await signIn()
// }

// export async function handleSignOut() {
//   // "use server"
//   await signOut()
// }

// const NavAuth = async () => {
//   const session = await auth()

//   return (
//     <div className="cta-container">
//       {session?.user ? (
//         <div className="flex gap-3 items-center">
//           <Link
//             href="/startup/create"
//             className="px-3 py-2 bg-black/90 text-white rounded-md"
//           >
//             Create
//           </Link>
//           <span className="w-8 h-8 rounded-full bg-green-800 flex items-center justify-center">
//             <Link className="text-white" href={`user/${session.user.id}`}>
//               {session.user.name?.slice(0, 1)}
//             </Link>
//           </span>
//           <form action={handleSignOut}>
//             <button type="submit">Logout</button>
//           </form>
//         </div>
//       ) : (
//         <form action={handleSignIn}>
//           <button
//             className="py-[6px] px-4 md:px-5 bg-black/90 rounded-md text-white text-base md:text-[17px] tracking-[.6px]"
//             type="submit"
//           >
//             Login
//           </button>
//         </form>
//       )}
//     </div>
//   )
// }

// export default NavAuth

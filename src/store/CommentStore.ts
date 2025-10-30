// "use client";
// import { create } from "zustand";
// import { getComments } from "@/lib/commentService";
// import { Comment } from "@/app/types/types";

// interface CommentState {
//   storeCommentData: Comment[];
//   loading: boolean;
//   setComment: (comments: any[]) => void;
//   fetchComment: () => () => void;
// }

// export const useCommentStore = create<CommentState>((set) => ({
//   storeCommentData: [],
//   loading: true,
//   setComment: (comments) => set({ storeCommentData: comments, loading: false }),

//   fetchComment: () => {
//     // const unsubscribe = getComments((comments) => {
//     //   set({ storeCommentData: comments, loading: false });
//     // });
//     // return unsubscribe;
//   },
// }));

// export const useSideToggle = create((set) => ({
//     isOpen : false,

//     toggleIsOpen : () => {
//         set({isOpen : !isOpen})
//     }
// }))
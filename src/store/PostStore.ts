"use client";
import { create } from "zustand";
import { getPosts } from "@/lib/postDataService";
import { Posts } from "@/app/types/types";

interface PostState {
  storePostData: Posts[];
  loading: boolean;
  setPosts: (posts: any[]) => void;
  fetchPosts: () => () => void;
}

export const usePostStore = create<PostState>((set) => ({
  storePostData: [],
  loading: true,
  setPosts: (posts) => set({ storePostData: posts, loading: false }),

  fetchPosts: () => {
    const unsubscribe = getPosts((posts) => {
      set({ storePostData: posts, loading: false });
    });
    return unsubscribe;
  },
}));


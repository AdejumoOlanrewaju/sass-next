"use client";
import { useEffect } from "react";
import { usePostStore } from "@/store/PostStore";
import { useActivitiesStore } from "@/store/ActivitiesStore";
// import { useCommentStore } from "@/store/CommentStore";

const FetchStoreData = () => {
  const { fetchPosts } = usePostStore();
  const { fetchActivities } = useActivitiesStore()
  // const { fetchComment } = useCommentStore()
  useEffect(() => {
    const unsubscribe = fetchPosts();
    return () => unsubscribe(); // cleanup listener
  }, [fetchPosts]);

  useEffect(() => {
    const unsubscribe = fetchActivities();
    return () => unsubscribe(); // cleanup listener
  }, [fetchActivities]);

  // useEffect(() => {
  //   const unsubscribe = fetchComment();
  //   return () => unsubscribe(); // cleanup listener
  // }, [fetchComment]);

  return null;
};

export default FetchStoreData;

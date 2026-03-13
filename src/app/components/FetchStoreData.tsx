"use client";
import { useEffect } from "react";
import { usePostStore } from "@/store/PostStore";
import { useActivitiesStore } from "@/store/ActivitiesStore";

const FetchStoreData = () => {
  const { fetchPosts } = usePostStore();
  const { fetchActivities } = useActivitiesStore()
  useEffect(() => {
    const unsubscribe = fetchPosts();
    return () => unsubscribe(); // cleanup listener
  }, [fetchPosts]);

  useEffect(() => {
    const unsubscribe = fetchActivities();
    return () => unsubscribe(); // cleanup listener
  }, [fetchActivities]);

  return null;
};

export default FetchStoreData;

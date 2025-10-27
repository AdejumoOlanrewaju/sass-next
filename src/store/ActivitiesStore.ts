"use client";
import { create } from "zustand";
import { getPosts } from "@/lib/postDataService";
import { Activities } from "@/app/types/types";
import { getActivities } from "@/lib/activitiesService";

interface ActivitiesState {
  storeActivitiesData: Activities[];
  loading: boolean;
  setActivities: (activities: any[]) => void;
  fetchActivities: () => () => void;
}

export const useActivitiesStore = create<ActivitiesState>((set) => ({
  storeActivitiesData: [],
  loading: true,
  setActivities: (activities) => set({ storeActivitiesData: activities, loading: false }),

  fetchActivities: () => {
    const unsubscribe = getActivities((activities) => {
      set({ storeActivitiesData: activities, loading: false });
    });
    return unsubscribe;
  },
}));
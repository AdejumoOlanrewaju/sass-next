"use client"
import Hero from "../components/Hero";
import PostCategory from "../components/PostCategory";
import Newsletter from "../components/Newsletter";
import SocialLinks from "../components/SocialLinks";
import CategorySidebar from "../components/CategorySidebar";
import { usePostStore } from "@/store/PostStore";
import LoadingOverlay from "../components/LoadingOverlay";

export default function Home() {
  const { loading, storePostData } = usePostStore()
  if(loading || storePostData.length === 0){
    return <LoadingOverlay/>
  }
  return (
    <div className="mx-auto max-w-[1560px] font-sans flex flex-col justify-items-center min-h-screen sm:p-8 pb-20 gap-16 px-3">
      <Hero/>
      <div className="flex gap-10 flex-col lg:flex-row">
        <PostCategory/>
        <CategorySidebar/>
      </div>
      <Newsletter/>
      <SocialLinks/>
    </div>
  );
}

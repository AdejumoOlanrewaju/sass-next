import Image from "next/image";
import Hero from "../components/Hero";
import PostCategory from "../components/PostCategory";
import Newsletter from "../components/Newsletter";
import TrendingStories from "../components/TrendingStories";
import SocialLinks from "../components/SocialLinks";
import CategorySidebar from "../components/CategorySidebar";

export default function Home() {
  return (
    <div className="mx-auto max-w-[1560px] font-sans flex flex-col justify-items-center min-h-screen sm:p-8 pb-20 gap-16 px-3">
      <Hero/>
      <div className="flex gap-10">
        <PostCategory/>
        <CategorySidebar/>
      </div>
      <Newsletter/>
      <TrendingStories/>
      <SocialLinks/>
    </div>
  );
}

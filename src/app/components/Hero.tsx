"use client"
import React from 'react'
import FeaturedPost from './FeaturedPost';
import parseDate from '@/lib/utils';
import { usePostStore } from '@/store/PostStore';

const Hero = () => {
  const { storePostData } = usePostStore()
  const sortedPosts = [...storePostData].sort(
    (a, b) => parseDate(b.date!) - parseDate(a.date!)
  );


  const featuredPosts = sortedPosts.slice(0, 2);
  return (
    <section >
      <div className=" px-2 sm:px-6 lg:px-0 py-2">
        <FeaturedPost posts={featuredPosts} />
      </div>
    </section>
  )
}

export default Hero

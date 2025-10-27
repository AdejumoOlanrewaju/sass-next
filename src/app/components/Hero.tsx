"use client"
import React from 'react'
// import { useState } from 'react';
import { Search, Menu, X, Calendar, Clock, ArrowRight, Github, Twitter, Linkedin, Mail, Tag, TrendingUp, Code, Database, Cpu } from 'lucide-react';
import FeaturedPost from './FeaturedPost';
import PostCategory from './PostCategory';
import parseDate from '@/lib/utils';
import posts from '@/lib/post';
import { usePostStore } from '@/store/PostStore';

const Hero = () => {
  const { storePostData } = usePostStore()
  console.log("StorePostData: ", storePostData)
  const sortedPosts = [...storePostData].sort(
    (a, b) => parseDate(b.date!) - parseDate(a.date!)
  );
  console.log("Sorted Posts: ", sortedPosts)


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

"use client";

import { Calendar, Clock, Tag } from 'lucide-react';
import React, { useState } from 'react';
import posts from '@/lib/post';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePostStore } from '@/store/PostStore';

const PostCategory = () => {
  // dynamically extract categories from posts
  const { storePostData } = usePostStore()
  const categories = ["All", ...new Set(storePostData.map((p) => p.category))];
  console.log(categories)
  const pathname = usePathname();
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <section className="w-full lg:w-[65%]">
      {/* Category Buttons */}
      <div className="flex flex-wrap items-center gap-3 mb-6 overflow-x-auto pb-2">
        {categories.map((category) => {
          const slug = category.toLowerCase().replace(/\s+/g, "-");
          return (
      
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
                  }`}
              >
                {category}
              </button>
          );
        })}
      </div>

      {/* Posts Grid */}
      <div className="grid gap-6">
        {storePostData
          .slice(0, 4)
          .filter((post) =>
            selectedCategory === "All"
              ? true
              : post.category === selectedCategory
          )
          .map((post, index) => (
            <article
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                  {post.category}
                </span>
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>

              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                <Link href={`/post/${post.slug}`}>{post.title}</Link>
              </h2>

              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap gap-2 justify-between items-center">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  By {post.author}
                </span>
                <div className="flex items-center space-x-2">
                  {post.tags?.split(",").map((tag, i) => (
                    <span
                      key={i}
                      className="flex items-center space-x-1 text-xs text-blue-600 dark:text-blue-400"
                    >
                      <Tag className="w-3 h-3" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
      </div>
    </section>
  );
};

export default PostCategory;

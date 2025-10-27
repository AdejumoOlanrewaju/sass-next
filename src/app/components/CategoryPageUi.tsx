"use client"
import { usePostStore } from '@/store/PostStore';
import Link from 'next/link';
import React from 'react'

const CategoryPageUi = ({ category }: { category: string }) => {
    const { storePostData } = usePostStore()
    const filteredPosts =
        category.toLowerCase() === "all"
            ? storePostData
            : storePostData.filter(
                (p) => p.category.toLowerCase() === category.toLowerCase()
            );
    return (
        <>
            <section className="max-w-6xl mx-auto px-4 py-10">
                {/* Page Header */}
                <div className="mb-10 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white capitalize">
                        {category} Posts
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        {category.toLowerCase() === "all" ? "Explore all our articles" : (<>Explore all articles under <span className="font-semibold">{category}</span></>)}
                        
                    </p>
                </div>

                {/* Posts Grid */}
                {filteredPosts.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.map((post) => (
                            <article
                                key={post.slug}
                                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all"
                            >
                                {/* Image */}
                                <div className="relative w-full h-48">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="object-cover h-full w-full"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                        {post.category}
                                    </span>
                                    <h2 className="text-xl font-semibold mt-2 mb-3 text-gray-900 dark:text-white hover:text-blue-600">
                                        <Link href={`/post/${post.slug}`}>{post.title}</Link>
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                        <span>By {post.author}</span>
                                        <span>{post.readTime}</span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400">
                        No posts found in this category.
                    </p>
                )}
            </section>
        </>
    )
}

export default CategoryPageUi

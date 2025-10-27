"use client"

import React from 'react'
import { Search, Menu, X, Calendar, Clock, ArrowRight, Github, Twitter, Linkedin, Mail, Tag, TrendingUp, Code, Database, Cpu } from 'lucide-react';
import { Posts } from '../types/types';
import Link from 'next/link';

const FeaturedPost = ({ posts }: { posts: Posts[] }) => {
    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 grid-rows-none">
                {/* Main Content */}
                {posts.map((post: Posts, index: number) => (
                    <div key={index} className={index === 1 ? "lg:col-span-2" : "lg:col-span-3"}>
                        {/* Featured Article */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden  hover:shadow-lg transition-shadow duration-300">
                            <div className="">
                                <div className="h-52 sm:h-72">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="px-4 py-6 md:p-8">
                                    <div className="flex items-center space-x-2 mb-4">
                                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                                            Featured
                                        </span>
                                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                                            {post.category}
                                        </span>
                                    </div>
                                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer mb-4 line-clamp-2">
                                        <Link href={`/post/${post.slug}`}>{post.title}</Link>
                                    </h1>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between flex-wrap">
                                        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                            <span className='min-w-fit'>{post.author}</span>
                                            <div className="flex items-start sm:items-center space-x-1 min-w-fit flex-1">
                                                <Calendar className="w-4 h-4" />
                                                <span>{post.date}</span>
                                            </div>
                                            <div className="flex items-start sm:items-center space-x-1 min-w-fit flex-1">
                                                <Clock className="w-4 h-4" />
                                                <span>{post.readTime}</span>
                                            </div>
                                        </div>
                                        <Link href={`/post/${post.slug}`}>
                                            <button className="flex items-center min-w-fit  space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors mt-1 sm:mt-0">
                                                <span>Read More</span>
                                                <ArrowRight className="w-4 h-4" />
                                            </button>

                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                ))}
                {/* <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
                        <div className="">
                            <div className="">
                                <img
                                    src={featuredPost.image}
                                    alt={featuredPost.title}
                                    className="w-full sm:h-28 md:h-full object-cover"
                                />
                            </div>
                            <div className=" p-6 md:p-8">
                                <div className="flex items-center space-x-2 mb-4 flex-wrap">
                                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                                        Featured
                                    </span>
                                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                                        {featuredPost.category}
                                    </span>
                                </div>
                                <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-4 line-clamp-2">
                                    {featuredPost.title}
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                                    {featuredPost.excerpt}
                                </p>
                                <div className="flex items-center justify-between flex-wrap w-full">
                                    <div className="flex flex-wrap  items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                        <span className='min-w-fit'>{featuredPost.author}</span>
                                        <div className="flex items-center space-x-1 min-w-fit flex-1">
                                            <Calendar className="w-4 h-4" />
                                            <span>{featuredPost.date}</span>
                                        </div>
                                        <div className="flex items-center space-x-1 min-w-fit flex-1">
                                            <Clock className="w-4 h-4" />
                                            <span>{featuredPost.readTime}</span>
                                        </div>
                                    </div>
                                    <button className="flex items-center min-w-fit space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors mt-2 sm:mt-0">
                                        <span>Read More</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default FeaturedPost

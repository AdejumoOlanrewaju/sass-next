"use client"

import React from 'react'
import { Search, Menu, X, Calendar, Clock, ArrowRight, Github, Twitter, Linkedin, Mail, Tag, TrendingUp, Code, Database, Cpu } from 'lucide-react';

const FeaturedPost = () => {
    const featuredPost = {
        title: "Building Scalable Microservices with Docker and Kubernetes",
        excerpt: "Learn how to architect, deploy, and manage microservices at scale using container orchestration and best practices for modern cloud infrastructure.",
        author: "Sarah Chen",
        date: "Dec 15, 2024",
        readTime: "12 min read",
        category: "DevOps",
        tags: ["Docker", "Kubernetes", "Microservices"],
        image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=400&fit=crop"
    };
    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 grid-rows-none">
                {/* Main Content */}
                <div className="lg:col-span-3">
                    {/* Featured Article */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden  hover:shadow-lg transition-shadow duration-300">
                        <div className="">
                            <div className="sm:h-96">
                                <img
                                    src={featuredPost.image}
                                    alt={featuredPost.title}
                                    className="w-full sm:h-28 md:h-full object-cover"
                                />
                            </div>
                            <div className="px-4 py-6 md:p-8">
                                <div className="flex items-center space-x-2 mb-4">
                                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                                        Featured
                                    </span>
                                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                                        {featuredPost.category}
                                    </span>
                                </div>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 line-clamp-2">
                                    {featuredPost.title}
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                                    {featuredPost.excerpt}
                                </p>
                                <div className="flex items-center justify-between flex-wrap">
                                    <div className="flex flex-wrap items-center space-x-4 space-y-3 text-sm text-gray-500 dark:text-gray-400">
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
                                    <button className="flex items-center min-w-fit flex-1 space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors mt-1 sm:mt-0">
                                        <span>Read More</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-2">
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
                                <div className="flex items-center justify-between flex-wrap">
                                    <div className="flex flex-wrap items-center space-x-4 space-y-3 text-sm text-gray-500 dark:text-gray-400">
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
                                    <button className="flex items-center min-w-fit flex-1 space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors mt-2 sm:mt-0">
                                        <span>Read More</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeaturedPost

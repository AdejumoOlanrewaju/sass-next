"use client"
import { usePostStore } from '@/store/PostStore';
import Link from 'next/link'
import React from 'react'

const CategorySidebar = () => {
     const { storePostData } = usePostStore()
     const categories = ["All", ...new Set(storePostData.map((p) => p.category))];
    return (
        <div className='w-full lg:w-[35%] border rounded-[10px] h-fit'>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4"> Categories</h3>
                <div className="space-y-3">
                    {categories.map((category, index) => (
                        <Link href = {`/category/${category}`} key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer">
                            <div className="flex items-center space-x-3">
                                {/* <category className="w-4 h-4 text-blue-600 dark:text-blue-400" /> */}
                                <span className="font-medium text-gray-900 dark:text-white">{category}</span>
                            </div>
                            {/* <span className="text-sm text-gray-500 dark:text-gray-400">{category}</span> */}
                        </Link>
                    ))}
                </div>
            </div>



        </div>
    )
}

export default CategorySidebar

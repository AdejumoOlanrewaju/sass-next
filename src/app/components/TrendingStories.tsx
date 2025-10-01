import { Code, Cpu, Database, TrendingUp } from 'lucide-react';
import React from 'react'

const TrendingStories = () => {
      const trendingTopics = [
        { name: "Next.js 14", count: 24, icon: Code },
        { name: "ChatGPT API", count: 18, icon: Cpu },
        { name: "PostgreSQL", count: 15, icon: Database },
        { name: "Docker", count: 12, icon: TrendingUp }
    ];
    return (
        <section className='w-full'>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Trending Topics</h3>
                <div className="space-y-3">
                    {trendingTopics.map((topic, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer">
                            <div className="flex items-center space-x-3">
                                <topic.icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                <span className="font-medium text-gray-900 dark:text-white">{topic.name}</span>
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{topic.count}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default TrendingStories

import { Code } from 'lucide-react'
import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16 ">
            <div className="max-w-[1560px] mx-auto px-4 md:px-0 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <Code className="w-5 h-5 text-white" />
                            </div>
                            <span className='font-medium italic text-xl tracking-[1px]'>SN</span>

                            {/* <span className="text-xl font-bold text-gray-900 dark:text-white">TechBlog</span> */}
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
                            Your go-to resource for cutting-edge technology insights, tutorials, and industry best practices.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Categories</h4>
                        <div className="space-y-2">
                            <a href="#" className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Web Development</a>
                            <a href="#" className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">AI/ML</a>
                            <a href="#" className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">DevOps</a>
                            <a href="#" className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Mobile</a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Company</h4>
                        <div className="space-y-2">
                            <a href="#" className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</a>
                            <a href="#" className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</a>
                            <a href="#" className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy</a>
                            <a href="#" className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms</a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-gray-600 dark:text-gray-400">
                    <p>&copy; 2024 TechBlog. All rights reserved.</p>
                </div>
            </div>
        </footer>

    )
}

export default Footer

"use client"
import React, { useEffect } from 'react'
import { Posts } from '../types/types'
import { Calendar, Clock } from 'lucide-react'
import { usePostStore } from '@/store/PostStore'
import { getPostViewsBySlug } from '@/lib/postDataService'
import LoadingOverlay from './LoadingOverlay'
import CommentSystem from './CommentSystem'

const PostDetail = ({ paramSlug }: { paramSlug: string }) => {

    useEffect(() => {
        const EmptyParagraphs = document.querySelectorAll(".content-container p")
        EmptyParagraphs.forEach((p) => {
            if (p.textContent === "") {
                p.classList.add("empty")
            }
        })

        getPostViewsBySlug(paramSlug).then(data => data)
    }, [])

    const { storePostData, loading } = usePostStore()
    if(loading){
        return <LoadingOverlay/>
    }
    const post = storePostData.find(p => p.slug === paramSlug)
    
    if (!post) {
        return <h2 className="text-center mt-20" >Post Not Found</h2>
    }



    return (
        <div >
            <article className="prose prose-lg prose-gray dark:prose-invert max-w-[1080px] mx-auto mt-10 px-4 lg:px-0 pb-8">
                {/* Post Title */}
                <h1 className="text-2xl md:text-5xl max-w-7xl font-bold mb-4 text-gray-900 dark:text-gray-100 md:leading-[1.3]">
                    {post.title}
                </h1>


                {/* Post Meta */}
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-8">
                    <div className="flex items-start space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                    </div>
                    <span>·</span>
                    <div className="flex items-start space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                    </div>
                    <span>·</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                        {post.author}
                    </span>
                </div>

                {/* Cover / Featured Image (optional placeholder) */}
                <div className="mb-8 border border-gray-200 rounded-xl max-w-[1100px] ">
                    {
                        post.image ? (
                            <img className='h-60 w-full object-cover rounded-2xl object-center' src={`${post.image}`} alt="banner for post" />
                        ) : (
                            <div className="h-48 aspect-video w-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-xl shadow-inner"></div>
                        )
                    }
                </div>


                {/* Post Content */}
                <div className="leading-relaxed text-gray-800 dark:text-gray-200 space-y-6 content-container">
                    <div dangerouslySetInnerHTML={{ __html: post.content! }} />


                </div>


                {/* Tags */}
                <div className="mt-5 flex flex-wrap gap-2">
                    {post.tags?.split(",").map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

                {/* Comment System */}
                <CommentSystem postId = {post.dbID!}/>
            </article>
        </div>
    )
}

export default PostDetail

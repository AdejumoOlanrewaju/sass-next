import React from 'react'
import posts from '@/lib/post'
import { Calendar, Clock } from 'lucide-react'


const Post = async ({ params }: {params : Promise<{slug : string}>}) => {
    const paramSlug = (await params).slug
    const post = posts.find(p => p.slug === paramSlug)

    if (!post) {
        return <h2 className="text-center mt-20" >Post Not Found</h2>
    }
    return (
        <div>
            <article className="prose prose-lg prose-gray dark:prose-invert max-w-[1560px] mx-auto mt-10 px-4 lg:px-0">
                {/* Post Title */}
                <h1 className="text-2xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100 max-w-3xl md:leading-12">
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
                <div className="mb-8">
                    {
                        post.image ? (
                            <img className='h-60 w-full object-cover rounded-2xl' src={`${post.image}`} alt="banner for post" />
                        ) : (
                            <div className="h-48 aspect-video w-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-xl shadow-inner"></div>
                        )
                    }
                </div>


                {/* Post Content */}
                <div className="leading-relaxed text-gray-800 dark:text-gray-200 space-y-6">
                    <p>
                        {post.content ||
                            'This is a placeholder for the full blog post content. You can integrate Markdown support using `react-markdown` or `next-mdx-remote` for a richer writing experience.'}
                    </p>
                </div>


                {/* Tags */}
                <div className="mt-5 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            </article>
        </div>
    )
}

export default Post

"use client"
import React, { useEffect, useState } from 'react';
import { Heart, MessageCircle, Share2, MoreVertical, ThumbsUp, Reply, Send, Smile, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { useAuthStore } from '@/store/AuthStore';
import { addComment, addReply, getComments, getReplies } from '@/lib/commentService';
// import { useCommentStore } from '@/store/CommentStore';
import { Comment } from '../types/types';
import { toDate } from 'date-fns';
import CommentItem from './CommentItem';
import { togglePostLike, getPostLikes, hasUserLikedPost } from "@/lib/postDataService";
import { useRouter } from 'next/navigation';
export default function CommentSystem({ postId }: { postId: string }) {
    const [comments, setComments] = useState<Comment[]>([]);
    const { user } = useAuthStore()
    // const { storeCommentData } = useCommentStore()
    const [newComment, setNewComment] = useState('');
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [replyText, setReplyText] = useState('');
    const [likedComments, setLikedComments] = useState(new Set());
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const userFirstLetter = user?.displayName?.slice(0, 1)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const unsubscribe = getComments(postId, (commentsData) => {
            setComments(commentsData)
        })

        return () => unsubscribe();
    }, [postId])



    useEffect(() => {
        // if (!user) return;

        let mounted = true;

        (async () => {
            try {
                const [count, isLiked = false] = await Promise.all([
                    getPostLikes(postId),
                    user && hasUserLikedPost(postId, user?.uid!),
                ]);
                if (mounted) {
                    setLikeCount(count);
                    setLiked(isLiked!);
                }
            } catch (err) {
                console.error("Error fetching likes:", err);
            }
        })();

        return () => {
            mounted = false;
        };
    }, [postId, user]);

    const handleLike = async () => {
        if (!user) {
            router.push("/login")
            return;
        };

        // Optimistic UI update
        const prevLiked = liked;
        const prevCount = likeCount;

        setLiked(!prevLiked);
        setLikeCount(prevLiked ? prevCount - 1 : prevCount + 1);

        try {
            setIsLoading(true);
            await togglePostLike(postId, user);
        } catch (err) {
            console.error("Error toggling like:", err);
            // Revert if Firestore fails
            setLiked(prevLiked);
            setLikeCount(prevCount);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePostComment = () => {
        if (!user) {
            router.push("/login")
            return;
        };
        try {
            if (newComment.trim()) {
                addComment({ postId: postId, user: user, commentText: newComment })
                setComments([...comments]);
                setNewComment('');
            }
        } catch (err) {
            console.log(err)
        }

    };

    const handlePostReply = (commentId: any) => {
        if (replyText.trim()) {
            console.log(replyText)
            addReply({ postId: postId, commentId: commentId, user: user, replyText: replyText })
            setReplyText('');
            setReplyingTo(null);
        }
    };

    const handleShare = async () => {
        const shareData = {
            title: "Check out this post!",
            text: "I found this post interesting — check it out:",
            url: window.location.href, // current page link
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
                console.log("✅ Post shared successfully");
            } else {
                // Fallback for browsers that don't support share
                await navigator.clipboard.writeText(window.location.href);
                alert("Link copied to clipboard!");
            }
        } catch (err) {
            console.error("❌ Error sharing:", err);
        }
    };


    return (
        <div className="min-h-screen mt-9">
            <div className="">
                {/* Post Actions */}
                <Card className="bg-white border-gray-200 shadow-lg p-6 mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                            <button disabled={isLoading} onClick={handleLike} className={`flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors group ${liked ? 'text-red-500' : ''}`}>
                                {
                                    isLoading ? (
                                        <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <div className='flex items-center space-x-2'>
                                            <Heart className="w-6 h-6 group-hover:fill-red-500 group-hover:scale-110 transition-all" />
                                            <span className="font-semibold">{likeCount}</span>
                                        </div>
                                    )
                                }

                            </button>
                            <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors group">
                                <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-all" />
                                <span className="font-semibold">{comments.length}</span>
                            </button>
                        </div>
                        <button onClick={handleShare} className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors group">
                            <Share2 className="w-6 h-6 group-hover:scale-110 transition-all" />
                            <span className="font-semibold">Share</span>
                        </button>

                    </div>
                </Card>

                {/* Comment Input */}
                <Card className="bg-white border-gray-200 shadow-lg px-3 py-4 sm:p-6 mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Leave a Comment</h3>
                    <div className="flex flex-wrap gap-3">
                        <Avatar className="w-6 h-6 sm:w-10 sm:h-10 border-2 border-blue-100">
                            <AvatarFallback className="bg-gradient-to-br from-blue-600 to-blue-400 text-white font-semibold text-xs sm:text-base">
                                {userFirstLetter}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <Textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="What are your thoughts?"
                                className="min-h-[120px] bg-gray-50 border-gray-300 focus:border-blue-600 focus:ring-blue-600 sm:resize-none mb-3"
                            />
                            <div className="flex items-center justify-between">
                                <div className="flex space-x-2">
                                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600 hover:bg-blue-50">
                                        <Smile className="w-5 h-5" />
                                    </Button>
                                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600 hover:bg-blue-50">
                                        <ImageIcon className="w-5 h-5" />
                                    </Button>
                                </div>
                                <Button
                                    onClick={handlePostComment}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6"
                                >
                                    Post Comment
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Comments List */}
                <Card className="bg-white border-gray-200 shadow-lg p-4 sm:p-6">
                    <div className="flex flex-wrap gap-3 items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-800">
                            Comments ({comments.length})
                        </h3>
                        <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-blue-600 bg-white cursor-pointer">
                            <option>Most Recent</option>
                            <option>Most Liked</option>
                            <option>Oldest First</option>
                        </select>
                    </div>

                    <div className="space-y-6">
                        {comments.map(comment => (
                            <CommentItem key={comment.id} comment={comment} postId={postId} replyingTo={replyingTo} setReplyingTo={setReplyingTo} replyText={replyText} setReplyText={setReplyText} handlePostReply={handlePostReply} />
                        ))}
                    </div>

                    {comments.length === 0 && (
                        <div className="text-center py-12">
                            <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 text-lg">No comments yet</p>
                            <p className="text-gray-400 text-sm mt-2">Be the first to share your thoughts!</p>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
}
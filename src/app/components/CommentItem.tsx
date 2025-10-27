import { timeAgo } from "@/lib/utils";
import { Heart, MessageCircle, Share2, MoreVertical, ThumbsUp, Reply, Send, Smile, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Comment } from "../types/types";
import { useEffect, useState } from "react";
import { getReplies } from "@/lib/commentService";
interface PropType {
    comment: Comment;
    isReply?: boolean;
    replyingTo: string | null;
    setReplyingTo: (id: string | null) => void;
    replyText: string;
    setReplyText: (text: string) => void;
    handlePostReply: (id: any) => void;
    postId: string
}
export default function CommentItem({
    comment,
    isReply = false,
    replyingTo,
    setReplyingTo,
    replyText,
    setReplyText,
    handlePostReply,
    postId
}: PropType) {
    const date =
        comment?.createdAt && typeof comment.createdAt === "object" && "toDate" in comment.createdAt
            ? comment.createdAt.toDate()
            : new Date(comment?.createdAt as unknown as string || Date.now());
    const [replies, setReplies] = useState<any[]>([]);

    // Load replies in real-time
    useEffect(() => {
        const unsubscribe = getReplies(postId, comment.id!, (data) => setReplies(data));
        return () => unsubscribe();
    }, [postId, comment.id]);

    return (
        <div className={`flex gap-3 flex-wrap ${isReply ? "ml-12 mt-4" : ""}`}>
            <Avatar className="w-7 h-7 sm:w-10 sm:h-10 border-2 border-blue-100">
                <AvatarFallback className="text-xs bg-linear-to-br from-blue-600 to-blue-400 text-white font-semibold">
                    {comment.username.slice(0, 1)}
                </AvatarFallback>
            </Avatar>

            <div className="flex-1">
                <div className="bg-gray-50 rounded-2xl p-4 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                            <span className="text-sm sm:text-base font-semibold text-gray-800">
                                {comment.username.split(" ")[0]}
                            </span>
                            <span className="text-gray-400 text-sm">•</span>
                            <span className="text-gray-500 text-xs sm:text-sm">{timeAgo(date)}</span>
                        </div>
                        {/* <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-gray-200"
                        >
                            <MoreVertical className="w-4 h-4 text-gray-500" />
                        </Button> */}
                    </div>

                    <p className="text-gray-700 leading-relaxed">{comment.commentText}</p>
                </div>

                {!isReply && (
                    <button
                        onClick={() => setReplyingTo(comment.id!)}
                        className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-600 transition-colors mt-2 ml-2"
                    >
                        <Reply className="w-4 h-4" />
                        <span className="font-medium">Reply</span>
                    </button>
                )}

                {replyingTo === comment.id && (
                    <div className="mt-4 sm:ml-2 flex space-x-2">
                        <Avatar className=" w-6 h-6 sm:w-8 sm:h-8 border-2 border-blue-100">
                            <AvatarFallback className="bg-gradient-to-br from-blue-600 to-blue-400 text-white text-xs font-semibold">
                                Y
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 flex flex-col sm:flex-row gap-3">
                            <Textarea
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder="Write a reply..."
                                className="min-h-[80px] bg-white border-gray-300 focus:border-blue-600 focus:ring-blue-600 resize-none"
                            />
                            <div className="flex sm:flex-col space-y-2">
                                <Button
                                    onClick={() => handlePostReply(comment.id)}
                                    size="sm"
                                    className="bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    <Send className="w-4 h-4" />
                                </Button>
                                <Button
                                    onClick={() => {
                                        setReplyingTo(null);
                                        setReplyText("");
                                    }}
                                    size="sm"
                                    variant="ghost"
                                    className="hover:bg-gray-100"
                                >
                                    ✕
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* {comment.replies &&
          comment.replies.length > 0 &&
          comment.replies.map((reply: any) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              isReply
              replyingTo={replyingTo}
              setReplyingTo={setReplyingTo}
              replyText={replyText}
              setReplyText={setReplyText}
              handlePostReply={handlePostReply}
            />
          ))} */}

                {/* Replies section */}
                {replies.length > 0 && (
                    <div className="mt-3 ml-6 space-y-3">
                        {replies.map((r) => (
                            <div key={r.id} className="flex space-x-2">
                                <Avatar>
                                    <AvatarFallback>{r.username?.[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-medium text-gray-700">{r.username.split(' ')[0]}</p>
                                    <p className="text-gray-600">{r.replyText}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}








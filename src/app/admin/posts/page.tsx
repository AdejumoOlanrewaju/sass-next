"use client"
import React, { ElementType, useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Search,
    Plus,
    Edit,
    Trash2,
    Eye,
    Filter,
    MoreVertical,
    Save,
    X,
    Calendar,
    User,
    Tag,
    Image,
    Bold,
    Italic,
    Underline,
    List,
    ListOrdered,
    Link,
    Code,
    Quote,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Heading1,
    Heading2,
    FileText

} from 'lucide-react';
import PostEditor from '@/app/components/PostEditor';
import { PostForm, Posts } from '@/app/types/types';
import { usePostStore } from '@/store/PostStore';
import { addPost, deletePost, updatePost } from "@/lib/postDataService";
import { toast } from "sonner";
import { serverTimestamp } from 'firebase/firestore';
import { addActivity } from '@/lib/activitiesService';

export default function PostManagement() {
    const [view, setView] = useState('list'); // 'list' or 'editor'
    const [editingPost, setEditingPost] = useState<Posts | null>(null);

    const { storePostData } = usePostStore()
    const [posts, setPosts] = useState<Posts[]>([]);
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState("");


    const postDate = new Date().toISOString().split("T")[0];
    useEffect(() => {
        setPosts(storePostData)
    }, [storePostData])


    const [formData, setFormData] = useState<PostForm>({
        title: "",
        category: "",
        readTime: "",
        image: "",
        content: "",
        excerpt: "",
        tags: '',
        status: 'draft'
    })

    const filteredPosts = storePostData.filter((post) => {
        const query = searchTerm.toLowerCase();
        return (
            post.title.toLowerCase().includes(query) ||
            post.category.toLowerCase().includes(query) ||
            post.author.toLowerCase().includes(query) ||
            post.excerpt.toLowerCase().includes(query)
        );
    });

    const resetForm = () => {
        setFormData({
            title: "",
            category: "",
            readTime: "",
            image: "",
            content: "",
            excerpt: "",
            tags: "",
        })
    }

    const showNewPostModal = () => {
        setEditingPost(null);
        resetForm()
        setView('editor');
    };

    const handleSavePost = async () => {
        if (!formData.title || !formData.content) {
            toast.error("Please fill in the title and content before publishing.")
            return
        }


        const data = {
            ...formData,
            tags: formData.tags,
            slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            date: postDate,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            author: "Admin",
            views: 0,
            status: "Published",
        }

        console.log(data)
        try {
            if (editingPost === null) {
                setLoading(true)
                await addPost(data)
                await addActivity({ type: "post_published", title: "Post published", message: formData.title })
                toast.success("🎉 Post published successfully!")
                resetForm()
            } else {
                setLoading(true)
                await handleEditPost(editingPost.dbID!, formData)
                await addActivity({ type: "post_updated", title: "Post updated", message: editingPost.title })

            }
        } catch (err) {
            console.error(err)
            toast.error("Something went wrong while saving your post.")
        } finally {
            setLoading(false)
        }
    }

    const showEditPostModal = (post: Posts) => {
        setEditingPost(post);

        setFormData({
            title: post.title,
            category: post.category,
            readTime: post.readTime!,
            image: post.image!,
            content: post.content!,
            excerpt: post.excerpt,
            tags: post.tags,
            status: post.status
        });
        setView('editor');
    };

    const handleEditPost = async (id: string, updatedData: any) => {
        try {
            await updatePost(id, updatedData);
            toast.success("Post updated successfully");
            resetForm()
        } catch (error) {
            toast.error("Error updating post");
            console.error("Error updating post: ", error)
        }
    };


    const handleDeletePost = async (id: string) => {
        try {
            await deletePost(id);
            toast.success("Post deleted successfully");
        } catch (error) {
            toast.error("Error deleting post");
            console.error("Error deleting post :", error)
        }


    };



    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50/30">


            {/* Main Content */}
            <div className="lg:ml-64 h-full">
                {/* Header */}
                <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
                    <div className="flex items-center justify-between px-8 py-4">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">
                                {view === 'list' ? 'Post Management' : (editingPost ? 'Edit Post' : 'Create New Post')}
                            </h2>
                            <p className="text-sm text-slate-500 mt-0.5">
                                {view === 'list' ? `${posts.length} total posts` : 'Write and publish your content'}
                            </p>
                        </div>

                        {view === 'list' ? (
                            <Button
                                onClick={showNewPostModal}
                                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                New Post
                            </Button>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Button
                                    variant="outline"
                                    onClick={() => setView('list')}
                                    className="border-slate-300 text-black"
                                >
                                    <X className="w-4 h-4 mr-2" />
                                    Cancel
                                </Button>
                                <Button

                                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    {formData.status === 'Published' ? 'Publish' : 'Save Draft'}
                                </Button>
                            </div>
                        )}
                    </div>
                </header>

                <div className="p-8 bg-slate-50 h-full">
                    {view === 'list' ? (
                        // List View
                        <>
                            {/* Filters */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="relative flex-1 max-w-md">
                                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <Input
                                        placeholder="Search posts..."
                                        className="pl-10 bg-white border-slate-200 text-black"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                {/* <Button variant="outline" className="border-slate-300 text-black">
                                    <Filter className="w-4 h-4 mr-2" />
                                    Filter
                                </Button> */}
                            </div>

                            {/* Posts List */}
                            <Card className="border-0 shadow-lg shadow-slate-200/50">
                                <CardContent className="p-0">
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead className="bg-slate-50 border-b border-slate-200">
                                                <tr>
                                                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Title</th>
                                                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Category</th>
                                                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Author</th>
                                                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Status</th>
                                                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Date</th>
                                                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Views</th>
                                                    <th className="text-right px-6 py-4 text-sm font-semibold text-slate-700">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100">
                                                {filteredPosts.length === 0 ? (
                                                    <tr>
                                                        <td colSpan={7} className="text-center py-10 text-slate-500">
                                                            No posts found.
                                                        </td>
                                                    </tr>
                                                ) : (filteredPosts.map((post) => (
                                                    <tr key={post.dbID} className="hover:bg-slate-50 transition-colors">
                                                        <td className="px-6 py-4">
                                                            <div>
                                                                <p className="font-semibold text-slate-900">{post.title}</p>
                                                                <p className="text-sm text-slate-500 line-clamp-1">{post.excerpt}</p>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                                                                <Tag className="w-3 h-3" />
                                                                {post.category}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-xs font-semibold">
                                                                    {post.author.split(' ').map(n => n[0]).join('')}
                                                                </div>
                                                                <span className="text-sm text-slate-700">{post.author}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${post.status === 'Published'
                                                                ? 'bg-emerald-100 text-emerald-700'
                                                                : 'bg-amber-100 text-amber-700'
                                                                }`}>
                                                                {post.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-1.5 text-sm text-slate-600">
                                                                <Calendar className="w-3.5 h-3.5" />
                                                                {post.date}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-1.5 text-sm text-slate-600">
                                                                <Eye className="w-3.5 h-3.5" />
                                                                {post.views?.toLocaleString()}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center justify-end gap-2">
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"
                                                                    onClick={() => showEditPostModal(post)}
                                                                >
                                                                    <Edit className="w-4 h-4" />
                                                                </Button>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="h-8 w-8 hover:bg-red-50 hover:text-red-600"
                                                                    onClick={() => handleDeletePost(post.dbID!)}
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </Button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )))}
                                            </tbody>
                                        </table>
                                    </div>
                                </CardContent>
                            </Card>
                        </>
                    ) : (
                        // Editor View
                        <div className="">
                            {/* Editor */}
                            <PostEditor
                                formData={formData}
                                setFormData={setFormData}
                                loading={loading}
                                onSave={handleSavePost}
                                editingPost={editingPost}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// const editorTools = [
//     { icon: Bold, label: 'Bold' },
//     { icon: Italic, label: 'Italic' },
//     { icon: Underline, label: 'Underline' },
//     { divider: true },
//     { icon: Heading1, label: 'Heading 1' },
//     { icon: Heading2, label: 'Heading 2' },
//     { divider: true },
//     { icon: AlignLeft, label: 'Align Left' },
//     { icon: AlignCenter, label: 'Align Center' },
//     { icon: AlignRight, label: 'Align Right' },
//     { divider: true },
//     { icon: List, label: 'Bullet List' },
//     { icon: ListOrdered, label: 'Numbered List' },
//     { divider: true },
//     { icon: Link, label: 'Insert Link' },
//     { icon: Image, label: 'Insert Image' },
//     { icon: Code, label: 'Code Block' },
//     { icon: Quote, label: 'Quote' },
// ];


// const handleSavePost = () => {
//     if (editingPost) {
//         setPosts(posts.map(post =>
//             post.id === editingPost.id
//                 ? { ...post, ...formData, date: new Date().toISOString().split('T')[0] }
//                 : post
//         ));
//     } else {
//         const newPost = {
//             id: posts.length + 1,
//             ...formData,
//             author: 'Admin User',
//             date: new Date().toISOString().split('T')[0],
//             views: 0
//         };
//         setPosts([newPost, ...posts]);
//     }
//     setView('list');
// };
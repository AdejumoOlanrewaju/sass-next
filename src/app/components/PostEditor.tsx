"use client"

import dynamic from "next/dynamic"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
const ReactQuill = dynamic(() => import("react-quill-new"), {
    ssr: false, // 👈 disables server-side rendering for this component
    loading: () => <p>Loading editor...</p>,
})
import 'react-quill-new/dist/quill.snow.css'
import { toast } from "sonner"
import { FileText, Image as ImageIcon, Tag, Clock, FolderOpen, Sparkles } from "lucide-react"
import { addPost } from "@/lib/postDataService"

export default function PostEditor({formData, setFormData, onSave, loading, editingPost}: any) {


    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                                {editingPost === null ? "Create New Post": "Edit Post"}
                            </h1>
                            <p className="text-sm text-slate-500 mt-0.5">Share your thoughts with the world</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Title Card */}
                        <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="pt-6">
                                <Label htmlFor="title" className="text-base font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                    <FileText className="w-4 h-4" />
                                    Post Title
                                </Label>
                                <Input
                                    id="title"
                                    placeholder="Enter an engaging title..."
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="text-lg h-12 border-slate-300 focus:border-violet-500 focus:ring-violet-500"
                                />
                            </CardContent>
                        </Card>

                        {/* Excerpt Card */}
                        <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="pt-6">
                                <Label htmlFor="excerpt" className="text-base font-semibold text-slate-700 mb-2 block">
                                    Post Excerpt
                                </Label>
                                <Input
                                    id="excerpt"
                                    placeholder="Brief description of your post..."
                                    value={formData.excerpt}
                                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                    className="border-slate-300 focus:border-violet-500 focus:ring-violet-500"
                                />
                            </CardContent>
                        </Card>

                        {/* Editor Card */}
                        <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="pt-6">
                                <Label className="text-base font-semibold text-slate-700 mb-3 block">
                                    Content
                                </Label>
                                <div className="border border-slate-300 rounded-lg overflow-hidden hover:border-violet-400 transition-colors">
                                    <ReactQuill
                                        theme="snow"
                                        value={formData.content}
                                        onChange={(value) => setFormData({ ...formData, content: value })}
                                        placeholder="Start writing your post..."
                                        className="min-h-[400px] bg-white"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Metadata Card */}
                        <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow sticky top-6">
                            <CardContent className="pt-6">
                                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                    <FolderOpen className="w-4 h-4" />
                                    Post Details
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="category" className="text-sm font-medium text-slate-600 mb-1.5 flex items-center gap-2">
                                            <FolderOpen className="w-3.5 h-3.5" />
                                            Category
                                        </Label>
                                        <Input
                                            id="category"
                                            placeholder="e.g. Technology"
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="border-slate-300 focus:border-violet-500 focus:ring-violet-500"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="readTime" className="text-sm font-medium text-slate-600 mb-1.5 flex items-center gap-2">
                                            <Clock className="w-3.5 h-3.5" />
                                            Read Time
                                        </Label>
                                        <Input
                                            id="readTime"
                                            placeholder="e.g. 5 min read"
                                            value={formData.readTime}
                                            onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                                            className="border-slate-300 focus:border-violet-500 focus:ring-violet-500"
                                        />
                                    </div>

                                    <Separator />

                                    <div>
                                        <Label htmlFor="image" className="text-sm font-medium text-slate-600 mb-1.5 flex items-center gap-2">
                                            <ImageIcon className="w-3.5 h-3.5" />
                                            Featured Image
                                        </Label>
                                        <Input
                                            id="image"
                                            placeholder="Image URL"
                                            value={formData.image}
                                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                            className="border-slate-300 focus:border-violet-500 focus:ring-violet-500"
                                        />
                                        {formData.image && (
                                            <div className="mt-3 rounded-lg overflow-hidden border border-slate-200">
                                                <img
                                                    src={formData.image}
                                                    alt="Preview"
                                                    className="w-full h-32 object-cover"
                                                    onError={(e) => {
                                                        e.currentTarget.style.display = 'none'
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="tags" className="text-sm font-medium text-slate-600 mb-1.5 flex items-center gap-2">
                                            <Tag className="w-3.5 h-3.5" />
                                            Tags
                                        </Label>
                                        <Input
                                            id="tags"
                                            placeholder="react, nextjs, firebase"
                                            value={formData.tags}
                                            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                            className="border-slate-300 focus:border-violet-500 focus:ring-violet-500"
                                        />
                                        <p className="text-xs text-slate-500 mt-1.5">Separate tags with commas</p>
                                    </div>
                                </div>

                                <Separator className="my-4" />

                                <Button
                                    onClick={onSave}
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-medium h-11 shadow-md hover:shadow-lg transition-all"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                            Publishing...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-4 h-4 mr-2" />
                                            Publish Post
                                        </>
                                    )}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
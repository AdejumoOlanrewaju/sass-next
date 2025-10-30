"use client"
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import { useState } from "react";
import { toast } from "sonner"; // or your preferred toast library
import { Eye, EyeOff, Mail, Lock, ArrowRight, Pen, BookOpen, Sparkles, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';


export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            toast.error("Please enter your email address.");
            return;
        }

        try {
            setLoading(true);
            await sendPasswordResetEmail(auth, email);
            toast.success("Password reset email sent! Check your inbox.");
            setEmail("");
        } catch (error: any) {
            console.error(error.message);
            toast.error("Failed to send reset email. Check your email address.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="min-h-screen flex  justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 relative overflow-hidden">
                {/* Decorative elements */}
                {/* <div className="absolute top-10 left-12 w-20 h-20 bg-blue-100 rounded-full opacity-50 animate-pulse"></div> */}
                <div className="absolute top-60 right-20 w-32 h-32 bg-blue-50 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '1s' }}></div>
                {/* <div className="absolute top-[30%] right-[40%] w-16 h-16 bg-blue-100 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div> */}

                <div className="w-full  grid lg:grid-cols-2 relative z-10">
                    {/* Left side - Illustration */}
                    <div className="hidden lg:flex flex-col items-center justify-center space-y-6 p-8 bg-gray-200">
                        <div className="relative w-full max-w-md">
                            {/* Main illustration container */}
                            <div className="relative bg-gradient-to-br from-blue-50 to-white rounded-3xl p-12 shadow-lg">
                                {/* Floating elements */}
                                <div className="absolute -top-6 -left-6 bg-white rounded-2xl p-4 shadow-xl animate-bounce" style={{ animationDuration: '3s' }}>
                                    <Pen className="w-8 h-8 text-blue-600" strokeWidth={2.5} />
                                </div>

                                <div className="absolute -top-4 -right-4 bg-blue-600 rounded-2xl p-4 shadow-xl animate-bounce" style={{ animationDuration: '3s', animationDelay: '0.5s' }}>
                                    <BookOpen className="w-8 h-8 text-white" strokeWidth={2.5} />
                                </div>

                                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl p-3 shadow-xl animate-bounce" style={{ animationDuration: '3s', animationDelay: '1s' }}>
                                    <Sparkles className="w-6 h-6 text-blue-600" strokeWidth={2.5} />
                                </div>

                                {/* Central illustration */}
                                <div className="relative">
                                    {/* Document/Blog post illustration */}
                                    <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-4 transform hover:scale-105 transition-transform duration-300">
                                        {/* Header */}
                                        <div className="flex items-center space-x-3">
                                            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full"></div>
                                            <div className="space-y-2 flex-1">
                                                <div className="h-3 bg-blue-100 rounded-full w-3/4"></div>
                                                <div className="h-2 bg-blue-50 rounded-full w-1/2"></div>
                                            </div>
                                        </div>

                                        {/* Content lines */}
                                        <div className="space-y-3 pt-4">
                                            <div className="h-3 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full w-full"></div>
                                            <div className="h-3 bg-blue-100 rounded-full w-5/6"></div>
                                            <div className="h-3 bg-blue-100 rounded-full w-4/6"></div>
                                            <div className="h-3 bg-blue-50 rounded-full w-full"></div>
                                            <div className="h-3 bg-blue-50 rounded-full w-3/4"></div>
                                        </div>

                                        {/* Image placeholder */}
                                        <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl h-32 flex items-center justify-center">
                                            <div className="text-blue-400 text-4xl">📝</div>
                                        </div>

                                        {/* Footer elements */}
                                        <div className="flex items-center justify-between pt-4">
                                            <div className="flex space-x-2">
                                                <div className="w-8 h-8 bg-blue-100 rounded-full"></div>
                                                <div className="w-8 h-8 bg-blue-100 rounded-full"></div>
                                                <div className="w-8 h-8 bg-blue-100 rounded-full"></div>
                                            </div>
                                            <div className="h-8 w-20 bg-blue-600 rounded-full"></div>
                                        </div>
                                    </div>

                                    {/* Decorative dots */}
                                    <div className="absolute -right-8 top-1/4 space-y-2">
                                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                                        <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                                        <div className="w-3 h-3 bg-blue-200 rounded-full"></div>
                                    </div>

                                    <div className="absolute -left-8 bottom-1/4 space-y-2">
                                        <div className="w-3 h-3 bg-blue-200 rounded-full"></div>
                                        <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <div className="text-center space-y-2 mt-8">
                        <h2 className="text-3xl font-bold text-gray-800">Share Your Stories</h2>
                        <p className="text-gray-600 text-lg">Create, inspire, and connect with readers worldwide</p>
                    </div> */}
                    </div>
                    <div className="flex items-center justify-center">
                        <form
                            onSubmit={handleReset}
                            className="bg-white p-6 rounded-2xl shadow-md w-full sm:w-[600px] border border-gray-200 min-h-[300px] flex flex-col justify-center gap-6"
                        >
                            <h2 className="text-3xl font-semibold mb-4 text-center">
                                Forgot Password
                            </h2>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your registered email"
                                className="border border-gray-300 w-full p-2 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                            >
                                {loading ? "Sending..." : "Send Reset Link"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

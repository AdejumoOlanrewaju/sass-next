"use client"
import React, { FormEvent, useRef, useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Pen, BookOpen, Sparkles, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/store/AuthStore';
import { toast } from 'sonner';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { storeUserInfo } from '@/lib/authService';
import { getFirebaseErrorMessage } from '@/lib/utils';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user, loginWithEmail, loading, loginWithGoogle } = useAuthStore()
    const formRef = useRef<HTMLFormElement>(null)
    const router = useRouter()
    const [googleSignin, setGoogleSignin] = useState(false)
    const reset = () => {
        setEmail("");
        setPassword("");
        formRef.current?.reset();
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("Please fill in all required fields.");
            return;
        }

        // ✅ Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address.");
            return;
        }
        try {
            await loginWithEmail(email, password);
            toast.success("Logged in successfully!");
            setTimeout(() => {
                router.push("/")
            }, 500)
        } catch (error: any) {
            const errorMsg = getFirebaseErrorMessage(error.message)
            toast.error(errorMsg);
            return
        } finally {
            reset()

        }
    };

    const handleGoogleLogin = async () => {
        setGoogleSignin(prev => !prev)
        try {
            const user = await loginWithGoogle();
            toast.success("Logged in successfully!");
            await storeUserInfo(user)
            setTimeout(() => {
                router.push("/")
            }, 500)
        } catch (error: any) {
            const errorMsg = getFirebaseErrorMessage(error.message)
            toast.error(errorMsg);
            return
        } finally {
            reset()
        }
    }


    return (
        <div className="min-h-screen flex  justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-blue-100 rounded-full opacity-50 animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-32 h-32 bg-blue-50 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/4 right-1/3 w-16 h-16 bg-blue-100 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>

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
                <div className='flex items-center'>
                    {/* Right side - Login form */}
                    <Card className="w-[90%] max-w-[600px] mx-auto border-gray-200 bg-white shadow-2xl">
                        <CardHeader className="space-y-1 text-center pb-8">
                            <div className="flex justify-center mb-6">
                                <div className="relative">
                                    <Link href={'/'}>
                                        <div className="flex items-center space-x-2">
                                            {/* <div className="w-8 h-8 bg-linear-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                                <Code className="w-5 h-5 text-white" />
                                            </div> */}
                                            <img className='w-10 h-10' src="./logo.png" alt="Logo Image" />

                                            {/* <span className='font-medium italic text-xl tracking-[1px]'>TelexBlog</span> */}
                                        </div>
                                    </Link>
                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full animate-ping"></div>
                                </div>
                            </div>
                            <CardTitle className="text-3xl font-bold text-gray-800">
                                Welcome Back
                            </CardTitle>
                            <CardDescription className="text-gray-600 text-base">
                                Sign in to continue and react to amazing content
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-5">
                            <form action="" ref={formRef} className='flex flex-col gap-4'>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                                    <div className="relative group">
                                        <Mail className="absolute left-3 top-4 h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="name@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="pl-10 bg-gray-50 border-gray-300 text-gray-800 placeholder:text-gray-400 focus:border-blue-600 focus:ring-blue-600 h-12 hover:border-blue-400 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                                    <div className="relative group">
                                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                                        <Input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="pl-10 pr-10 bg-gray-50 border-gray-300 text-gray-800 placeholder:text-gray-400 focus:border-blue-600 focus:ring-blue-600 h-12 hover:border-blue-400 transition-colors"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-3 text-gray-400 hover:text-blue-600 transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <label className="flex items-center space-x-2 cursor-pointer group">
                                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-600 focus:ring-offset-0" />
                                        <span className="text-gray-600 group-hover:text-gray-800 transition-colors">Remember me</span>
                                    </label>
                                    <a href="#" className="text-blue-600 hover:text-blue-700 font-medium transition-colors hover:underline">
                                        Forgot password?
                                    </a>
                                </div>

                                <Button
                                    onClick={(e) => handleLogin(e)}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-12 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 group"
                                    disabled={loading}
                                >
                                    {loading && !googleSignin ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Signing in...
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center">
                                            Sign In
                                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    )}
                                </Button>

                            </form>
                        </CardContent>

                        <CardFooter className="flex flex-col space-y-4">
                            <div className="relative w-full">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-gray-200" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-white px-2 text-gray-500">Or continue with</span>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Button onClick={handleGoogleLogin} variant="outline" className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-blue-600 h-11 transition-all px-8 gap-1">
                                    {
                                        loading && googleSignin ?
                                            <>
                                                <span className="flex items-center justify-center">
                                                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                    </svg>
                                                    Signing in...
                                                </span>
                                            </> :
                                            <>
                                                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                                                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                                </svg>
                                                Google
                                            </>
                                    }
                                </Button>

                            </div>

                            <p className="text-center text-sm text-gray-600">
                                Don't have an account?{' '}
                                <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors hover:underline">
                                    Sign up for free
                                </Link>
                            </p>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
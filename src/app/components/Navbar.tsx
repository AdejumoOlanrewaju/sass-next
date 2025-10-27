"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { ReactElement, useState } from 'react'
import NavAuth from './NavAuth'
import { Code, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/AuthStore'



const Navbar = () => {
    const { user, logout } = useAuthStore()
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = async () => {
        try{
            await logout()
        }catch(err){
            console.log(err)
        }
    }

    return (
        <header className='sticky top-0 h-15 z-999'>
            <nav className='h-full sm:px-8 px-3 bg-gray-100'>

                {/* Desktop Menu */}
                <div className="mx-auto max-w-[1560px] flex justify-between h-full  items-center">
                    <Link href={'/'}>
                        <div className="flex items-center space-x-2">
                            {/* <div className="w-8 h-8 bg-linear-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <Code className="w-5 h-5 text-white" />
                            </div> */}
                            <img className='w-8 h-8' src="./logo.png" alt="Logo Image" />
                            <span className='font-medium italic text-base sm:text-xl tracking-[1px]'>TBlog</span>
                        </div>
                    </Link>

                    <ul className='list-none pl-0 md:flex gap-7 hidden'>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/about">About</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                        <li><Link href="/policy">Policy</Link></li>

                    </ul>

                    <div className='flex gap-2 items-center '>
                        {
                            user ? (
                                <div className='flex items-center gap-4'>
                                    <div className='w-8 h-8 rounded-full bg-green-800 flex items-center justify-center text-white'>{user.displayName?.slice(0, 1)}</div>
                                    <Button className='px-2 sm:px-4'  onClick={handleLogout} variant={"outline"}>Logout</Button>
                                </div>
                            ) : (
                                <Link href={'/login'}>
                                    <Button className='px-2 sm:px-4'>Login</Button>
                                </Link>
                            )
                        }


                        {/* Mobile Hamburger */}
                        <button
                            className="sm:pr-2 pr-0 p-2 text-gray-700 dark:text-gray-300 md:hidden"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>


                    {/* Mobile Menu */}
                    <div className={`mobile-menu w-[300px] shadow bg-white md:hidden fixed top-15 z-[900] right-0 min-h-screen transition-all duration-500  ${isMenuOpen ? `translate-x-0` : `translate-x-[100%]`}`}>
                        <ul className=" flex flex-col gap-7 mt-3 p-8">
                            <li onClick={() => setIsMenuOpen(false)}>
                                <Link className='text-xl' href="/">Home</Link>
                            </li>
                            <li onClick={() => setIsMenuOpen(false)}>
                                <Link className='text-xl' href="/about">About</Link>
                            </li>
                            <li onClick={() => setIsMenuOpen(false)}>
                                <Link className='text-xl' href="/contact">Contact</Link>
                            </li>
                            <li onClick={() => setIsMenuOpen(false)}>
                                <Link className='text-xl' href="/policy">Policy</Link>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar

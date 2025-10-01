"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { ReactElement, useState } from 'react'
import NavAuth from './NavAuth'
import { Code, Menu, X } from 'lucide-react'



const Navbar = ({ children }: { children: React.ReactNode }) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className='sticky top-0 h-15'>
            <nav className='h-full px-4 bg-gray-100'>
                {/* Desktop Menu */}
                <div className="mx-auto max-w-[1560px] flex justify-between h-full  items-center">
                    <Link href={'/'}>
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <Code className="w-5 h-5 text-white" />
                            </div>
                            <span className='font-medium italic text-xl tracking-[1px]'>SN</span>
                        </div>
                    </Link>

                    <ul className='list-none pl-0 md:flex gap-7 hidden'>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/about">About</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                        <li><Link href="">Policy</Link></li>

                    </ul>

                    <div className='flex space-x-2 items-center'>
                        {children}

                        {/* Mobile Hamburger */}
                        <button
                            className="md:hidden p-2 text-gray-700 dark:text-gray-300"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>


                    {/* Mobile Menu */}
                        <div className={`mobile-menu w-[300px] shadow bg-white md:hidden fixed top-15 right-0 min-h-screen transition-all duration-500  ${isMenuOpen ? `translate-x-0`: `translate-x-[100%]`}`}>
                            <ul className=" flex flex-col gap-7 mt-3 p-8">
                                <li>
                                    <Link className='text-xl' href="/">Home</Link>
                                </li>
                                <li>
                                    <Link className='text-xl' href="/about">About</Link>
                                </li>
                                <li>
                                    <Link className='text-xl' href="/contact">Contact</Link>
                                </li>
                                <li>
                                    <Link className='text-xl' href="">Policy</Link>
                                </li>
                            </ul>

                        </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar

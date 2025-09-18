import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { auth, signIn, signOut } from '../../../auth'

const Navbar = async () => {
    const session = await auth()
    return (
        <header className='sticky top-0 h-15'>
            <nav className='flex justify-between h-full bg-gray-100 items-center px-4'>
                <Link href={'/'}>
                    <span className='font-medium italic text-xl tracking-[1px]'>SaasNext</span>
                </Link>

                <ul className='list-none pl-0 flex gap-3 '>
                    {
                        session && session?.user ? (
                            <div className='flex gap-3 items-center'>
                                <Link href='/startup/create' className='px-3 py-2 bg-black/90 text-white rounded-md'>Create</Link>
                                <span className='w-8 h-8 rounded-full bg-green-800 flex items-center justify-center'>
                                    <Link className='text-white' href={`user/${session.user.id}`}>{session.user.name?.slice(0, 1)}</Link>
                                </span>
                                <form action={async () => {
                                    "use server"
                                    await signOut()
                                }}>
                                    <button type="submit">Logout</button>
                                </form>
                            </div>
                        ) : (
                            <form action={async () => {
                                "use server"
                                await signIn()
                            }}>
                                <button className='py-[6px] px-5 bg-black/90 rounded-md text-white text-[17px] tracking-[.6px]' type='submit'>Login</button>
                            </form>
                        )
                    }
                </ul>
            </nav>
        </header>
    )
}

export default Navbar

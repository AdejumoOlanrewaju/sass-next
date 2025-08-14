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

                <ul className='list-none pl-0'>
                    {
                        session && session?.user ? (
                            <div>
                                <Link href = '/startup/create' className=''>Create</Link>
                                <Link href = {`user/${session?.user.id}`}></Link>
                                <form action={async () => {
                                    "use server"
                                    await signOut()
                                }}>
                                    <button type = "submit">Logout</button>
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

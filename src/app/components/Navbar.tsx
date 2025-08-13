import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { auth } from '../../../auth'

const Navbar = async () => {
    const session = await auth()
    return (
        <header>
            <nav>
                <Link href={'/'}>
                    <Image src="" alt="" />
                </Link>

                <ul className='list-none pl-0'>
                    {

                    }
                </ul>
            </nav>
        </header>
    )
}

export default Navbar

import Link from 'next/link'
import React from 'react'

const CategorySidebar = () => {
    return (
        <div className=''>
            <div className="category-head ">
                <h4 className=''>Categories</h4>
            </div>

            <ul>
                <li>
                    <Link href={'#'}>All</Link>
                </li>
                <li>
                    <Link href={'#'}>Web Development</Link>
                </li>
                <li>
                    <Link href={'#'}>AI/ML</Link>
                </li>
                <li>
                    <Link href={'#'}>Database</Link>
                </li>
                <li>
                    <Link href={'#'}>Mobile</Link>
                </li>
                
            </ul>

        </div>
    )
}

export default CategorySidebar

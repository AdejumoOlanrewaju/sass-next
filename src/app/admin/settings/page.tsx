import { Settings } from 'lucide-react'
import React from 'react'

const Page = () => {
  return (
    <div className='min-h-screen w-full flex flex-col items-center justify-center'>
        <div className="flex flex-col items-center justify-center lg:ml-64">
            <Settings/>
            <p>Settings</p>
        </div>
    </div>
  )
}

export default Page

import { Settings } from 'lucide-react'
import React from 'react'

const Page = () => {
  return (
    <div className='min-h-screen w-full flex flex-col items-center justify-center'>
        <div className="flex flex-col items-center justify-center lg:ml-64">
            <Settings className = "w-7 h-7 text-black"/>
            <p className = "text-4xl text-black">Settings</p>
        </div>
    </div>
  )
}

export default Page
